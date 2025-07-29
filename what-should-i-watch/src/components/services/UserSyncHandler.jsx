import { useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserSyncHandler = () => {
  const [synced, setSynced] = useState(false);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { baseUrl } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) {
        return;
      }
      try {
        const token = await getToken();
        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.username,
          photoUrl: user.imageUrl,
          movies: [],
          createdAt: user.created_at,
        };

        await axios.post(`${baseUrl}/users`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSynced(true);
      } catch (error) {
        toast.error(error.message);
      }
    };
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced, baseUrl]);
  return null;
};

export default UserSyncHandler;
