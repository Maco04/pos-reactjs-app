// components/AddCategory.js
'use client';

import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import itemStore from '@/stores/itemStore';
import { useAuthStore } from '@/stores/useAuthStore';

const AddCategory = () => {
  const user = useAuthStore((state) => state.user);

  const userID = user?.uid;
  const { addCategory, itemLoading } = itemStore();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const onFinish = async () => {
    const itemId = new Date().getTime().toString();
    const newformData = { ...formData, userID: userID };
    await addCategory(itemId, newformData);
    setVisible(false);
    setFormData({ category: '' });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} loading={itemLoading}>
        Add Category
      </Button>
      <Modal
        title="Add Category"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input
              name="category"
              value={formData?.category}
              onChange={handleCategoryChange}
              placeholder="Enter Category"
            />
          </Form.Item>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit" loading={itemLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategory;
