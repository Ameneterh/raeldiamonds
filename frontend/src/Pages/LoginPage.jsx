import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TitleText from "../Components/TitleText";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import Divider from "../Components/Divider";
import { LoginUser } from "../apiCalls/users";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const rules = [
    {
      required: true,
      message: "All fields required!",
    },
  ];

  const handleFormSubmit = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center px-2">
      <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-10 shadow rounded sm:rounded-lg">
        <div className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <TitleText text1={"login"} />
        </div>
        <Divider />
        <Form layout="vertical" className="mt-6" onFinish={handleFormSubmit}>
          {/* email input */}
          <Form.Item label="User Email" name={"email"} rules={rules}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* passwird input */}
          <Form.Item label="Password" name={"password"} rules={rules}>
            <div className="flex items-center">
              <Input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Use Strong password"
              />
              <div
                className="cursor-pointer -ml-6 z-10 h-10 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-lg text-gray-700" />
                ) : (
                  <FaEye className="text-lg text-gray-700" />
                )}
              </div>
            </div>
          </Form.Item>

          <div className="my-6">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            ></label>
          </div>

          <Button type="primary" htmlType="submit" block>
            LOGIN
          </Button>
          <div className="text-center sm:flex text-sm mt-6">
            <p className="text-gray-500">Don't have an account?</p>
            <Link to="/register" className="text-primary ml-1">
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
