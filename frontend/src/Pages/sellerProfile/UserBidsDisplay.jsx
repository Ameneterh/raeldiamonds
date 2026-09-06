import { message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { GetAllBids } from "../../apiCalls/products";
import { MdCall } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";

// bids from tutorial
export default function UserBidsDisplay() {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await GetAllBids({ buyer: user._id });
      if (response.success) {
        setBidsData(response.data);
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
      title: "Product",
      dataIndex: "product",
      render: (text, record) => {
        return (
          <div className="max-w-[200px] line-clamp-2">
            <Link to={`/product/${record.product._id}`}>
              {record.product.product_name}
            </Link>
          </div>
        );
      },
    },
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("MMM D, YYYY, hh:mm A");
      },
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.fullname;
      },
    },
    {
      title: "Asking Price",
      dataIndex: "asking_price",
      render: (text, record) => {
        return record.product.asking_price.toLocaleString();
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
      title: "Seller Contacts",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div className="">
            <p className="flex items-center gap-1">
              <span className="font-bold">Phone:</span>{" "}
              <div className="flex gap-2">
                <Link
                  to={`tel:+${record.seller.phone}`}
                  className="flex items-center p-1 text-blue-500 hover:bg-blue-100 gap-1 rounded"
                >
                  <MdCall className="w-4 h-4" />
                  Call
                </Link>
                <Link
                  to={`https://wa.me/${record.seller.phone}`}
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
              <Link to={`mailto:${record.seller.email}`}>
                {record.seller.email}
              </Link>
            </p>
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex gap-3 flex-col">
      <Table columns={columns} dataSource={bidsData} />
    </div>
  );
}
