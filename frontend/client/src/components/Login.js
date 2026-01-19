import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await axios.post(endpoint, { username, password });
      
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
      onLogin(response.data.user, response.data.token);
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      if (message.includes('Invalid credentials') || message.includes('User not found')) {
        toast.error('Invalid username or password');
      } else if (message.includes('already exists')) {
        toast.error('Username already exists');
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = async () => {
    try {
      await axios.post('/api/seed');
      setUsername('demo');
      setPassword('demo123');
      toast.success('Demo data loaded! Use username: demo, password: demo123');
    } catch (error) {
      toast.error('Error loading demo data');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Kanban Board</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        
        <button 
          type="button" 
          className="toggle-button"
          onClick={() => setIsLogin(!isLogin)}
          disabled={loading}
        >
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
        
        <button type="button" className="demo-button" onClick={loadDemo} disabled={loading}>
          Load Demo Data
        </button>
      </div>
    </div>
  );
}

export default Login;