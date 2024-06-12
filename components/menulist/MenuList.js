'use client';
import { useState, useEffect } from 'react';
import { List, Button, Modal, Table, Popconfirm, Divider } from 'antd';
import MenuItemForm from '../menuitemform/MenuItemForm';
import itemStore from '@/stores/itemStore';
import Link from 'next/link';

import { database } from '@/firebase';

import { ref, onValue } from 'firebase/database';

const MenuList = ({ setSelectedItem, setIsModalVisible }) => {
  const items = itemStore((state) => state.items);
  const setItems = itemStore((state) => state.setItems);
  const itemLoading = itemStore((state) => state.itemLoading);
  const setItemLoading = itemStore((state) => state.setItemLoading);

  useEffect(() => {
    const itemsRef = ref(database, 'menu');
    setItemLoading(true);
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedItems = Object.values(data);
        setItems(formattedItems);
      }
      setItemLoading(false);
    });
  }, [setItems, setItemLoading]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const tableColumns = [
    {
      title: <div className='text-primary'>CATEGORY</div>,
      render: (_, record) => <div>{record?.category}</div>
      // width: '20%',
    },
    {
      title: <div className='text-primary'>NAME</div>,
      render: (_, record) => <div>{record?.name}</div>
      // width: '20%',
    },
    {
      title: <div className='text-primary'>SIZE</div>,
      render: (_, record) => <div>{record?.size ? record?.size : '-'}</div>
      // width: '20%',
    },

    {
      title: <div className='text-primary'>PRICE</div>,
      render: (_, record) => (
        <div>
          {Number(record?.price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'PHP'
          })}
        </div>
      )
      // width: '20%',
    },
    {
      title: <div className='text-primary'>COST</div>,
      render: (_, record) => (
        <div>
          {' '}
          {Number(record?.cost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'PHP'
          })}
        </div>
      )
      // width: '20%',
    },
    {
      title: <div className='text-primary'>AMOUNT IN STOCK</div>,
      render: (_, record) => <div>{record?.amountInStock}</div>
      // width: '20%',
    },
    {
      title: <div className='text-primary text-right'>ACTIONS</div>,
      render: (_, record) => (
        <div className='text-right'>
          <a to='#' onClick={() => handleEdit(record)}>
            Edit
          </a>
          <Divider type='vertical' />
          <Popconfirm
            title='Are you sure?'
            // onConfirm={(e) => handleDelete(record._id)}
            onCancel={null}
            okText='Yes'
            cancelText='No'
          >
            <a to='#'>
              <div style={{ display: 'inline' }} className='text-error'>
                Delete
              </div>
            </a>
          </Popconfirm>
        </div>
      )
      // width: '20%',
    }
  ];

  return (
    <div>
      <Table
        loading={itemLoading}
        columns={tableColumns}
        dataSource={items}
        rowKey='id'
        pagination={false}
        style={{ margin: '8px' }}
      />
    </div>
  );
};

export default MenuList;
