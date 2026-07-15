import { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const saved = localStorage.getItem('user');
    if (!token || !saved) { setLoading(false); return; }
    setUser(JSON.parse(saved));
    API.get('/auth/me').then(({ data }) => {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    }).catch(() => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); })
    .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (formData) => {
    const { data } = await API.post('/auth/register', formData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    API.get('/auth/logout').catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
