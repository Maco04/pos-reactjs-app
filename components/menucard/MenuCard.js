'use client';

import React, { Fragment, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Alert,
  PageHeader
} from 'antd';

import PropTypes from 'prop-types';
import MenuItemForm from '../menuitemform/MenuItemForm';
import MenuList from '../menulist/MenuList';

const MenuCard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Fragment>
      <Card
        bordered={false}
        title={<p className='text-xl'>Menu</p>}
        extra={
          <MenuItemForm
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        }
      >
        <Row gutter={0}>
          <Col xs={24}>
            <MenuList
              setSelectedItem={setSelectedItem}
              setIsModalVisible={setIsModalVisible}
            />
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

MenuCard.propTypes = {};

export default MenuCard;
