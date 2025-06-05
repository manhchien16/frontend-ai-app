import { Menu } from "antd";
import {
  FacebookOutlined,
  HomeOutlined,
  LoginOutlined,
  RobotOutlined,
  SearchOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";

const MenuComponents = () => {
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") router.push("/");
    else if (key === "2") router.push("https://utt.edu.vn/");
    else if (key === "3") router.push("https://utt.edu.vn/tuyensinh");
    else if (key === "4") router.push("https://xettuyen.utt.edu.vn");
    else if (key === "5") router.push("https://facebook.com/utt.vn");
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={handleMenuClick}
      defaultSelectedKeys={["1"]}
      items={[
        { key: "1", icon: <RobotOutlined />, label: "Chatbot Tư vấn" },
        { key: "2", icon: <HomeOutlined />, label: "Trang Chủ" },
        { key: "3", icon: <SolutionOutlined />, label: "Thông Tin Tuyển Sinh" },
        { key: "4", icon: <LoginOutlined />, label: "Đăng Ký Hồ Sơ Dự Tuyển" },
        { key: "5", icon: <FacebookOutlined />, label: "Fanpage Chính Thức" },
      ]}
    />
  );
};

export default MenuComponents;
