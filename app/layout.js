'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>POS App</title>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#25ae9c',
              },
              components: {
                Layout: {
                  headerBg: '#00000',
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
