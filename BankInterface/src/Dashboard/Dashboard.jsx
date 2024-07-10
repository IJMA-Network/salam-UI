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
  Goods, Murabaha, Promissory, TermSheet,Processflow,
  VaultMurabaha, VaultPromissory, PurchesOrder, UserForm,OfferComponent,ContractSheet, Salam, DeliveryNotice
} from '../Pages/index'
import { useNavigate } from "react-router-dom";



export default function Dashboard() {

  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const [trigger, setTrigger] = useState(1);
  const navigate = useNavigate();


  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  // const logout = () => {
  
  //   navigate('/')
  // }

  const items = [


    {
      key: '1',
      icon: <TeamOutlined onClick={() => setTrigger(1)} />,
      label: <div onClick={() => setTrigger(1)}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Issue TermSheet' : ''}</span></div>,
    },
    // {
    //   key: '1a',
    //   icon: <PieChartOutlined onClick={() => setTrigger('1a')} />,
    //   label: <div onClick={() => setTrigger('1a')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Contract TermSheet' : ''}</span></div>,
    // },
    // {
    //   key: '2',
    //   icon: <PieChartOutlined onClick={() => setTrigger(2)} />,
    //   label: <div onClick={() => setTrigger(2)}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'UserForm' : ''}</span></div>,
    // },
    // {
    //   key: '3',
    //   icon: <PieChartOutlined onClick={() => setTrigger(3)} />,
    //   label: <div onClick={() => setTrigger(3)}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Processflow' : ''}</span></div>,
    // },



    getItem('Active Wallet', 'sub2', <TeamOutlined />, [
      // {
      //   key: '1b',
      //   icon: <AndroidOutlined onClick={() => setTrigger('1b')} />,
      //   label: <div onClick={() => setTrigger('1b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Applications' : ''}</span></div>,
      // },

      {
        key: '1b',
        icon: <AndroidOutlined onClick={() => setTrigger('1b')} />,
        label: <div onClick={() => setTrigger('1b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Salam' : ''}</span></div>,
      },

      // {
      //   key: '2b',
      //   icon: <DingtalkOutlined onClick={() => setTrigger('2b')} />,
      //   label: <div onClick={() => setTrigger('2b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabaha' : ''}</span></div>,
      // },

      {
        key: '2b',
        icon: <DingtalkOutlined onClick={() => setTrigger('2b')} />,
        label: <div onClick={() => setTrigger('2b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Delivery Notice' : ''}</span></div>,
      },
      // {
      //   key: '2c',
      //   icon: <DingtalkOutlined onClick={() => setTrigger('2c')} />,
      //   label: <div onClick={() => setTrigger('2c')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Offers' : ''}</span></div>,
      // },
      {
        
        key: '3b',
        icon: <SnippetsOutlined onClick={() => setTrigger('3b')} />,
        label: <div onClick={() => setTrigger('3b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Promissory Notes' : ''}</span></div>,
      },
      {
        key: '4b',
        icon: <UserAddOutlined onClick={() => setTrigger('4b')} />,
        label: <div onClick={() => setTrigger('4b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Good' : ''}</span></div>,
      },

    ]),

    getItem('Vault', 'sub3', <TeamOutlined />, [

      {
        key: '1a',
        icon: <UserOutlined onClick={() => setTrigger('1a')} />,
        label: <div onClick={() => setTrigger('1a')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'TermSheet Detail' : ''}</span></div>,
      },

      {
        key: '2a',
        icon: <LoginOutlined onClick={() => setTrigger('2a')} />,
        label: <div onClick={() => setTrigger('2a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabaha' : ''}</span></div>,
      },
      // {
      //   key: '3a',
      //   icon: <FileOutlined onClick={() => setTrigger('3a')} />,
      //   label: <div onClick={() => setTrigger('3a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Promissory' : ''}</span></div>,
      // },
      // {
      //   key: '4a',
      //   icon: <HomeOutlined onClick={() => setTrigger('4a')} />,
      //   label: <div onClick={() => setTrigger('4a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Purchase Order' : ''}</span></div>,
      // },

    ]),
    // {

    //   key: '',
    //   icon: <LoginOutlined onClick={() => logout()} />,
    //   label: <div onClick={() => logout()}><span style={{ marginLeft: '5%' }}> {!collapsed ? ' Log Out' : ''}</span></div>,
    // },
  ];



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

          {


            trigger === 1 ? (
              <>
                <TermSheet />
              </>
            ) :
              trigger === 2 ? (
                <>
                  <UserForm />
                </>
              ):
              trigger === 3 ? (
                <>
                  <Processflow />
                </>
              )
                : trigger === '1a' ? (
                  <>
                    <ContractSheet />
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
                            <Salam />
                          </>
                        ) : trigger === '2b' ? (
                          <>
                            <DeliveryNotice />
                          </>
                          ): trigger === '2c' ? (
                            <>
                             <OfferComponent/>
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
