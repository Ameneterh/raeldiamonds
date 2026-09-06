import React from "react";
import MainLayout from "../layout/MainLayout";
import { Tabs } from "antd";
import SellerProducts from "./sellerProfile/SellerProducts";
import UserBidsDisplay from "./sellerProfile/UserBidsDisplay";
import UserProfilePage from "./sellerProfile/UserProfilePage";

export default function SellerProfilePage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="All Products" key="1">
            <SellerProducts />
          </Tabs.TabPane>
          <Tabs.TabPane tab="My Bids" key="2">
            <UserBidsDisplay />
          </Tabs.TabPane>
          <Tabs.TabPane tab="General" key="3">
            <UserProfilePage />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
}
