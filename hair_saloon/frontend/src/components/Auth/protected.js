import { Redirect, Route } from 'react-router-dom';

export const ProtectedRouteAdmin = props => {

    if (localStorage.getItem("admin") === null) {
        return <Redirect to="/adminlogin" />

    }
    return <Route {...props}></Route>
}

export const ProtectedRouteOwner = props => {
    if (localStorage.getItem("owner") === null) {
        const pathname = window.location.pathname
        localStorage.setItem("path",pathname)
        return <Redirect to="/ownerlogin" />
    }
    return <Route {...props}></Route>
}

export const ProtectedRouteCust = props => {

    if (localStorage.getItem("customer") === null) {
        const pathname = window.location.pathname
        localStorage.setItem("path",pathname)
        return <Redirect to="/customerlogin" />
    }
    return <Route {...props}></Route>
}