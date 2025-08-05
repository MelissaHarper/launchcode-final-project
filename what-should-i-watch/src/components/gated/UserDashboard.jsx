import { useUser } from "@clerk/clerk-react";
import ToWatch from "./ToWatch";

const UserDashboard = () => {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <p>Please sign in to view your dashboard.</p>;
  }

  return (
    <div className="user-dashboard">
      <div className="profile">
        <img
          src={user?.imageUrl}
          alt={user?.username || "User Avatar"}
          className="profile-photo"
        />
        <h2>{user?.username}</h2>
        <p>{user?.primaryEmailAddress?.emailAddress}</p>
      </div>

      <h3>Your To Watch List</h3>
      <ToWatch />
    </div>
  );
};

export default UserDashboard;
