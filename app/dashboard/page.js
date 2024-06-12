// pages/dashboard.js
'use client';
import React, { Fragment } from 'react';
import HeaderNav from '@/components/headernav/HeaderNav';
import ProtectedRoute from '@/components/protectedroute/ProtectedRoute';
import { Layout, Row, Col } from 'antd';
import MenuList from '@/components/menulist/MenuList';
import MenuCard from '@/components/menucard/MenuCard';

const Dashboard = () => {
  const { Content } = Layout;
  return (
    <Fragment>
      <HeaderNav />
      <Layout>
        <Content style={{ padding: '60px 30px', minHeight: '100vh' }}>
          <Row>
            <Col xs={24}>
              <MenuCard />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
