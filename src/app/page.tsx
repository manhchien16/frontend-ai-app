// "use client";
// import "@chatui/core/dist/index.css";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   RobotOutlined,
//   SearchOutlined,
//   SolutionOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu } from "antd";
// import React, { useState, useEffect } from "react";
// import "./layout.css";
// import ChatAi from "@/components/chat";
// import { Footer } from "antd/lib/layout/layout";
// import MenuComponents from "@/components/share/Menu";

// const { Header, Sider, Content } = Layout;

// const Home: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setCollapsed(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Layout style={{ minHeight: "100%" }}>
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         width={200}
//         style={{
//           transition: "all 0.3s ease-in-out",
//           overflow: "hidden",
//           position: "fixed",
//           left: collapsed ? "-200px" : "0",
//           height: "100vh",
//         }}
//       >
//         <div className="logo p-2">
//           <img
//             src="https://utt.edu.vn/uploads/images/site/1722045380banner-utt.png"
//             alt="Logo"
//             style={{ width: "100%" }}
//           />
//         </div>
//         <MenuComponents />
//       </Sider>

//       <Layout
//         className="site-layout"
//         style={{
//           marginLeft: collapsed ? "0" : "200px",
//           transition: "margin-left 0.3s ease-in-out",
//         }}
//       >
//         <Header
//           className="site-layout-background"
//           style={{
//             padding: "0 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             minHeight: "74px",
//           }}
//         >
//           {React.createElement(
//             collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//             {
//               className: "trigger",
//               onClick: () => setCollapsed(!collapsed),
//               style: { fontSize: "18px", cursor: "pointer" },
//             }
//           )}

//           <div
//             style={{
//               flex: 1,
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <img
//               src="https://utt.edu.vn/uploads/images/site/1722045380banner-utt.png"
//               alt="Logo"
//             />
//           </div>
//         </Header>

//         <Content
//           className="site-layout-background"
//           style={{
//             padding: 24,
//             height: "calc(100vh - 74px)",
//             overflow: "hidden",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <ChatAi />
//         </Content>
//         <Footer style={{ textAlign: "center" }}>
//           MCHIEN Design ©{new Date().getFullYear()} Created by UTT UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default Home;

export default function Home() {
  return <h1>404</h1>;
}
