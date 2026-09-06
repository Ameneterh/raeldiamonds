import { message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { GetAllBids } from "../../apiCalls/products";
import { MdCall } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";

// bids from tutorial
export default function BidsComponent({
  showBidsModal,
  setShowBidsModal,
  selectedProduct,
}) {
  const [bidsData, setBidsData] = useState([]);

  const getData = async () => {
    try {
      const response = await GetAllBids({ product: selectedProduct._id });
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedProduct]);

  const columns = [
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("MMM D, YYYY, hh:mm A");
      },
    },
    {
      title: "Name",
      dataIndex: "fullname",
      render: (text, record) => {
        return record.buyer.fullname;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
      render: (text, record) => {
        return record.bidAmount.toLocaleString();
      },
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (text, record) => {
        return (
          <div className="max-w-[300px] line-clamp-4">{record.message}</div>
        );
      },
    },
    {
      title: "Contact Information",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div className="">
            <p className="flex items-center gap-1">
              <span className="font-bold">Phone:</span>{" "}
              <div className="flex gap-2">
                <Link
                  to={`tel:+${record.buyer.phone}`}
                  className="flex items-center p-1 text-blue-500 hover:bg-blue-100 gap-1 rounded"
                >
                  <MdCall className="w-4 h-4" />
                  Call
                </Link>
                <Link
                  to={`https://wa.me/${record.buyer.phone}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center p-1 text-green-500 hover:bg-green-100 gap-1 rounded"
                >
                  <FaSquareWhatsapp className="w-4 h-4" />
                  WhatsApp
                </Link>
              </div>
              {/* <Link to={""}>{record.buyer.phone}</Link> */}
            </p>
            <p>
              <span className="font-bold">Email:</span>{" "}
              <Link to={`mailto:${record.buyer.email}`}>
                {record.buyer.email}
              </Link>
            </p>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      title=""
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={"100%"}
      footer={null}
    >
      <div className="flex gap-3 flex-col">
        <p className="text-gray-500 text-lg">
          Showing <b>BIDS</b> for
        </p>
        <hr className="h-[1.5px] bg-gray-400 my-2" />
        <span className="flex items-center gap-2 mb-2">
          <p>Product Name:</p>
          <h1 className="text-xl text-green-950">
            {selectedProduct.product_name}
          </h1>
        </span>

        {/* display bids */}
        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  );
}
