import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const Protected = ()=>{

    const {loading, user} = useAuth();

    if(loading){
        return (
            <main><h1>Loading...</h1></main>
        )
    }
    //this it the protected comp 
    //thus check if the user exists or not
    if(!user){
        return <Navigate to={'/login'}/>
    }

    return <Outlet/>;
}

export default Protected;