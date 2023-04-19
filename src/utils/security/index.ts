import { useProfile } from "../../hooks/useProfile";

const useAccess = () => {
  const profile = useProfile();

  return (user_id: number) => {
    if (profile?.data?.data?.type === "SUPER_ADMIN") return true;
    return profile?.data?.data?.id === user_id;

  };
};

export { useAccess };
