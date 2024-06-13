'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Form, Input, Button, message, Row, Col, Alert } from 'antd';
import { loginWithEmail } from '@/config/auth';

const Login = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    const result = await loginWithEmail(email, password);

    setLoading(false);
    if (result?.error) {
      message.error(result?.error);
    } else {
      message.success('Login success');
      router.push(callbackUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-bg bg-cover">
      <Row justify="center" align="middle" className="w-full">
        <Col xs={20} sm={16} md={12} lg={8}>
          <Card bordered={false} style={{ padding: '16px' }}>
            <div className="text-center mb-5">
              <div className="text-primary font-bold text-xl mb-2">POS App</div>
              <Alert
                style={{ marginBottom: '8px' }}
                message="Hello Visitor!"
                closable
                description={
                  <div>
                    You can use this access! <br />
                    Email: user2@maco.com
                    <br />
                    Password: maco87654321
                  </div>
                }
                type="info"
              />
            </div>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              <Form.Item>
                <Button
                  className="bg-primary"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  {loading ? 'Please wait...' : 'Login'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
