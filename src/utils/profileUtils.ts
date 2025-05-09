
import { supabase } from "@/integrations/supabase/client";
import type { ProfileInsertType } from "@/types/auth";

/**
 * Checks if a profile exists for a user and creates one if it doesn't
 */
export const ensureProfileExists = async (userId: string, userName?: string | null): Promise<boolean> => {
  try {
    console.log("Checking if profile exists for user:", userId);
    
    // First check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.log("No profile found or error occurred, creating one...");
      
      // If we encounter an error, attempt to create a profile
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const name = userName || userData?.user?.user_metadata?.full_name || 
                  `${userData?.user?.user_metadata?.first_name || ''} ${userData?.user?.user_metadata?.last_name || ''}`.trim();
      
      // Create profile if it doesn't exist
      const { data: insertData, error: insertError } = await supabase
        .from('profiles')
        .insert([{ 
          id: userId,
          full_name: name
        } as ProfileInsertType]);
        
      if (insertError) {
        console.error("Error creating profile:", insertError);
        
        // If insert fails, try upsert as a fallback
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert([{ 
            id: userId,
            full_name: name
          } as ProfileInsertType]);
          
        if (upsertError) {
          console.error("Upsert fallback also failed:", upsertError);
          return false;
        }
        
        console.log("Profile created via upsert fallback");
        return true;
      }
      
      console.log("Profile created successfully");
      return true;
    }
    
    console.log("Profile already exists:", profile);
    return true;
  } catch (error) {
    console.error("Unexpected error in ensureProfileExists:", error);
    return false;
  }
};
