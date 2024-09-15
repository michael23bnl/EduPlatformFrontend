import Button from "antd/es/button/button";
import { logout } from "../services/logout";


const LogoutButton = () => {
    const handleLogout = () => {
        logout(); 
    };
    return (
        <Button onClick={handleLogout}>Выйти</Button>
    );
};

export default LogoutButton;