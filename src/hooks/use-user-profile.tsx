
import { useState, useEffect, createContext, useContext } from 'react';
import { profileService } from '@/services';
import { Profile } from '@/types/api';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, isLoading, error };
};

const UserProfileContext = createContext<{
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}>({
  profile: null,
  isLoading: true,
  error: null,
});

export const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile, isLoading, error } = useUserProfile();

  return (
    <UserProfileContext.Provider value={{ profile, isLoading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(UserProfileContext);
};
