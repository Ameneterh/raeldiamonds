import { Modal, Tabs, Form, Input, Row, Col, message } from "antd";
import React, { useEffect, useState } from "react";
import { EditUser } from "../apiCalls/users.js";
import UserImages from "./sellerProfile/UserImages.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const rules = [
  {
    required: true,
    message: "All fields required!",
  },
];

export default function EditUserForm({
  showEditUser,
  setShowEditUser,
  selectedUser,
  // getData,
}) {
  const formRef = React.useRef(null);
  const [selectedTab, setSelectedTab] = useState("1");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      formRef.current.setFieldsValue(selectedUser);
    }
  }, [selectedUser]);

  const handleFormSubmit = async (values) => {
    try {
      let response = await EditUser(selectedUser._id, values);

      if (response.success) {
        message.success(response.message);
        // getData();
        window.location.href = "/seller-profile";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title=""
      open={showEditUser}
      onCancel={() => setShowEditUser(false)}
      centered
      okText="Save"
      onOk={() => formRef.current.submit()}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-2xl text-center font-semibold text-primary capitalize">
          Edit User Details
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="User Details" key="1">
            <Form layout="vertical" ref={formRef} onFinish={handleFormSubmit}>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Form.Item
                  label="User Full Name"
                  name="fullname"
                  rules={rules}
                  className="w-full"
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="User Email"
                  name="email"
                  rules={rules}
                  className="w-full"
                >
                  <Input type="email" />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Form.Item
                  label="User Phone"
                  name="phone"
                  rules={rules}
                  className="w-full"
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={rules}
                  className="w-full"
                >
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
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="User Image" key="2" disabled={!selectedUser}>
            <UserImages
              selectedUser={selectedUser}
              setShowEditUser={setShowEditUser}
              // getData={getData}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}
