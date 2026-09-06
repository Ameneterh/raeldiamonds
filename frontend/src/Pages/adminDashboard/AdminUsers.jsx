import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { GetAllUsers, UpdateUserStatus } from "../../apiCalls/users";

export default function AdminUsers() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getData = async () => {
    try {
      const response = await GetAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (status, id) => {
    try {
      const response = await UpdateUserStatus(status, id);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "User Image",
      dataIndex: "avatar",
      render: (text, record) => {
        return <img src={record.avatar} alt="" className="h-12 w-1/2" />;
      },
    },
    {
      title: "User Full Name",
      dataIndex: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.role.toUpperCase();
      },
    },
    // {
    //   title: "Product Description",
    //   dataIndex: "product_description",
    //   render: (text, record) => {
    //     return (
    //       <div className="max-w-4xl line-clamp-3">
    //         {record.product_description}
    //       </div>
    //     );
    //   },
    // },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Registered On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD/MM/YYYY hh:mm A"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <span
                onClick={() => onStatusUpdate("blocked", _id)}
                className="underline cursor-pointer text-red-700"
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                onClick={() => onStatusUpdate("active", _id)}
                className="underline cursor-pointer text-green-700"
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {/* table to show users */}
      <Table columns={columns} dataSource={users} scroll={{ x: 400 }} />
    </div>
  );
}
