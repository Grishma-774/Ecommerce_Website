

import { refreshAccessToken } from "./api.js"

export const apiRequest = async (url, options = {}) => {

    let token = localStorage.getItem("access")

    // attach headers safely
    options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`
    }

    // add JSON content type automatically
    if (!(options.body instanceof FormData)) {

        options.headers["Content-Type"] = "application/json"

    }

    // first request
    let response = await fetch(url, options)

    // access token expired
    if (response.status === 401) {

        // try refresh
        console.log("Access token expired")
        token = await refreshAccessToken()
        console.log("New token received", token)

        // ❌ refresh token also expired
        if (!token) {

            // logout user
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            localStorage.removeItem("user")

            // redirect login
            if(window.location.pathname !== "/"){
                window.location.href = "/"
            }

            throw new Error("Session expired")
        }

        // update new token
        options.headers.Authorization = `Bearer ${token}`

        // retry request
        response = await fetch(url, options)
    }

    return response
}