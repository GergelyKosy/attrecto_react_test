import { FC } from "react";
import "./Header.css";

const Header:FC = () => {
  return <div className="Header_container"
    style={{ 
      paddingTop: "50px", 
      fontSize: "40px", 
      textTransform: "uppercase", 
      fontFamily: "sans-serif" 
    }}>
    Your cinema guide
  </div>;
}

export default Header;