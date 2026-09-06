import { Modal, Tabs, Form, Input, Row, Col, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { AddProduct, EditProduct } from "../../apiCalls/products";
import ProductImages from "./ProductImages";

const rules = [
  {
    required: true,
    message: "All fields required!",
  },
];

const additionalThings = [
  {
    label: "Delivery Fee Included",
    name: "deliveryincluded",
  },
  {
    label: "Payment on Delivery",
    name: "payondelivery",
  },
];

export default function SellerProductForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const formRef = React.useRef(null);
  const [selectedTab, setSelectedTab] = useState("1");

  const [category, setCategory] = useState(null);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    setCategory(selectedProduct?.category);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  const handleFormSubmit = async (values) => {
    try {
      let response = null;

      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }

      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      okText="Save"
      onOk={() => formRef.current.submit()}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-2xl text-center font-semibold text-primary capitalize">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="Product Info" key="1">
            <Form layout="vertical" ref={formRef} onFinish={handleFormSubmit}>
              <Form.Item label="Product Name" name="product_name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item
                label="Product Description"
                name="product_description"
                rules={rules}
              >
                <TextArea type="text" />
              </Form.Item>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Form.Item
                    label="Asking Price"
                    name="asking_price"
                    rules={rules}
                  >
                    <Input type="number" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={rules}
                    className="rounded-md"
                  >
                    <select name="" id="" onChange={handleChange}>
                      <option value="">Select category</option>
                      <option value="health_beauty">Health & Beauty</option>
                      <option value="fashion_wears">Fashion & Wears</option>
                      <option value="kids_babies">Kids & Babies</option>
                      <option value="agric_food">Agric & Foods</option>
                      <option value="general">General</option>
                    </select>
                  </Form.Item>
                </div>
                <div>
                  {/* health & beauty sub category */}
                  {category === "health_beauty" && (
                    <Form.Item
                      label="Sub Category"
                      name="sub_category"
                      rules={rules}
                    >
                      <select name="" id="">
                        <option value="">Select sub category</option>
                        <option value="beauty_accessories">Accessories</option>
                        <option value="cosmetics">Cosmetics</option>
                        <option value="hairs">Hairs</option>
                        <option value="make_ups">Make Ups</option>
                        <option value="perfumes">Perfumes</option>
                      </select>
                    </Form.Item>
                  )}

                  {/* fashion & beauty sub category */}
                  {category === "fashion_wears" && (
                    <Form.Item
                      label="Sub Category"
                      name="sub_category"
                      rules={rules}
                    >
                      <select name="" id="">
                        <option value="">Select sub category</option>
                        <option value="bags_caps">Bags & Caps/Hats</option>
                        <option value="clothing">Clothing & Wears</option>
                        <option value="clothing_accessories">
                          Accessories
                        </option>
                        <option value="jewellery">Jewellery</option>
                        <option value="shoes">Shoes & Foot Wear</option>
                        <option value="watches">Watches</option>
                        <option value="glasses">Glasses</option>
                      </select>
                    </Form.Item>
                  )}

                  {/* kids_babies sub category */}
                  {category === "kids_babies" && (
                    <Form.Item
                      label="Sub Category"
                      name="sub_category"
                      rules={rules}
                    >
                      <select name="" id="">
                        <option value="">Select sub category</option>
                        <option value="clothing">Clothing & Wears</option>
                        <option value="shoes">Shoes</option>
                        <option value="toys">Toys</option>
                      </select>
                    </Form.Item>
                  )}

                  {/* agric & foods sub category */}
                  {category === "agric_food" && (
                    <Form.Item
                      label="Sub Category"
                      name="sub_category"
                      rules={rules}
                    >
                      <select name="" id="">
                        <option value="">Select sub category</option>
                        <option value="baked">Baked Foods</option>
                        <option value="fried">Fried Foods</option>
                        <option value="fresh">Fresh Foods</option>
                        <option value="drinks">Drinks</option>
                      </select>
                    </Form.Item>
                  )}

                  {/* agric & foods sub category */}
                  {category === "general" && (
                    <Form.Item
                      label="Sub Category"
                      name="sub_category"
                      rules={rules}
                    >
                      <select name="" id="">
                        <option value="">Select sub category</option>
                        <option value="unspecified">Unspecified</option>
                      </select>
                    </Form.Item>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                {additionalThings.map((item, index) => {
                  return (
                    <Form.Item
                      layout="horizontal"
                      label={item.label}
                      name={item.name}
                      key={index}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Form.Item
                  layout="horizontal"
                  label="Show Bids on Product Page"
                  name="showBidsOnProductsPage"
                  valuePropName="checked"
                >
                  <Input
                    type="checkbox"
                    onChange={(e) => {
                      formRef.current.setFieldsValue({
                        showBidsOnProductPage: e.target.checked,
                      });
                    }}
                    checked={formRef.current?.getFieldValue(
                      "showBidsOnProductsPage",
                    )}
                  />
                </Form.Item>
                {/* <Form.Item
                  layout="horizontal"
                  label="Show Bids on Product Page"
                  name="showBidsOnProductsPage"
                  valuePropName="checked"
                >
                  <Input
                    type="checkbox"
                    onChange={(e) => {
                      formRef.current.setFieldsValue({
                        showBidsOnProductPage: e.target.checked,
                      });
                    }}
                    checked={formRef.current?.getFieldValue(
                      "showBidsOnProductsPage"
                    )}
                  />
                </Form.Item> */}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Product Images"
            key="2"
            disabled={!selectedProduct}
          >
            <ProductImages
              selectedProduct={selectedProduct}
              setShowProductForm={setShowProductForm}
              getData={getData}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}
