// Mock delay for simulating network requests
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
export const MOCK_USER = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff',
  role: 'Product Manager',
};

// Mock token
const MOCK_TOKEN = 'mock-jwt-token-12345';

// Mock login
export const mockLogin = async (credentials) => {
  await delay(1000);
  if (credentials.email === 'john@example.com' && credentials.password === 'password123') {
    return {
      success: true,
      user: MOCK_USER,
      token: MOCK_TOKEN,
    };
  }
  return { 
    success: false, 
    error: 'Invalid email or password. Please try again.' 
  };
};

// Mock logout
export const mockLogout = async () => {
  await delay(500);
  return { success: true };
};

// Mock token verification
export const mockVerifyToken = async (token) => {
  await delay(600);
  if (token === MOCK_TOKEN) {
    return MOCK_USER;
  }
  throw new Error('Invalid token');
};

// Generate mock emails
const generateMockEmails = () => {
  const senders = [
    { name: 'Sarah Johnson', email: 'sarah@company.com' },
    { name: 'Michael Chen', email: 'michael@startup.io' },
    { name: 'Emily Davis', email: 'emily.d@design.studio' },
    { name: 'James Wilson', email: 'james@techcorp.com' },
    { name: 'Lisa Anderson', email: 'lisa@marketing.pro' },
    { name: 'David Kim', email: 'david@devteam.io' },
    { name: 'Rachel Green', email: 'rachel@events.co' },
    { name: 'Tom Harris', email: 'tom@consulting.com' },
  ];

  const subjects = [
    'Weekly Team Meeting',
    'Project Update - Q4 Goals',
    'Design Review Feedback',
    'Client Presentation Notes',
    'Budget Approval Required',
    'New Feature Launch',
    'Hiring Update',
    'Quarterly Report',
    'Meeting Minutes',
    'Task Assignment',
  ];

  const previews = [
    'Hi team, just a reminder about our weekly sync...',
    'Here\'s the latest update on our Q4 goals...',
    'I\'ve reviewed the designs and have some feedback...',
    'Notes from today\'s client presentation...',
    'Please review and approve the budget for Q2...',
    'We\'re launching the new feature next week...',
    'Update on the hiring process for the new position...',
    'The quarterly report is ready for review...',
    'Minutes from today\'s meeting are attached...',
    'I\'ve assigned new tasks for the sprint...',
  ];

  const bodies = [
    '<p>Hi team,</p><p>Just a reminder about our weekly sync tomorrow at 10 AM. Please come prepared with your updates.</p>',
    '<p>Here\'s the latest update on our Q4 goals. We\'re on track to meet all targets.</p>',
    '<p>I\'ve reviewed the designs and have some feedback. Let\'s discuss in our next meeting.</p>',
    '<p>Notes from today\'s client presentation. They were impressed with our progress.</p>',
    '<p>Please review and approve the budget for Q2. Let me know if you have any questions.</p>',
    '<p>We\'re launching the new feature next week. Here\'s the plan.</p>',
    '<p>Update on the hiring process for the new position. We have some great candidates.</p>',
    '<p>The quarterly report is ready for review. Please provide feedback by Friday.</p>',
    '<p>Minutes from today\'s meeting are attached. Please review and add any comments.</p>',
    '<p>I\'ve assigned new tasks for the sprint. Please check your dashboard.</p>',
  ];

  const emails = [];
  const now = new Date();

  for (let i = 0; i < 20; i++) {
    const sender = senders[i % senders.length];
    const subjectIndex = i % subjects.length;
    const isRead = i % 3 !== 0;
    const isStarred = i % 5 === 0;
    const hasAttachments = i % 4 === 0;
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);

    let timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);

    emails.push({
      id: String(i + 1),
      sender,
      subject: subjects[subjectIndex],
      preview: previews[subjectIndex],
      body: bodies[subjectIndex],
      timestamp,
      isRead,
      isStarred,
      hasAttachments,
      labels: i % 2 === 0 ? ['Work', 'Important'] : ['Personal'],
    });
  }

  return emails;
};

