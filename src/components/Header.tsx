import { FC } from "react";

const Header:FC = () => {
  return <div 
    style={{ 
      paddingTop: "50px", 
      fontSize: "40px", 
      textTransform: "uppercase", 
      fontFamily: "sans-serif" 
    }}>
    Your cinema
  </div>;
}

export default Header;