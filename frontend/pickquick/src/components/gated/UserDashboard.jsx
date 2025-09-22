import { lazy, Suspense } from "react";
import { useUser } from "@clerk/clerk-react";
const ToWatch = lazy(() => import("./ToWatch"));

const UserDashboard = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <p>Please sign in to view your dashboard.</p>;
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <h3>Your To Watch List</h3>
        <ToWatch />
      </Suspense>
    </div>
  );
};

export default UserDashboard;
