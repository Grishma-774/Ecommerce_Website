
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { refreshAccessToken, isTokenExpired } from "../Util/api"

function PublicRoute() {

    const [redirectPath, setRedirectPath] = useState(null)


    useEffect(() => {

        async function check() {

            let access = localStorage.getItem("access")

            if (!access || isTokenExpired(access)) {
                access = await refreshAccessToken()
            }

            if (access) {

                const user = JSON.parse(
                    localStorage.getItem("user")
                )

                console.log(user)

                if (user?.is_staff) {

                    setRedirectPath("/admin/orders")

                }
                else {

                    setRedirectPath("/")

                }

            }
            else {

                setRedirectPath(false)

            }

        }

        check()

    }, [])

    if (redirectPath === null) {

        return <p>Checking...</p>

    }

    if (redirectPath) {

        return <Navigate to={redirectPath} replace />

    }

    return <Outlet />
}

export default PublicRoute