import React, { useState, useEffect, useContext } from 'react';
import {
  MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined,
  LoginOutlined, FileOutlined, TeamOutlined, FormOutlined
  , UserAddOutlined, PieChartOutlined, UserOutlined, DingtalkOutlined,
  UsergroupAddOutlined, DesktopOutlined, AndroidOutlined, SnippetsOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import './Dashboard.css'
import 'antd/dist/antd.css'
import ijma from '../Images/Ijma.png'
import {
  WalletDashboard, Applications, TermSheetData,
  Goods, Murabaha, Promissory, TermSheet,
  VaultMurabaha, VaultPromissory, PurchesOrder,
  Proformas,
  OfferComponent
} from '../Pages/index';
import { useNavigate } from "react-router-dom";
import StoreContext from '../ContextApi';
import { BiSolidOffer } from "react-icons/bi";




const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const [trigger, setTrigger] = useState(0);
  const contextData = useContext(StoreContext);

  const navigate = useNavigate();

   const setTriggerValue = (value) => {
    setTrigger(value);
  };


  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const logout = () => { navigate('/') }

  const items = [
    getItem('Active Wallet', 'sub2', <TeamOutlined />, [
      {
        key: '6b',
        icon: <UserOutlined onClick={() => setTriggerValue('6b')} />,
        label: <div onClick={() => setTriggerValue('6b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Term Sheet' : ''}</span></div>,
      },
      {
        key: '5b',
        icon: <UserAddOutlined onClick={() => setTriggerValue('5b')} />,
        label: <div onClick={() => setTriggerValue('5b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Proforma' : ''}</span></div>,
      },
      {
        key: '4b',
        icon: <UserAddOutlined onClick={() => setTriggerValue('4b')} />,
        label: <div onClick={() => setTriggerValue('4b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Goods' : ''}</span></div>,
      },
      {
        key: '2b',
        icon: <DingtalkOutlined onClick={() => setTriggerValue('2b')} />,
        label: <div onClick={() => setTriggerValue('2b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabaha' : ''}</span></div>,
      },
      {
        key: '7b',
        icon: <BiSolidOffer onClick={() => setTriggerValue('7b')} />,
        label: <div onClick={() => setTriggerValue('7b')}>
          <span style={{ marginLeft: '5%' }}>{!collapsed ? 'Offers' : ''}</span>
        </div>,
      },
    ]),

    getItem('Vault', 'sub3', <TeamOutlined />, [

      {
        key: '5a',
        icon: <UserAddOutlined onClick={() => setTriggerValue('5a')} />,
        label: <div onClick={() => setTriggerValue('5a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Proformas' : ''}</span></div>,
      },
      {
        key: '1b',
        icon: <AndroidOutlined onClick={() => setTriggerValue('1b')} />,
        label: <div onClick={() => setTriggerValue('1b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Applications' : ''}</span></div>,
      },

      {
        key: '2a',
        icon: <LoginOutlined onClick={() => setTriggerValue('2a')} />,
        label: <div onClick={() => setTriggerValue('2a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabaha' : ''}</span></div>,
      },
    ]),
    {

      key: '',
      icon: <LoginOutlined onClick={() => logout()} />,
      label: <div onClick={() => logout()}><span style={{ marginLeft: '5%' }}> {!collapsed ? ' Log Out' : ''}</span></div>,
    },
  ];


  const renderContent = () => {
    switch (trigger) {
      case 1:
        return <TermSheet />;
      case 2:
        return <WalletDashboard />;
      case '2a':
        return <VaultMurabaha />;
      case '3a':
        return <VaultPromissory />;
      case '4a':
        return <PurchesOrder />;
      case '5a':
        return <Proformas />;
      case '1b':
        return <Applications />;
      case '2b':
        return <Murabaha />;
      case '3b':
        return <Promissory />;
      case '4b':
        return <Goods />;
      case '5b':
        return <Proformas />;
      case '6b':
        return <TermSheetData />;
        case '7b':
        return <OfferComponent />;
      default:
        return <>Page Not Found</>;
    }
  };


  return (

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} id="Sider">
        <div className="logo">
          <img src={ijma} height="75px" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']}
          mode="inline" items={items} id="SiderMenu" />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 5,

          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}

        >
          {renderContent()}

        </Content>
      </Layout>

    </Layout>

  )
}


export default Dashboard