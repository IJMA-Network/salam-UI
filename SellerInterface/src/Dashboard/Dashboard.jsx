import React, { useState, useEffect, useContext } from 'react';
import { Breadcrumb, Layout, Menu, Spin } from 'antd';
import ijma from '../Images/Ijma.png'
import './Dashboard.css'
import {
  MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined,
  LoginOutlined, FileOutlined, TeamOutlined, FormOutlined
  , UserAddOutlined, PieChartOutlined, UserOutlined, DingtalkOutlined,
  UsergroupAddOutlined, DesktopOutlined, AndroidOutlined, SnippetsOutlined
} from '@ant-design/icons';
import {
  WalletDashboard, Applications, TermSheetData,
  Goods, Murabaha, Promissory, Proforma,
  VaultMurabaha, VaultPromissory, PurchesOrder, Proformas
} from '../Pages/index'
import StoreContext from '../ContextApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';




export default function Dashboard() {

  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const [trigger, setTrigger] = useState(1);
  const contextData = useContext(StoreContext);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();


  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const notify = () => toast.error('🦄 Logout Success fully', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const logout = () => {
    setloading(false)
    notify()
    setTimeout(() => {
      setloading(true)
      navigate('/')
    }, 2000);
  }

  const items = [


    {
      key: '1',
      icon: <TeamOutlined onClick={() => setTrigger(1)} />,
      label: <div onClick={() => setTrigger(1)}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Proforma' : ''}</span></div>,
    },
    // {
    //   key: '2',
    //   icon: <PieChartOutlined onClick={() => setTrigger(2)} />,
    //   label: <div onClick={() => setTrigger(2)}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Dashboard' : ''}</span></div>,
    // },



    getItem('Active Wallet', 'sub2', <TeamOutlined />, [
      // {
      //   key: '1b',
      //   icon: <AndroidOutlined onClick={() => setTrigger('1b')} />,
      //   label: <div onClick={() => setTrigger('1b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Applications' : ''}</span></div>,
      // },

      // {
      //   key: '2b',
      //   icon: <DingtalkOutlined onClick={() => setTrigger('2b')} />,
      //   label: <div onClick={() => setTrigger('2b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabaha' : ''}</span></div>,
      // },
      {
        key: '4a',
        icon: <HomeOutlined onClick={() => setTrigger('4a')} />,
        label: <div onClick={() => setTrigger('4a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Purchase Order' : ''}</span></div>,
      },
      {
        key: '3b',
        icon: <SnippetsOutlined onClick={() => setTrigger('3b')} />,
        label: <div onClick={() => setTrigger('3b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Promissory Notes' : ''}</span></div>,
      },
      {
        key: '4b',
        icon: <UserAddOutlined onClick={() => setTrigger('4b')} />,
        label: <div onClick={() => setTrigger('4b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Goods' : ''}</span></div>,
      },

    ]),

    getItem('Vault', 'sub3', <TeamOutlined />, [

      {
        key: '1a',
        icon: <UserOutlined onClick={() => setTrigger('1a')} />,
        label: <div onClick={() => setTrigger('1a')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Proforma' : ''}</span></div>,
      },

      // {
      //   key: '2a',
      //   icon: <LoginOutlined onClick={() => setTrigger('2a')} />,
      //   label: <div onClick={() => setTrigger('2a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabah Vault' : ''}</span></div>,
      // },
      // {
      //   key: '3a',
      //   icon: <FileOutlined onClick={() => setTrigger('3a')} />,
      //   label: <div onClick={() => setTrigger('3a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Promissory' : ''}</span></div>,
      // },


    ]),


    {

      key: '',
      icon: <LoginOutlined onClick={() => logout()} />,
      label: <div onClick={() => logout()}>< span style={{ marginLeft: '5%' }}> {!collapsed ? ' Log Out' : ''}</span ></div>

    }
  ];



  return (

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <ToastContainer />
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

          {


            trigger === 1 ? (
              <>
                <Proforma />
              </>
            ) :
              trigger === 2 ? (
                <>
                  <WalletDashboard />
                </>
              )
                : trigger === '1a' ? (
                  <>
                    <Proformas />
                  </>
                )
                  : trigger === '2a' ? (
                    <>
                      <VaultMurabaha />
                    </>
                  )
                    : trigger === '3a' ? (
                      <>
                        <VaultPromissory />
                      </>
                    )
                      : trigger === '4a' ? (
                        <>
                          <PurchesOrder />
                        </>
                      )
                        : trigger === '1b' ? (
                          <>
                            <Applications />
                          </>
                        ) : trigger === '2b' ? (
                          <>
                            <Murabaha />
                          </>
                        ) : trigger === '3b' ? (
                          <>
                            <Promissory />
                          </>
                        ) : trigger === '4b' ? (
                          <>
                            <Goods />
                          </>
                        ) :
                          <></>

          }
        </Content>
      </Layout>

    </Layout>

  )
}
