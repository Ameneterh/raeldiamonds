import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import SellerProductForm from "./SellerProductForm";
import { DeleteProduct, GetProducts } from "../../apiCalls/products";
import BidsComponent from "./BidsComponent";
import { Link } from "react-router-dom";

// products from tutorial
export default function SellerProducts() {
  const [showBids, setShowBids] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getData = async () => {
    try {
      const response = await GetProducts({ seller: user._id });
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      render: (text, record) => {
        return (
          <div className="max-w-[200px] line-clamp-2">
            <Link to={`/product/${record._id}`}>{record.product_name}</Link>
          </div>
        );
      },
    },
    // {
    //   title: "Product Description",
    //   dataIndex: "product_description",
    //   render: (text, record) => {
    //     return (
    //       <div className="max-w-[300px] line-clamp-3">
    //         {record.product_description}
    //       </div>
    //     );
    //   },
    // },
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
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return (
          <div className="max-w-[100px]">
            {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <MdDeleteForever
              onClick={() => deleteProduct(record._id)}
              className="h-5 w-5 cursor-pointer text-red-600"
            />
            <CiEdit
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
              className="h-5 w-5 cursor-pointer text-green-600"
            />{" "}
            <span
              className="cursor-pointer text-blue-700 underline underline-offset-2"
              onClick={() => {
                setSelectedProduct(record);
                setShowBids(true);
              }}
            >
              Show Bids
            </span>
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
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
          type="default"
        >
          Add Product
        </Button>
      </div>

      {/* table to show products */}
      <Table columns={columns} dataSource={products} scroll={{ x: 400 }} />

      {/* call product form */}
      {showProductForm && (
        <SellerProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}

      {/* new bids placement modal */}
      {showBids && (
        <BidsComponent
          showBidsModal={showBids}
          setShowBidsModal={setShowBids}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}
