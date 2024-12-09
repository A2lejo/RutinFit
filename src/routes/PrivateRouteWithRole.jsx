import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";
import Forbidden from "@pages/Forbidden";


export const PrivateRouteWithRole = ({ children, role }) => {
    if (JSON.parse(localStorage.getItem('user')).rol === role) {
        return children;
    }

    return <Forbidden />;
}
