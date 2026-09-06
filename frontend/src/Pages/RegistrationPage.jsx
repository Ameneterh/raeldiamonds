import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import TitleText from "../Components/TitleText";
import Divider from "../Components/Divider";
import { RegisterUser } from "../apiCalls/users";

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const navigate = useNavigate();

  const rules = [{ required: true, message: "All fields required!" }];

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await RegisterUser(values);

      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center p-2">
      <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-8 shadow rounded sm:rounded-lg">
        <div className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <TitleText text1={"registration"} />
        </div>
        <Divider />
        <Form layout="vertical" className="mt-6" onFinish={handleFormSubmit}>
          {/* full name input */}
          <Form.Item label="Full Name" name={"fullname"} rules={rules}>
            <Input placeholder="Full Name" />
          </Form.Item>

          {/* email input */}
          <Form.Item label="User Email" name={"email"} rules={rules}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* phone number input */}
          <Form.Item label="User Phone Number" name={"phone"} rules={rules}>
            <Input placeholder="Phone Number: 2348154230654" />
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

          {/* <div className="my-6">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            ></label>

            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span className="cursor-pointer">Upload a file</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div> */}

          <div className="flex items-center gap-1 mb-5 justify-center text-center bg-gray-100 rounded py-1">
            {/* <Form.Item
              label=""
              name="accept_tc_privacy"
              valuePropName="checked"
              className="flex items-center"
            >
              <Input
                type="checkbox"
                className="max-width"
                onChange={(e) => {
                  {
                    e.target.checked;
                  }
                }}
                checked={accept_tc_privacy}
              />
            </Form.Item> */}
            <p>
              By clicking on register, you agree with our{" "}
              <Link to="/terms-of-use" target="_blank">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
            </p>
          </div>

          <Button type="primary" htmlType="submit" block>
            REGISTER
          </Button>
          <div className="text-center sm:flex text-sm mt-6">
            <p className="text-gray-500">Already have an account?</p>
            <Link to="/login" className="text-primary ml-1">
              Login here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
