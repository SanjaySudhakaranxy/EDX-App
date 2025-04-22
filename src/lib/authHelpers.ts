import { supabase } from './supabase';
import { User, UserRole } from '@/types/user';
import { AuthError } from '@supabase/supabase-js';

export class AuthenticationError extends Error {
  constructor(message: string, public originalError?: AuthError) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw new AuthenticationError('Failed to sign in with Google', error);
    return data;
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    throw new AuthenticationError('Unexpected error during Google sign-in', error as AuthError);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new AuthenticationError('Invalid email or password', error);
    return data;
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    throw new AuthenticationError('Unexpected error during email sign-in', error as AuthError);
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string,
  role: UserRole,
  grade?: string
) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw new AuthenticationError('Failed to create account', authError);

    if (!authData.user) {
      throw new AuthenticationError('User data not found after signup');
    }

    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email,
          name,
          role,
          grade,
        },
      ]);

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.signOut();
      throw new AuthenticationError('Failed to create user profile', profileError);
    }

    return authData;
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    throw new AuthenticationError('Unexpected error during registration', error as AuthError);
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthenticationError('Failed to sign out', error);
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    throw new AuthenticationError('Unexpected error during sign out', error as AuthError);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) throw new AuthenticationError('Failed to get current user', authError);
    if (!user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw new AuthenticationError('Failed to get user profile', profileError);
    return profile;
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    throw new AuthenticationError('Unexpected error while getting current user', error as AuthError);
  }
}; 