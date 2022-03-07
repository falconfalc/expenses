import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../../node_modules/antd/dist/antd.css';
import './Dashboard.css';
import MainLeftNav from './navigation/MainLeftNav';
import RoutesConfig from '../utils/config/RoutesConfig';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = (props: any) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapse: boolean | ((prevState: boolean) => boolean)) => {
        setCollapsed(collapse);
    };

    const routes = RoutesConfig.map(({ path, Component }) => {
        return (
            <Route path={path} key={path} element={Component} />
        );
    });
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <MainLeftNav />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <div style={{minHeight: 50}} />
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Routes>
                                {routes}
                            </Routes>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Expenses by FLC ©2021 - {new Date().getFullYear()}</Footer>
                </Layout>
            </Layout>
        </Router>
    );
};

export default Dashboard;