import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

const Protected = ({childern})=>{

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

    return childern;
}

export default Protected;