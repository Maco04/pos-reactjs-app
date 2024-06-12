'use client';
import { useEffect, useState } from 'react';
import { Layout, Menu, Grid, Drawer, Dropdown, Avatar } from 'antd';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
const { Header } = Layout;
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { auth } from '@/firebase';

const HeaderNav = (props) => {
  const user = useAuthStore((state) => state.user);

  const logout = async () => {
    await auth.signOut();
    useAuthStore.getState().setUser(null);
  };
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px is the breakpoint for mobile
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    useAuthStore.getState().setUser(null);
    router.push('/login');
    return null;
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };
  const menu = (
    <Menu
      mode={isMobile ? 'vertical' : 'horizontal'}
      defaultSelectedKeys={['1']}
    >
      <Menu.Item key="1">
        <Link href="#">{'user'}</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <button className="text-red-500" onClick={handleSignOut}>
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header>
      {!isMobile ? (
        <div className={`flex justify-between items-center h-full `}>
          <div className="text-xl font-bold text-primary ">UTAK POS App</div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar
              style={{ cursor: 'pointer' }}
              size="large"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      ) : (
        <>
          <div
            onClick={showDrawer}
            style={{ cursor: 'pointer' }}
            className="text-primary"
          >
            <MenuUnfoldOutlined className="text-primary" />
          </div>
          <Drawer
            title={
              <div className="text-xl font-bold text-primary ">
                UTAK POS App
              </div>
            }
            placement="left"
            closable={true}
            onClose={hideDrawer}
            visible={drawerVisible}
          >
            {menu}
          </Drawer>
        </>
      )}
    </Header>
  );
};

HeaderNav.propTypes = {};

export default HeaderNav;
