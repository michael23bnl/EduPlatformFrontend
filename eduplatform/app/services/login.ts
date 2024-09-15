
export interface LoginUserRequest {
    password: string;
    email: string;
}

export const login = async (loginUserRequest: LoginUserRequest) => {
    await fetch("http://localhost:5137/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(loginUserRequest),
        credentials: 'include',
    })
}