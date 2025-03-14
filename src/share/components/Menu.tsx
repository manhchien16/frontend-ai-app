import { Menu } from "antd";
import {
  RobotOutlined,
  SearchOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

const MenuComponents = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      items={[
        { key: "1", icon: <RobotOutlined />, label: "ChatBot Tuyển Sinh" },
        { key: "2", icon: <SolutionOutlined />, label: "Thông Tin UTT" },
        { key: "3", icon: <SearchOutlined />, label: "Tra Cứu Tuyển Sinh" },
      ]}
    />
  );
};

export default MenuComponents;
