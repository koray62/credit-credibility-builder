
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useFindeksScore = () => {
  const { user } = useAuth();
  const [findeksScore, setFindeksScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFindeksScore();
    } else {
      setFindeksScore(null);
      setIsLoading(false);
    }
  }, [user]);

  const fetchFindeksScore = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('findeks_score')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching findeks score:', error);
        return;
      }

      if (data?.findeks_score) {
        setFindeksScore(data.findeks_score);
      }
    } catch (error) {
      console.error('Error fetching findeks score:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshScore = () => {
    fetchFindeksScore();
  };

  return {
    findeksScore,
    isLoading,
    refreshScore
  };
};
