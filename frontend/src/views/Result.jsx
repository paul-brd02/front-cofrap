import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Result() {
    let location = useLocation()
    const [user, setUser] = useState(null);


    useEffect(() => {
        if (location.state?.user) {
            setUser(location.state.user);
        }
    }, [location])

    return (
        <div>
            {user ? (
                <div>Mail : {user.email} Mot de passe : {user.password}</div>
            ) : (
                <div>Pas d'utilisateur authentifié</div>
            )}
        </div>
    )
};

export default Result;