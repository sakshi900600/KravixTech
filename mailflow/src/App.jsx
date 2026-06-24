import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ROUTES } from './utils/constants';
// pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { InboxPage } from './pages/InboxPage';
import { CalendarPage } from './pages/CalendarPage';
import { ContactsPage } from './pages/ContactsPage';
import { TasksPage } from './pages/TasksPage';
import { SentPage } from './pages/SentPage';
import { DraftsPage } from './pages/DraftsPage';
import { SpamPage } from './pages/SpamPage';
import { TrashPage } from './pages/TrashPage';
import { ArchivePage } from './pages/ArchivePage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return children;
};

// App Content
const AppContent = () => {
  const { theme } = useTheme();

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          
          {/* Protected Routes with Dashboard Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.INBOX} element={<InboxPage />} />
            <Route path={ROUTES.SENT} element={<SentPage />} />
            <Route path={ROUTES.DRAFTS} element={<DraftsPage />} />
            <Route path={ROUTES.SPAM} element={<SpamPage />} />
            <Route path={ROUTES.TRASH} element={<TrashPage />} />
            <Route path={ROUTES.ARCHIVE} element={<ArchivePage />} />
            <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
            <Route path={ROUTES.CONTACTS} element={<ContactsPage />} />
            <Route path={ROUTES.TASKS} element={<TasksPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </Router>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#111827',
          },
        }}
      />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;