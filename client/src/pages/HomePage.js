import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const HomePage = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/users/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>

    
    <div>
      <h1></h1>
    </div>
    
    </Layout>
  );
};

export default HomePage