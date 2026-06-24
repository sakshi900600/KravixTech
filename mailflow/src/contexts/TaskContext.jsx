import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockTaskService } from '../services/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Load tasks from API
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await mockTaskService.getTasks();
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load tasks on mount
  // eslint-disable-next-line
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Get filtered and sorted tasks
  const getFilteredTasks = useCallback(() => {
    let filtered = [...tasks];

    // Apply filter
    if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'overdue') {
      const now = new Date();
      filtered = filtered.filter(task => {
        if (task.completed) return false;
        if (!task.dueDate) return false;
        return new Date(task.dueDate) < now;
      });
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.name.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Apply sort
    if (sortBy === 'dueDate') {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'priority') {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'createdAt') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [tasks, filter, searchQuery, sortBy]);

  // Create task
  const createTask = async (taskData) => {
    try {
      const newTask = await mockTaskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task created successfully!');
      setIsModalOpen(false);
      return { success: true };
    } catch {
      toast.error('Failed to create task');
      return { success: false };
    }
  };

  // Update task
  const updateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await mockTaskService.updateTask(taskId, taskData);
      setTasks(prev => prev.map(task =>
        task.id === taskId ? updatedTask : task
      ));
      toast.success('Task updated successfully!');
      setIsModalOpen(false);
      setEditingTask(null);
      setSelectedTask(null);
      return { success: true };
    } catch {
      toast.error('Failed to update task');
      return { success: false };
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return { success: false };
    }

    try {
      await mockTaskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      setSelectedTask(null);
      toast.success('Task deleted successfully!');
      return { success: true };
    } catch {
      toast.error('Failed to delete task');
      return { success: false };
    }
  };

  // Toggle complete
  const toggleComplete = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompleted = !task.completed;
    try {
      const result = await mockTaskService.toggleComplete(taskId, newCompleted);
      setTasks(prev => prev.map(t =>
        t.id === taskId
          ? { ...t, completed: newCompleted, completedAt: newCompleted ? new Date().toISOString() : null }
          : t
      ));
      toast.success(newCompleted ? 'Task completed! 🎉' : 'Task reopened');
    } catch {
      toast.error('Failed to update task status');
    }
  };

  const value = {
    tasks,
    isLoading,
    searchQuery,
    filter,
    sortBy,
    isModalOpen,
    editingTask,
    selectedTask,
    setSearchQuery,
    setFilter,
    setSortBy,
    setIsModalOpen,
    setEditingTask,
    setSelectedTask,
    loadTasks,
    getFilteredTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};