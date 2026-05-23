
export async function refreshAccessToken() {

    try{

        const refresh = localStorage.getItem("refresh");

        if (!refresh) return null;

        const response = await fetch(
            "https://ecommerce-backend-9tpa.onrender.com/api/token/refresh/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh })
            }
        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("access", data.access);

            return data.access;

        } else {

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            return null;
        }

    }
    catch(error){

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        return null;
    }
}


export function isTokenExpired(token){

        try{

            const payload = JSON.parse(atob(token.split('.')[1]))

            return payload.exp * 1000 < Date.now()

        }
        catch(error){

            return true
        }
    }