// Mock email service
export const mockEmailService = {
  getInbox: async () => {
    await delay(700);
    return generateMockEmails();
  },
  getSent: async () => {
    await delay(700);
    return generateMockEmails().slice(0, 5).map(e => ({ ...e, isRead: true }));
  },
  getDrafts: async () => {
    await delay(700);
    return generateMockEmails().slice(0, 3).map(e => ({ ...e, subject: `[Draft] ${e.subject}` }));
  },
  getSpam: async () => {
    await delay(700);
    return generateMockEmails().slice(0, 2).map(e => ({ ...e, labels: ['Spam'] }));
  },
  getTrash: async () => {
    await delay(700);
    return generateMockEmails().slice(0, 2).map(e => ({ ...e, isRead: true }));
  },
  getArchive: async () => {
    await delay(700);
    return generateMockEmails().slice(0, 3).map(e => ({ ...e, isRead: true }));
  },
  sendEmail: async () => {
    await delay(1000);
    return { success: true, id: Date.now() };
  },
  saveDraft: async () => {
    await delay(500);
    return { success: true, id: Date.now() };
  },
};




// Mock calendar events
const generateMockEvents = () => {
  const now = new Date();
  const events = [];
  
  const eventTypes = ['meeting', 'task', 'reminder', 'birthday', 'holiday'];
  const titles = [
    'Team Meeting',
    'Project Review',
    'Lunch with Client',
    'Design Workshop',
    'Code Review',
    'Sprint Planning',
    'Interview',
    'Conference Call',
    'Deadline',
    'Presentation'
  ];
  
  for (let i = 0; i < 15; i++) {
    const dayOffset = Math.floor(Math.random() * 20) - 10;
    const hourOffset = Math.floor(Math.random() * 12) + 8; // 8 AM - 8 PM
    
    const date = new Date(now);
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hourOffset, Math.floor(Math.random() * 60), 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 1 + Math.floor(Math.random() * 2));
    
    events.push({
      id: String(i + 1),
      title: titles[i % titles.length],
      start: date.toISOString(),
      end: endDate.toISOString(),
      description: `Description for ${titles[i % titles.length]}`,
      type: eventTypes[i % eventTypes.length],
      location: ['Conference Room A', 'Zoom', 'Meeting Room', 'Office'][i % 4],
      allDay: i % 5 === 0,
      reminder: i % 3 === 0 ? 15 : null,
      attendees: [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' }
      ]
    });
  }
  
  return events;
};

// Mock calendar service
export const mockCalendarService = {
  getEvents: async () => {
    await delay(600);
    return generateMockEvents();
  },
  createEvent: async (eventData) => {
    await delay(800);
    return {
      id: Date.now(),
      ...eventData,
      createdAt: new Date().toISOString(),
    };
  },
  updateEvent: async (eventId, eventData) => {
    await delay(800);
    return {
      id: eventId,
      ...eventData,
      updatedAt: new Date().toISOString(),
    };
  },
  deleteEvent: async () => {
    await delay(500);
    return { success: true };
  },
};




// Mock contacts data
const generateMockContacts = () => {
  const contacts = [];
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Lisa', 'Robert', 'Maria'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Spotify', 'Slack', 'Zoom', 'GitHub'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'startup.io'];
  
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < 20; i++) {
    const firstName = getRandom(firstNames);
    const lastName = getRandom(lastNames);
    const company = getRandom(companies);
    const domain = getRandom(domains);
    const name = `${firstName} ${lastName}`;
    
    contacts.push({
      id: String(i + 1),
      name: name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      mobile: `+1 ${getRandomNumber(200, 999)}-${getRandomNumber(200, 999)}-${getRandomNumber(1000, 9999)}`,
      company: company,
      designation: ['Software Engineer', 'Product Manager', 'Designer', 'Marketing Lead', 'CTO', 'CEO'][i % 6],
      favorite: i % 5 === 0,
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=${Math.floor(Math.random()*16777215).toString(16)}&color=fff&size=80`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: i % 3 === 0 ? 'Important contact' : '',
    });
  }
  
  return contacts;
};

// Mock contact service
export const mockContactService = {
  getContacts: async () => {
    await delay(600);
    return generateMockContacts();
  },
  createContact: async (contactData) => {
    await delay(800);
    return {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${contactData.name}&background=2563eb&color=fff&size=80`,
    };
  },
  updateContact: async (contactId, contactData) => {
    await delay(800);
    return {
      id: contactId,
      ...contactData,
      updatedAt: new Date().toISOString(),
    };
  },
  deleteContact: async () => {
    await delay(500);
    return { success: true };
  },
};





