
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { refreshAccessToken, isTokenExpired } from "../Util/api"

function ProtectedRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {

        async function verify() {

            let access = localStorage.getItem("access")

            if (!access || isTokenExpired(access)) {
                access = await refreshAccessToken()
            }

            setIsAuthenticated(!!access)
        }

        verify()

    }, [])

    if (isAuthenticated === null) {
        return <p>Loading...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default ProtectedRoute