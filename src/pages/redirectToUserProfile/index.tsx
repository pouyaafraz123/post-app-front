import { useProfile } from "../../hooks/useProfile";
import Loader from "../../components/common/loader";
import { Navigate } from "react-router-dom";

const RedirectToUserProfile = () => {
  const profile = useProfile();

  return (
    <Loader isLoading={profile.isLoading} isError={profile.isError}>
      <Navigate to={`/profile/${profile?.data?.data?.id}`} />
    </Loader>
  );
};

export default RedirectToUserProfile;
