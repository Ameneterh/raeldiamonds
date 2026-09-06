import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apiCalls/users";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({ children }) {
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      message.error("Please, login to continue");
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        <div className="">{children}</div>
      </div>
    )
  );
}
