export interface RegisterUserRequest {
    userName: string;
    password: string;
    email: string;
}

export const register = async (registerUserRequest: RegisterUserRequest) => {
    await fetch("http://localhost:5137/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(registerUserRequest),
    })
}
