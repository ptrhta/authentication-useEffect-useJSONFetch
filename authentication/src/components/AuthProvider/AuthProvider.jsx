import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AuthContext from './../../contexts/AuthContext';
import useStore from './../../hooks/useStore';

const INITIAL_STATE = {
    PROFILE: null,
    TOKEN: null
  };

const STORE_KEYS = {
    PROFILE: 'profile',
    TOKEN: 'token'
};

export default function AuthProvider({ children }) {
    const [isLogging, setIsLogging] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [profile, setProfile] = useStore(STORE_KEYS.PROFILE);
    const [token, setToken] = useStore(STORE_KEYS.TOKEN);
    const isLoggedIn = !!token;
  
    const login = async (login, password) => {
      try {
        setIsLogging(true);
        const response = await fetch(process.env.REACT_APP_AUTH_URL, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({login, password})
        });
  
        if (!response.ok) {
          throw new Error('Авторизация прошла неуспешно');
        }
  
        const { token } = await response.json();
        setToken(token);
        setIsLogging(false);

      } catch (error) {
        setIsLogging(false);
        alert(error.message);
      }
    };
  
    const logout = () => {
      setProfile(INITIAL_STATE.PROFILE);
      setToken(INITIAL_STATE.TOKEN);
    };
  
    const fetchProfile = async () => {
      if (
        !isLoggedIn
        || (isLoggedIn && profile)
      ) {
        return;
      }
  
      setIsProfileLoading(true);
  
      try {
        const response = await fetch(process.env.REACT_APP_PROFILE_URL, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        setIsProfileLoading(false);
  
        if (!response.ok && response.status === 401) {
          logout();
          return false
        }
  
        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        const profile = await response.json();
  
        setProfile(profile);

      } catch (error) {
        setIsProfileLoading(false);
        alert(error.message);
      }
    };
  
    useEffect(() => {
      fetchProfile();
    }, [isLoggedIn]);
  
    return (
      <AuthContext.Provider value={{
        isLoggedIn,
        isLogging,
        isProfileLoading,
        profile,
        token,
        login: login,
        logout: logout
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  AuthProvider.propTypes = {
    children: PropTypes.node
  };