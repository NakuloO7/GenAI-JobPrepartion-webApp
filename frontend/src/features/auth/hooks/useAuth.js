import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register, getMe } from "../services/auth.api";
import { useEffect } from "react";


/**
 * @description form this hook we basically set user values into the context such that we can use them into UI
 */
export const useAuth = ()=>{
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;


    const handleLogin = async({email, password}) =>{
        setLoading(true);
        try {
            const data = await login({email, password})
            setUser(data.user);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }

    }

    const handleRegister = async({username, email, password}) =>{
        setLoading(true);
        try {
            const data = await register({username, email, password});
            setUser(data.user);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout= async()=>{
        setLoading(true);
        try {
            const data = await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        const getAndsetUser = async()=>{
            try {
                const data = await getMe();   //this depends on the cookie as it contains the user data
                //so until we have the token the user is logged in and we can ask for the user data from backend
                if(data && data.user){
                    setUser(data.user);
                }else{
                    setUser(null)
                }
            } catch (error) {
                setUser(null);
                console.log(error);
            }finally{
                setLoading(false);
            }
            //this try catch block I have created such that if the cookie is deleted it will show the login page
        }
        getAndsetUser();
    },[])
    return {user, loading, handleLogin, handleRegister, handleLogout};
}
