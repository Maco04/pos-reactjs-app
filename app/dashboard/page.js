// pages/dashboard.js
'use client';
import React, { Fragment } from 'react';
import HeaderNav from '@/components/headernav/HeaderNav';
import { Layout, Row, Col } from 'antd';
import MenuCard from '@/components/menucard/MenuCard';

const Dashboard = () => {
  const { Content } = Layout;
  return (
    <Fragment>
      <HeaderNav />
      <Layout>
        <Content style={{ padding: '60px 0', minHeight: '100vh' }}>
          <Row align={'center'}>
            <Col xs={24} md={20}>
              <MenuCard />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
