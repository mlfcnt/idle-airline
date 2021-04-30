import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  DollarTwoTone,
  BookOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import { useGlobalContext } from "../context/GlobalContext";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Container = styled(Layout)`
  min-height: 100vh;
`;

function Main({ children }) {
  const { money } = useGlobalContext();

  return (
    <Container>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" icon={<BookOutlined />}>
            <Link href="/histoire">Histoire</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            <Link href="/options">Options</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={
              <DollarTwoTone
                style={{ fontSize: "1.2rem" }}
                twoToneColor="gold"
              />
            }
            disabled
            style={{ fontSize: "1.2rem", color: "red" }}
          >
            Money : {money || 0}
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Activitées">
              <Menu.Item key="1">
                <Link href="/hula-hoops">Hula Hoops</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Fleet" hidden>
              {/* <Menu.Item key="1" hidden>
                <Link href="/first-progress">Aircraft</Link>
              </Menu.Item> */}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Main;
