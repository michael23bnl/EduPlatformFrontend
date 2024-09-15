import Input from "antd/es/input/Input";
import { LoginUserRequest } from "../services/login";
import Button from "antd/es/button/button";
import "../globals.css";

import { useEffect, useState } from "react";


interface Props {  
    handleLogin: (request: LoginUserRequest) => void;
}

export const LoginUser = ({
    handleLogin
}: Props) => {
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    

    const handleOnOk = async () => {
        const loginUserRequest = { password, email };
        handleLogin(loginUserRequest);
    };

    return (    
        <div className="login__form">
                       
            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Пароль"
            />

            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Адрес электронной почты"
            />     

            <Button class="login__submit__btn"
                            onClick={() => handleOnOk()} 
                            style={{ flex: 1 }}
                        >
                            Войти
                        </Button>

        </div>
   
);
};