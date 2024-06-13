import { Fragment, useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Table,
  Popconfirm,
} from 'antd';
import itemStore from '@/stores/itemStore';
import { DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const AddItem = ({ itemId, isModalVisible, setIsModalVisible, editData }) => {
  const [form] = Form.useForm();
  const [count, setCount] = useState(0);
  const [optionList, setOptionList] = useState([]);

  const { addMenuItem, itemLoading, editItem } = itemStore();
  const [formData, setFormData] = useState({
    name: '',
    options: [],
    price: '',
    cost: '',
    stock: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        options: editData.options || [],
        price: editData.price || '',
        cost: editData.cost || '',
        stock: editData.stock || '',
      });
      form.setFieldsValue({
        name: editData.name || '',
        price: editData.price || '',
        cost: editData.cost || '',
        stock: editData.stock || '',
      });
      setOptionList(editData.options);
    }
  }, [editData]);

  const { name, options, price, cost, stock } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = () => {
    const newOption = {
      id: count,
      type: '',
      price: 0,
      cost: 0,
      stock: 0,
    };
    setOptionList([...optionList, newOption]);
    setCount(count + 1);
  };

  const handleInputChange2 = (e, key, dataIndex) => {
    const updatedOptions = [...optionList];
    const targetOption = updatedOptions.find((option) => option.id === key);

    if (targetOption) {
      targetOption[dataIndex] = e.target.value;
      setOptionList(updatedOptions);
      setFormData({ ...formData, options: updatedOptions });
    }
  };

  const handleNumberChange2 = (value, key, dataIndex) => {
    const updatedOptions = [...optionList];
    const targetOption = updatedOptions.find((option) => option.id === key);

    if (targetOption) {
      targetOption[dataIndex] = value;
      setOptionList(updatedOptions);
      setFormData({ ...formData, options: updatedOptions });
    }
  };

  const handleDelete = (key) => {
    const updatedOptions = optionList.filter((option) => option.id !== key);
    setOptionList(updatedOptions);
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleEdit = async () => {
    await editItem(itemId, editData?.id, formData);
    setFormData({
      name: '',
      options: [],
      price: '',
      cost: '',
      stock: '',
    });
    setOptionList([]);

    form.resetFields();

    setIsModalVisible(false);
  };

  const onFinish = async () => {
    const newMenuItem = { id: uuidv4(), ...formData };

    await addMenuItem(itemId, newMenuItem);

    setFormData({
      name: '',
      options: [],
      price: '',
      cost: '',
      stock: '',
    });

    setOptionList([]);

    form.resetFields();

    setIsModalVisible(false);
  };

  const tableColumns = [
    {
      title: <div className="text-primary">TYPE</div>,
      render: (_, record) => (
        <Input
          onChange={(e) => handleInputChange2(e, record.id, 'type')}
          size="small"
          placeholder="Type"
          value={record.type}
        />
      ),
    },
    {
      title: <div className="text-primary">PRICE</div>,
      render: (_, record) => (
        <InputNumber
          onChange={(value) => handleNumberChange2(value, record.id, 'price')}
          controls={false}
          size="small"
          style={{ width: '100%' }}
          defaultValue={record.price}
          prefix="₱"
        />
      ),
    },
    {
      title: <div className="text-primary">COST</div>,
      render: (_, record) => (
        <InputNumber
          onChange={(value) => handleNumberChange2(value, record.id, 'cost')}
          controls={false}
          size="small"
          style={{ width: '100%' }}
          defaultValue={record.cost}
          prefix="₱"
        />
      ),
    },
    {
      title: <div className="text-primary">STOCK</div>,
      render: (_, record) => (
        <InputNumber
          onChange={(value) => handleNumberChange2(value, record.id, 'stock')}
          controls={false}
          size="small"
          style={{ width: '100%' }}
          defaultValue={record.stock}
        />
      ),
    },
    {
      title: <div className="text-primary">ACTION</div>,
      render: (_, record) => (
        <div className="text-right" style={{ fontSize: '15px' }}>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <div className="text-error">
              <DeleteOutlined />
            </div>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Button type="primary" onClick={showModal}>
        Add Menu Item
      </Button>
      <Modal
        title={<div>{!editData ? 'Add New Item' : 'Edit Item'}</div>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          onFinish={onFinish}
          name="addMenuItemForm"
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            required
            rules={[{ required: true }]}
          >
            <Input name="name" value={name} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Options">
            {options.length > 0 || optionList.length > 0 ? (
              <Table
                columns={tableColumns}
                dataSource={optionList}
                rowKey="id"
                pagination={false}
                bordered={false}
                // scroll={{ x: 'max-content' }}
                style={{ marginBottom: '16px' }}
              />
            ) : null}

            <Button style={{ marginBottom: '16px' }} block onClick={handleAdd}>
              Add
            </Button>
          </Form.Item>

          {options < 1 ? (
            <div>
              <Form.Item label="Price" required>
                <InputNumber
                  prefix="₱"
                  min={0}
                  value={price}
                  onChange={(value) => handleNumberChange('price', value)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item label="Cost" required>
                <InputNumber
                  prefix="₱"
                  min={0}
                  value={cost}
                  onChange={(value) => handleNumberChange('cost', value)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item label="Stock" required>
                <InputNumber
                  min={0}
                  value={stock}
                  onChange={(value) => handleNumberChange('stock', value)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
          ) : null}

          <Form.Item className="text-right">
            {!editData ? (
              <Button type="primary" htmlType="submit" loading={itemLoading}>
                Add
              </Button>
            ) : (
              <Button type="primary" onClick={handleEdit} loading={itemLoading}>
                Edit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AddItem;
