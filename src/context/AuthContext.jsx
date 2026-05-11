import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, companies(*)')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('dev_session');
  };

  const devLogin = (role = 'admin') => {
    const dummyProfile = {
      id: 'dev_user_999',
      full_name: role === 'admin' ? 'UK Admin' : role === 'blogger' ? 'Content Strategist' : 'Indian Contractor',
      role: role,
      company_id: 'dev_company_999',
      companies: { name: 'LogicWave Dev' }
    };
    setProfile(dummyProfile);
    setUser({ id: 'dev_user_999', email: 'dev@logicwave.co.uk' });
    localStorage.setItem('dev_session', JSON.stringify(dummyProfile));
  };

  const switchRole = () => {
    if (profile?.id === 'dev_user_999') {
      const roles = ['admin', 'contractor', 'blogger'];
      const currentIndex = roles.indexOf(profile.role);
      const nextRole = roles[(currentIndex + 1) % roles.length];
      devLogin(nextRole);
    }
  };

  // Check for dev session on mount
  useEffect(() => {
    const saved = localStorage.getItem('dev_session');
    if (saved && !user) {
      const p = JSON.parse(saved);
      setProfile(p);
      setUser({ id: p.id, email: 'dev@logicwave.co.uk' });
      setLoading(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, devLogin, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
