'use client';
import { useState, useEffect, Fragment } from 'react';
import { Form, Input, InputNumber, Select, Button, Modal, Space } from 'antd';
import itemStore from '@/stores/itemStore';
import { database } from '@/firebase';
import { ref, set, update } from 'firebase/database';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const MenuItemForm = ({
  setSelectedItem,
  selectedItem,
  isModalVisible,
  setIsModalVisible
}) => {
  const [form] = Form.useForm();
  const addItem = itemStore((state) => state.addItem);
  const updateItem = itemStore((state) => state.updateItem);
  const itemLoading = itemStore((state) => state.itemLoading);
  const setItemLoading = itemStore((state) => state.setItemLoading);
  // const [options, setOptions] = useState(selectedItem?.options || []);

  const [options, setOptions] = useState([
    { label: 'Small', value: 'Small' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Large', value: 'Large' }
  ]);

  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue(selectedItem);
    }
  }, [selectedItem, form]);

  const onFinish = async (values) => {
    setItemLoading(true);
    const itemId = selectedItem?.id || new Date().getTime().toString();
    const itemData = { id: itemId, ...values };
    console.info('itemData', itemData);

    if (selectedItem) {
      updateItem(itemData);
      await update(ref(database, `menu/${itemId}`), itemData);
    } else {
      addItem(itemData);
      await set(ref(database, `menu/${itemId}`), itemData);
    }
    setItemLoading(false);

    // onClose();
  };

  // const handleAddOption = () => {
  //   setOptions([...options, { name: '', price: 0 }]);
  // };

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...options];
    newOptions[index][key] = value;
    setOptions(newOptions);
  };
  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalVisible(false);
  };

  const handleAddOption = (event) => {
    const newOption = event.target.value;
    if (newOption) {
      setOptions([...options, { label: newOption, value: newOption }]);
      event.target.value = ''; // Clear input field
    }
  };

  const handleAddButtonClick = () => {
    const input = document.getElementById('newOptionInput');
    const newOption = input.value;
    if (newOption) {
      setOptions([...options, { label: newOption, value: newOption }]);
      input.value = ''; // Clear input field
    }
  };

  return (
    <Fragment>
      <Button type='primary' onClick={() => setIsModalVisible(true)}>
        Add New Item
      </Button>
      <Modal
        title={selectedItem ? 'Edit Item' : 'Add New Item'}
        visible={isModalVisible}
        footer={null}
        onCancel={handleModalClose}
      >
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            name='category'
            label='Category'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='name' label='Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='size'
            label='Select an Option'
            rules={[{ required: true, message: 'Please select a size!' }]}
          >
            <Select
              placeholder='Select a size'
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 8
                    }}
                  >
                    <Input
                      id='newOptionInput'
                      placeholder='Add new size'
                      style={{ marginRight: '8px' }}
                    />
                    <Button type='primary' onClick={handleAddButtonClick}>
                      <PlusOutlined /> Add
                    </Button>
                  </div>
                </>
              )}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='price' label='Price' rules={[{ required: true }]}>
            <InputNumber prefix='₱' min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='cost' label='Cost' rules={[{ required: true }]}>
            <InputNumber prefix='₱' min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='amountInStock'
            label='Amount in Stock'
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item className='text-right'>
            <Button type='primary' htmlType='submit' loading={itemLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default MenuItemForm;
