'use client';

import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Table, Input, Popconfirm, Form, Divider } from 'antd';

import itemStore from '@/stores/itemStore';
import ItemTable from '../itemtable/ItemTable';
import { useAuthStore } from '@/stores/useAuthStore';

const CategoryTable = ({}) => {
  const {
    items,
    getItems,
    deleteItem,
    itemLoading,
    editCategory,
    deleteCategory,
    getAllItems,
  } = itemStore();
  const user = useAuthStore((state) => state.user);
  const userID = user?.uid;
  const [editForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null);
  const [editedName, setEditedName] = useState({
    id: '',
    name: '',
  });

  const isEditing = (record) => record.id === editingKey;

  useEffect(() => {
    getAllItems(userID);
  }, [getAllItems]);

  const rules = {
    categoryName: [
      {
        required: true,
        message: 'Field required',
      },
    ],
    subcategoryName: [
      {
        required: true,
        message: 'Field required',
      },
    ],
  };

  const editRow = (record) => {
    setEditingKey(record.id);
    setEditedName({ name: record.category, id: record.id });
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditedName({ name: '', id: '' });
  };

  const handleCategoryedit = (e, id) => {
    setEditedName({ ...editedName, id: id, name: e.target.value });
  };

  const saveChanges = async () => {
    const itemID = editedName.id;
    const category = editedName.name;

    await editCategory(itemID, category);

    setEditedName({ name: '', id: '' });

    cancelEditing();
  };

  const tableColumns = [
    {
      title: <div className="text-primary">CATEGORY NAME</div>,
      render: (_, record, dataIndex) =>
        isEditing(record) ? (
          <Form form={editForm}>
            <Form.Item
              rules={rules.categoryName}
              style={{
                margin: 0,
              }}
            >
              <Input
                value={editedName.name}
                onChange={(e) => handleCategoryedit(e, record.id)}
                size="small"
                placeholder="Name"
              />
            </Form.Item>
          </Form>
        ) : (
          <div>{record.category}</div>
        ),
      // responsive: ['md', 'lg'],
    },
    {
      title: <div className="text-primary text-right">ACTION</div>,
      render: (_, record, dataIndex) =>
        isEditing(record) && !editedName.name ? (
          <div className="text-right">
            <a to="#" onClick={cancelEditing}>
              Cancel
            </a>
          </div>
        ) : isEditing(record) ? (
          <div className="text-right">
            <a to="#" className="text-success" onClick={saveChanges}>
              Save
            </a>
            <Divider type="vertical" />

            <a to="#" onClick={cancelEditing}>
              Cancel
            </a>
          </div>
        ) : (
          <div className="text-right">
            <a to="#" onClick={() => editRow(record)}>
              Edit
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure?"
              onConfirm={(e) => deleteCategory(record.id)}
              onCancel={null}
              okText="Yes"
              cancelText="No"
            >
              <a to="#">
                <div style={{ display: 'inline' }} className="text-error">
                  Delete
                </div>
              </a>
            </Popconfirm>
          </div>
        ),
    },
  ];

  return (
    <Fragment>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Table
            loading={itemLoading}
            className="printOut"
            columns={tableColumns}
            dataSource={items}
            rowKey="id"
            pagination={false}
            bordered={false}
            scroll={{
              x: 'max-content',
            }}
            style={{ marginBottom: '16px' }}
            expandable={{
              expandedRowRender: (record) => <ItemTable data={record} />,
            }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default CategoryTable;
