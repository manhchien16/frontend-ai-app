"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@chatui/core/dist/index.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect, ReactNode } from "react";
import "../app/utt/layout.css";
import { Footer } from "antd/es/layout/layout";
import MenuComponents from "@/share/components/Menu";
import Image from "next/image";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";

const { Header, Sider, Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ConfigProvider>
      <html lang="en">
        <body className={inter.className}>
          <Layout style={{ minHeight: "100%" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{
                transition: "all 0.3s ease-in-out",
                overflow: "hidden",
                position: "fixed",
                zIndex: 0,
                left: collapsed ? "-200px" : "0",
                height: "100vh",
              }}
            >
              <div className="logo p-2">
                <Image
                  src="/images/banner-utt.png"
                  alt="Logo"
                  width={500}
                  height={200}
                />
              </div>
              <MenuComponents />
            </Sider>

            <Layout
              className="site-layout"
              style={{
                marginLeft: collapsed ? "0" : "200px",
                transition: "margin-left 0.3s ease-in-out",
              }}
            >
              <Header
                className="site-layout-background"
                style={{
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: "74px",
                }}
              >
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                    style: { fontSize: "18px", cursor: "pointer" },
                  }
                )}

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/images/banner-utt.png"
                    alt="Logo"
                    width={300}
                    height={100}
                  />
                </div>
              </Header>

              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  height: "calc(100vh - 74px)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {children}
              </Content>
              <Footer style={{ textAlign: "center" }}>
                MCHIEN Design ©{new Date().getFullYear()} Created by UTT UED
              </Footer>
            </Layout>
          </Layout>
        </body>
      </html>
    </ConfigProvider>
  );
};

export default RootLayout;
