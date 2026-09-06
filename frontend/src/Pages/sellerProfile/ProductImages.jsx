import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import { EditProduct, UploadProductImage } from "../../apiCalls/products";
import { MdDeleteForever } from "react-icons/md";

export default function ProductImages({
  selectedProduct,
  setShowProductForm,
  getData,
}) {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(selectedProduct.images);
  const [showPreview, setShowPreview] = useState(true);
  const dispatch = useDispatch();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteImage = async (image) => {
    try {
      const updatedImagesArray = images.filter((img) => img !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImagesArray };

      const response = await EditProduct(selectedProduct._id, updatedProduct);

      if (response.success) {
        message.success(response.message);
        setImages(updatedImagesArray);
        setFile(null);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      {/* display product images */}
      <div className="flex gap-5 flex-wrap">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="flex gap-2 border border-solid border-gray-300 rounded p-3 mb-4 items-end"
            >
              <img src={image} alt="" className="h-20 w-20 object-cover" />
              <MdDeleteForever
                onClick={() => deleteImage(image)}
                className="h-5 w-5 cursor-pointer text-red-500 hover:scale-110 transition-all duration-300"
              />
            </div>
          );
        })}
      </div>

      {/* upload product image */}
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        fileList={file ? [file] : []}
        showUploadList={showPreview}
      >
        {/* upload button */}
        <Button type="default">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-4 mt-4">
        <Button type="default" onClick={() => setShowProductForm(false)}>
          Cancel
        </Button>

        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
}
