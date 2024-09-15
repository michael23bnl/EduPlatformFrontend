import Input from "antd/es/input/Input";
import { RegisterUserRequest } from "../services/register";
import Button from "antd/es/button/button";
import "../globals.css";

import { useEffect, useState } from "react";


interface Props {  
    handleRegister: (request: RegisterUserRequest) => void;
}

export const RegisterUser = ({
    handleRegister
}: Props) => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    

    const handleOnOk = async () => {
        const registerUserRequest = { userName, password, email };
        handleRegister(registerUserRequest);
    };

    return (    
        <div className="register__form">
            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                placeholder="Имя пользователя"
            />
            
            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Пароль"
            />

            <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Адрес электронной почты"
            />     

            <Button class="register__submit__btn"
                            onClick={() => handleOnOk()} 
                            style={{ flex: 1 }}
                        >
                            Зарегистрироваться
                        </Button>

        </div>
   
);
};