'use client';

import React, { Fragment, useState } from 'react';
import { Card, Row, Col } from 'antd';

import AddCategory from '../addcategory/AddCategory';
import CategoryTable from '@/components/categorytable/CategoryTable';

const MenuCard = (props) => {
  return (
    <Fragment>
      <Card
        bordered={false}
        title={<p className="text-xl">Menu</p>}
        extra={
          <div>
            <AddCategory />
          </div>
        }
      >
        <Row gutter={0}>
          <Col xs={24}>
            <CategoryTable />
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

MenuCard.propTypes = {};

export default MenuCard;
