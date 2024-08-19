import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../assets/logo1.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userRole = localStorage.getItem('user_role');
    if (userRole) {
      // Redirect user based on their role
      if (userRole === 'student') {
        navigate('/student');
      } else if (userRole === 'teacher') {
        navigate('/teacher');
      } else if (userRole === 'guardian') {
        navigate('/guardian');
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    // Define allowed users
    const users = {
      student: '123',
      teacher: '123',
      guardian: '123',
    };

    // Check if the provided email and password match any predefined users
    const role = email.toLowerCase();
    if (users[role] && password === users[role]) {
      // Save user data to localStorage
      localStorage.setItem('user_id', '1'); // Example user ID
      localStorage.setItem('user_role', role);
      localStorage.setItem('user_email', email);

      // Redirect user based on their role
      navigate(`/${role}`);
    } else {
      setError('Invalid login credentials');
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fcf6f6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <img
          className="w-48 h-28 mx-auto mb-6"
          src={logo1}
          alt="Logo"
        />
        <div className="text-center text-4xl font-extrabold text-[#519bf3] font-['Bitter'] mb-6">Login</div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-xl font-medium mb-2">Login (e-mail address)</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#519bf3] text-white text-2xl font-extrabold rounded-lg shadow mb-4"
        >
          Login
        </button>
        <div className="flex justify-between">
          <button
            onClick={handleCreateAccount}
            className="text-[#519bf3] text-xl font-extrabold"
          >
            Create account
          </button>
          <button className="text-[#519bf3] text-xl font-extrabold">Forgot password</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
