

export const logout = async () => {
    await fetch("http://localhost:5137/logout", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        //body: JSON.stringify(loginUserRequest),
        credentials: 'include',
    })
}


