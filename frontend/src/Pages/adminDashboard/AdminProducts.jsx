import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { GetProducts, UpdateProductStatus } from "../../apiCalls/products";

export default function AdminProducts() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getData = async () => {
    try {
      const response = await GetProducts(null);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (status, id) => {
    try {
      const response = await UpdateProductStatus(status, id);
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
      title: "Product Name",
      dataIndex: "product_name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.fullname;
      },
    },
    {
      title: "Product Description",
      dataIndex: "product_description",
      render: (text, record) => {
        return (
          <div className="max-w-4xl line-clamp-3">
            {record.product_description}
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Sub Category",
      dataIndex: "sub_category",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Added On",
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
            {status === "pending" && (
              <span
                onClick={() => onStatusUpdate("approved", _id)}
                className="underline cursor-pointer text-green-700"
              >
                Approve
              </span>
            )}
            {status === "pending" && (
              <span
                onClick={() => onStatusUpdate("rejected", _id)}
                className="underline cursor-pointer text-orange-700"
              >
                Reject
              </span>
            )}
            {status === "approved" && (
              <span
                onClick={() => onStatusUpdate("blocked", _id)}
                className="underline cursor-pointer text-red-700"
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                onClick={() => onStatusUpdate("approved", _id)}
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
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            // setSelectedAdvert(null);
            // setShowAdvertForm(true);
          }}
          type="default"
        >
          Add Product Advert
        </Button>
      </div>

      {/* table to show products */}
      <Table columns={columns} dataSource={products} scroll={{ x: 400 }} />

      {/* call product form */}
      {/* {showAdvertForm && (
              <SellerProductForm
                showProductForm={showProductForm}
                setShowProductForm={setShowProductForm}
                selectedProduct={selectedProduct}
                getData={getData}
              />
            )} */}
    </div>
  );
}
