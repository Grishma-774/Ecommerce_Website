

import { Navigate, Outlet } from "react-router-dom"

function AdminProtectedRoute(){

    const user = JSON.parse(
        localStorage.getItem("user" || "null")
    )

    if(!user || !user.is_staff){

        return <Navigate to="/home" replace />

    }

    return <Outlet />
}

export default AdminProtectedRoute