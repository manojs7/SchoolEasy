import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    fetch("/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        localStorage.removeItem("role");
        console.error("heyaa", res);
        if (!res.status === 200) {
          const error = new Error(res.error);
          console.error("hey", error);
          throw error;
        }
        // history.push("/login", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <div>
      <h1> Logout page</h1>
    </div>
  );
};

export default Logout;
