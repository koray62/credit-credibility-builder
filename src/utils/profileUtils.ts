
import { supabase } from "@/integrations/supabase/client";
import type { ProfileInsertType } from "@/types/auth";

/**
 * Checks if a profile exists for a user and creates one if it doesn't
 */
export const ensureProfileExists = async (userId: string, userName?: string | null): Promise<boolean> => {
  try {
    console.log("Checking if profile exists for user:", userId);
    
    // Add a small delay to ensure auth state is fully settled
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // First check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle to avoid errors when no rows found
    
    if (profile) {
      console.log("Profile already exists:", profile);
      return true;
    }
    
    if (profileError && !profileError.message.includes('No rows found')) {
      console.error("Error checking profile:", profileError);
      return false;
    }
    
    console.log("No profile found, creating one...");
    
    // Get user metadata if userName not provided
    let name = userName;
    if (!name) {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (!userError && userData?.user) {
          name = userData.user.user_metadata?.full_name || 
                `${userData.user.user_metadata?.first_name || ''} ${userData.user.user_metadata?.last_name || ''}`.trim();
        }
      } catch (error) {
        console.warn("Could not fetch user metadata:", error);
      }
    }
    
    // Create profile
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{ 
        id: userId,
        full_name: name || null
      } as ProfileInsertType]);
        
    if (insertError) {
      // Check if it's a duplicate key error (profile was created by another process)
      if (insertError.code === '23505') {
        console.log("Profile already exists (created by another process)");
        return true;
      }
      
      console.error("Error creating profile:", insertError);
      
      // Try upsert as a fallback
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert([{ 
          id: userId,
          full_name: name || null
        } as ProfileInsertType], {
          onConflict: 'id'
        });
        
      if (upsertError) {
        console.error("Upsert fallback also failed:", upsertError);
        return false;
      }
      
      console.log("Profile created via upsert fallback");
      return true;
    }
    
    console.log("Profile created successfully");
    return true;
  } catch (error) {
    console.error("Unexpected error in ensureProfileExists:", error);
    return false;
  }
};
