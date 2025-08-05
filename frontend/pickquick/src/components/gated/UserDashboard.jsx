import { useUser } from "@clerk/clerk-react";
import ToWatch from "./ToWatch";

const UserDashboard = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <p>Please sign in to view your dashboard.</p>;
  }

  return (
    <div>
      <h3>Your To Watch List</h3>
      <ToWatch />
    </div>
  );
};

export default UserDashboard;
