import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, name, phone) => {
    try {
      setError(null);
      const result = await authService.signUp(email, password, name, phone);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signIn = async (email, password) => {
    try {
      setError(null);
      const result = await authService.signIn(email, password);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};