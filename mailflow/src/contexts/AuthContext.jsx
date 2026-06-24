import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create context
const AuthContext = createContext();

// Mock user data
const MOCK_USER = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff',
  role: 'Product Manager',
};

// Mock token
const MOCK_TOKEN = 'mock-jwt-token-12345';

// Mock delay function
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Auth Provider Component
 * Manages authentication state and provides login/logout functions
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useLocalStorage('auth_token', null);

  // Verify token on mount
  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          await delay(600);
          if (token === MOCK_TOKEN) {
            setUser(MOCK_USER);
          } else {
            setToken(null);
            setUser(null);
          }
        } catch {
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    verifyAuth();
  }, [token, setToken]);

  /**
   * Login function - Returns object with success/error
   */
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await delay(1000);
      
      // Check credentials
      if (credentials.email === 'john@example.com' && credentials.password === 'password123') {
        const userData = MOCK_USER;
        setUser(userData);
        if (credentials.rememberMe) {
          setToken(MOCK_TOKEN);
        }
        setIsLoading(false);
        return { success: true, error: null };
      }
      
      // Invalid credentials - return error without throwing
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Invalid email or password. Please try again.' 
      };
      
    } catch (_err) {
      setIsLoading(false);
      return { 
        success: false, 
        error: _err.message || 'Login failed. Please try again.' 
      };
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await delay(500);
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
    } catch (_err) {
      console.error('Logout error:', _err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};