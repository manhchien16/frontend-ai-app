import { Menu } from "antd";
import {
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
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={handleMenuClick}
      defaultSelectedKeys={["1"]}
      items={[
        { key: "1", icon: <RobotOutlined />, label: "ChatBot Tuyển Sinh" },
        { key: "2", icon: <SolutionOutlined />, label: "Thông Tin UTT" },
        { key: "3", icon: <SearchOutlined />, label: "Tra Cứu Tuyển Sinh" },
      ]}
    />
  );
};

export default MenuComponents;
