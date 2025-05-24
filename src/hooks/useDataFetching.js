import { useState, useEffect } from 'react';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Custom hook for fetching today's menu and all menus
export const useMenus = () => {
  const [menus, setMenus] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [todayRes, allRes] = await Promise.all([
          api.get('/menus'),
          api.get('/menus/all'),
        ]);
        setMenus(todayRes.data);
        setAllMenus(allRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch menus');
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  return { menus, allMenus, loading, error };
};

// Custom hook for fetching meal counts
export const useMealCounts = () => {
  const [mealCounts, setMealCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealCounts = async () => {
      try {
        const response = await api.get('/feedbacks/count');
        setMealCounts(response.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch meal counts');
      } finally {
        setLoading(false);
      }
    };
    fetchMealCounts();
  }, []);

  return { mealCounts, loading, error };
};

// Custom hook for menu operations (update, create, delete)
export const useMenuOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMenu = async (menuId, menuData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/menus/update/${menuId}`, menuData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update menu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateMenu, loading, error };
};

// Custom hook for feedback operations
export const useFeedbackOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitFeedback = async (menuId, willEat) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/feedbacks/eat/${menuId}`, { willEat });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async (menuId, comment) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/feedbacks/${menuId}`, { comment });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit comment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitFeedback, submitComment, loading, error };
};

// Custom hook for authentication operations
export const useAuthOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      setError('Token invalid or expired');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, verifyUser, loading, error };
}; 