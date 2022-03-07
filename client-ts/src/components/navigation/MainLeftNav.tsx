import React from 'react';
import {
    PieChartOutlined,
    FolderOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const MainLeftNav = (props: any) => {
    const { SubMenu } = Menu;

    return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to='/'>
                    Main
                </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FolderOutlined />}>
                <Link to='/documents'>
                    Documents
                </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
                <Link to='/graphs'>
                    Graphs
                </Link>
            </Menu.Item>
            <Outlet />
        </Menu>
    );
};

export default MainLeftNav;