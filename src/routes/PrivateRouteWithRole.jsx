import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";
import Forbidden from "@pages/Forbidden";


export const PrivateRouteWithRole = ({ children, role }) => {
    console.log(JSON.parse(localStorage.getItem('user')).rol)
    console.log("Role de rol:",role)
    if (JSON.parse(localStorage.getItem('user')).rol === role) {
        return children;
    }

    return <Forbidden />;
}
