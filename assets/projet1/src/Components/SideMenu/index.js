import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined 
 
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import asma from "../../Esp-Etu";
function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
        
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        
        selectedKeys={[selectedKeys]}
        items={[
          <br/>,
          
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/asma",
           
          }, 
          {
            label: "Inventory",
            key: "/inventory",
            icon: <ShopOutlined />,
          },
        
          {
            label: "Customers",
            key: "/customers",
            icon: <UserOutlined />,
          },
          <br/>,<br/>,<br/>,<br/>,<br/>,<br/>,<br/>,<br/>,<br/>,
          {
            label: "Déconnexion",
            key: "/customers",
            
            icon: <LogoutOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
