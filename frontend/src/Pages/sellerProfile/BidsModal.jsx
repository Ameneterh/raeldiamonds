import { Form, Input, message, Modal } from "antd";
import React, { useRef } from "react";
import { PlaceNewBid } from "../../apiCalls/products";
import { AddNotification } from "../../apiCalls/notifications";

export default function BidsModal({
  showBidsModal,
  setShowBidsModal,
  product,
  reloadData,
}) {
  const formRef = useRef(null);

  const rules = [
    {
      required: true,
      message: "All fields required!",
    },
  ];

  const handleSubmit = async (values) => {
    try {
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      if (response.success) {
        message.success("New Bid Placed Successfully");

        // send notification to seller
        await AddNotification({
          title: "A New Bid has been placed",
          message: `"${user.fullname}" has placed a bid valued at "${values.bidAmount}" on your product, "${product.product_name}"`,
          user: product.seller._id,
          onClick: "/seller-profile",
          read: false,
        });

        reloadData();
        setShowBidsModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      onCancel={() => setShowBidsModal(false)}
      open={showBidsModal}
      centered
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          Place New Bid
        </h1>

        <Form layout="vertical" ref={formRef} onFinish={handleSubmit}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
