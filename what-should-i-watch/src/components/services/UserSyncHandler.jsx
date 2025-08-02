// For future Clerk Authorization
import { useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

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
        const token = await getToken({ template: "pickQuick" });
        const userData = {
          id: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.username,
          photoUrl: user.imageUrl,
          createdAt: user.createdAt,
        };

        await axios.post(`${baseUrl}/users/add`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ User synced to backend");
        setSynced(true);
      } catch (error) {
        console.error(
          "❌ Error saving user:",
          error.response?.data || error.message
        );
      }
    };
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced, baseUrl]);
  return null;
};

export default UserSyncHandler;
