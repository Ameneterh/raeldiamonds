import React from "react";
import { Button, Form, Input } from "antd";

export default function NewsletterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
        quibusdam tempore veniam odio
      </p>
      <Form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center mx-auto my-6 border pl-3"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full sm:flex-1 outline-none rounded-l-full rounded-r-none"
        />
        <Button
          type="primary"
          className="text-xs px-10 py-4 rounded-l-none rounded-r-full"
        >
          SUBSCRIBE
        </Button>
      </Form>
    </div>
  );
}