// Mock tasks data
const generateMockTasks = () => {
  const tasks = [];
  const taskNames = [
    'Complete project report',
    'Review design mockups',
    'Schedule team meeting',
    'Update documentation',
    'Fix bug in login flow',
    'Prepare presentation',
    'Send weekly update',
    'Review pull requests',
    'Plan sprint goals',
    'Update user profile',
    'Write test cases',
    'Deploy to production',
    'Optimize database queries',
    'Design new feature',
    'Conduct code review'
  ];
  
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const now = new Date();
  
  for (let i = 0; i < 15; i++) {
    const isCompleted = i % 4 === 0;
    const daysOffset = Math.floor(Math.random() * 10) - 5;
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + daysOffset);
    
    tasks.push({
      id: String(i + 1),
      name: taskNames[i % taskNames.length],
      description: `Detailed description for ${taskNames[i % taskNames.length]}`,
      dueDate: dueDate.toISOString(),
      priority: priorities[i % priorities.length],
      completed: isCompleted,
      createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: isCompleted ? new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString() : null,
    });
  }
  
  return tasks;
};

// Mock task service
export const mockTaskService = {
  getTasks: async () => {
    await delay(600);
    return generateMockTasks();
  },
  createTask: async (taskData) => {
    await delay(800);
    return {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
  },
  updateTask: async (taskId, taskData) => {
    await delay(800);
    return {
      id: taskId,
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
  },
  deleteTask: async () => {
    await delay(500);
    return { success: true };
  },
  toggleComplete: async (taskId, completed) => {
    await delay(500);
    return {
      id: taskId,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    };
  },
};



// Search service
export const mockSearchService = {
  search: async (query, filter = 'all') => {
    await delay(500);
    
    if (!query.trim()) {
      return { results: [], total: 0 };
    }

    const searchQuery = query.toLowerCase();

    // Search in emails (from your email context)
    const emails = await mockEmailService.getInbox();
    const emailResults = emails
      .filter(email => 
        email.sender.name.toLowerCase().includes(searchQuery) ||
        email.subject.toLowerCase().includes(searchQuery) ||
        email.preview.toLowerCase().includes(searchQuery)
      )
      .map(email => ({
        id: `email-${email.id}`,
        type: 'email',
        title: email.subject,
        description: email.preview,
        sender: email.sender.name,
        timestamp: email.timestamp,
        email: email,
        relevance: email.subject.toLowerCase().includes(searchQuery) ? 2 : 1,
      }));

    // Search in contacts (from your contact context)
    const contacts = await mockContactService.getContacts();
    const contactResults = contacts
      .filter(contact =>
        contact.name.toLowerCase().includes(searchQuery) ||
        contact.email.toLowerCase().includes(searchQuery) ||
        contact.company.toLowerCase().includes(searchQuery)
      )
      .map(contact => ({
        id: `contact-${contact.id}`,
        type: 'contact',
        title: contact.name,
        description: contact.email,
        company: contact.company,
        contact: contact,
        relevance: contact.name.toLowerCase().includes(searchQuery) ? 2 : 1,
      }));

    // Search in tasks (from your task context)
    const tasks = await mockTaskService.getTasks();
    const taskResults = tasks
      .filter(task =>
        task.name.toLowerCase().includes(searchQuery) ||
        task.description.toLowerCase().includes(searchQuery)
      )
      .map(task => ({
        id: `task-${task.id}`,
        type: 'task',
        title: task.name,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        task: task,
        relevance: task.name.toLowerCase().includes(searchQuery) ? 2 : 1,
      }));

    // Search in calendar events
    const events = await mockCalendarService.getEvents();
    const eventResults = events
      .filter(event =>
        event.title.toLowerCase().includes(searchQuery) ||
        event.description.toLowerCase().includes(searchQuery)
      )
      .map(event => ({
        id: `event-${event.id}`,
        type: 'event',
        title: event.title,
        description: event.description,
        date: event.start,
        event: event,
        relevance: event.title.toLowerCase().includes(searchQuery) ? 2 : 1,
      }));

    // Combine all results
    let allResults = [...emailResults, ...contactResults, ...taskResults, ...eventResults];

    // Apply filter
    if (filter !== 'all') {
      allResults = allResults.filter(r => r.type === filter.slice(0, -1)); // Remove 's' from plural
    }

    // Sort by relevance
    allResults.sort((a, b) => b.relevance - a.relevance);

    // Limit results
    const limitedResults = allResults.slice(0, 20);

    return {
      results: limitedResults,
      total: allResults.length,
      filtered: limitedResults.length,
    };
  },

  getRecentSearches: async () => {
    await delay(300);
    const recent = localStorage.getItem('recentSearches');
    return recent ? JSON.parse(recent) : [];
  },

  saveRecentSearch: async (query) => {
    await delay(200);
    let recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recent = recent.filter(item => item !== query);
    recent.unshift(query);
    if (recent.length > 10) recent = recent.slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(recent));
    return recent;
  },

  clearRecentSearches: async () => {
    await delay(200);
    localStorage.removeItem('recentSearches');
    return [];
  },
};