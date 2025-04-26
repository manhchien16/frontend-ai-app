import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Image from "next/image";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const HeaderComponent = ({ collapsed, setCollapsed }: HeaderProps) => {
  return (
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
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
        style: { fontSize: "18px", cursor: "pointer" },
      })}

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
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
      </div>
    </Header>
  );
};

export default HeaderComponent;
