import { useAuth } from "@clerk/clerk-react";

function AuthorizeUser() {
  const { getToken } = useAuth();

  const fetchData = async () => {
    if (getToken) {
      // Get the userId or null if the token is invalid
      let res = await fetch("http://localhost:8080/clerk_jwt", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      console.log(await res.json()); // {userId: 'the_user_id_or_null'}

      // Get gated data or a 401 Unauthorized if the token is not valid
      res = await fetch("http://localhost:8080/gated_data", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (res.ok) {
        console.log(await res.json()); // {foo: "bar"}
      } else {
        // Token was invalid
      }
    }
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}

export default AuthorizeUser;
