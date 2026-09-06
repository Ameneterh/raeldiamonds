import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { EditUser, UploadUserImage } from "../../apiCalls/users";

export default function UserImages({ selectedUser, setShowEditUser }) {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(selectedUser.avatar);
  const [showPreview, setShowPreview] = useState(true);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", selectedUser._id);
      const response = await UploadUserImage(formData);
      if (response.success) {
        message.success(response.message);
        setImages(response.data);
        setShowPreview(false);
        setFile(null);
        setShowEditUser(false);
        window.location.href = "/seller-profile";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteImage = async (image) => {
    try {
      // const updatedImagesArray = images.filter((img) => img !== image);
      const updatedUser = { ...selectedUser, images };

      const response = await EditUser(selectedUser._id, updatedUser);

      if (response.success) {
        message.success(response.message);
        setImages(updatedImagesArray);
        setFile(null);
        // getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      {/* display user images */}
      <div className="flex gap-5 flex-wrap">
        {images && (
          <div className="flex gap-2 border border-solid border-gray-300 rounded p-3 mb-4 items-end">
            <img src={images} alt="" className="h-20 w-20 object-cover" />
            <MdDeleteForever
              onClick={() => deleteImage(images)}
              className="h-5 w-5 cursor-pointer text-red-500 hover:scale-110 transition-all duration-300"
            />
          </div>
        )}
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
        <Button type="default" onClick={() => setShowEditUser(false)}>
          Cancel
        </Button>

        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
}
