'use client';

import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { antdTheme } from '@/themes/antdTheme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>POS App</title>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={antdTheme.theme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
