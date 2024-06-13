'use client';
import { useState } from 'react';
import { Table, Popconfirm, Divider } from 'antd';
import itemStore from '@/stores/itemStore';

import AddItem from '../additem/AddItem';

const ItemTable = ({ data }) => {
  const { deleteItem, itemLoading } = itemStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState();

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditData(record);
  };

  const tableColumns = [
    {
      title: <div className="text-primary">NAME</div>,
      render: (_, record) => <div>{record?.name ? record?.name : '-'}</div>,
    },
    {
      title: <div className="text-primary">OPTION</div>,
      render: (_, record) =>
        record?.options?.length > 0 ? (
          <>
            {record.options?.map((option, index) => (
              <div key={option.id}>
                {option?.type}
                {index < record?.options.length - 1 && (
                  <Divider type="horizontal" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div>-</div>
        ),
    },

    {
      title: <div className="text-primary">PRICE</div>,
      render: (_, record) =>
        record?.options?.length > 0 ? (
          <>
            {record.options?.map((option, index) => (
              <div key={option.id}>
                {Number(option?.price).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'PHP',
                })}
                {index < record?.options.length - 1 && (
                  <Divider type="horizontal" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div>
            {Number(record?.price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'PHP',
            })}
          </div>
        ),
    },
    {
      title: <div className="text-primary">COST</div>,
      render: (_, record) =>
        record?.options?.length > 0 ? (
          <>
            {record.options?.map((option, index) => (
              <div key={option.id}>
                {Number(option?.cost).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'PHP',
                })}
                {index < record?.options.length - 1 && (
                  <Divider type="horizontal" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div>
            {Number(record?.cost).toLocaleString('en-US', {
              style: 'currency',
              currency: 'PHP',
            })}
          </div>
        ),
    },
    {
      title: <div className="text-primary">AMOUNT IN STOCK</div>,
      render: (_, record) =>
        record?.options?.length > 0 ? (
          <>
            {record.options?.map((option, index) => (
              <div key={option.id}>
                {option.stock ? option?.stock : '-'}
                {index < record?.options.length - 1 && (
                  <Divider type="horizontal" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div>{record.stock ? record.stock : '-'}</div>
        ),
    },

    {
      title: <div className="text-primary text-right">ACTIONS</div>,
      render: (_, record) => (
        <div className="text-right">
          <a to="#" onClick={() => handleEdit(record)}>
            Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure?"
            onConfirm={(e) => deleteItem(data.id, record.id)}
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
    <div>
      <div className="text-right">
        <AddItem
          itemId={data.id}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          editData={editData}
        />
      </div>

      <Table
        size="small"
        loading={itemLoading}
        columns={tableColumns}
        dataSource={data?.menuItems}
        rowKey="id"
        pagination={false}
        style={{ margin: '8px' }}
        bordered={false}
        scroll={{
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default ItemTable;
