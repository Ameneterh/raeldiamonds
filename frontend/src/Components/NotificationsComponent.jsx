import { message, Modal } from "antd";
import React from "react";
import moment from "moment";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { DeleteNotification } from "../apiCalls/notifications";

export default function NotificationsComponent({
  notifications,
  reloadNotifications,
  showNofications,
  setShowNotifications,
}) {
  const navigate = useNavigate();

  const deleteNotification = async (id) => {
    try {
      const response = await DeleteNotification(id);
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      open={showNofications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            className="flex flex-col border border-solid border-gray-300 rounded p-2 cursor-pointer"
            key={notification._id}
          >
            <div className="flex items-center gap-4 justify-between">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
                className="flex-1"
              >
                <h1 className="text-lg text-gray-700">{notification.title}</h1>
                <Divider />
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  <span>{moment(notification.createdAt).fromNow()}</span>
                </p>
              </div>
              <MdDeleteForever
                onClick={() => deleteNotification(notification._id)}
                className="w-6 h-6 cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
