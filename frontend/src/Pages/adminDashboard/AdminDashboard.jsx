import React, { useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { Tabs } from "antd";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Products" key="1">
            <AdminProducts />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="2">
            <AdminUsers />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
}
