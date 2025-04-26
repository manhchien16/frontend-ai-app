import Sider from "antd/lib/layout/Sider";
import Image from "next/image";
import MenuComponents from "./Menu";
import { useEffect, useState } from "react";
import "./scss/slider.module.scss";

const SiderComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("collapsed:", collapsed);
  }, [collapsed]);

  return (
    <Sider
      className="sider-container"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        width: "100vw",
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
  );
};

export default SiderComponent;
