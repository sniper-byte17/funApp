import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu
    items={[
      {
        label: 'asdsad',
        key: '0',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);
export default function DropdownBasic () { 
 return (
    <Dropdown overlay={menu} trigger={['click']}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Click me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
 )
};