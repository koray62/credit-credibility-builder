
import { Session, User } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export type ProfileType = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsertType = Database['public']['Tables']['profiles']['Insert'];

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
};
