// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase';
'use client';

import MenuList from '@/components/menulist/MenuList';
import ProtectedRoute from '@/components/protectedroute/ProtectedRoute';
import { Layout } from 'antd';

const Home = () => {
  const { Content } = Layout;
  // const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   if (!user && !loading && !error) {
  //     // Redirect to login page or show a message
  //   }
  // }, [user, loading, error]);

  return (
    <div>
      {/* {user ? <MenuList /> : <p>Please log in to manage the menu</p>} */}

      {/* <Layout>
        <Content style={{ padding: '60px 30px' }}>
          <MenuList />
        </Content>
      </Layout> */}
      <ProtectedRoute />
    </div>
  );
};

export default Home;
