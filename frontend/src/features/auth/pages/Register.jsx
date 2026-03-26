import React, { useState } from "react";
import { useNavigate, Link} from "react-router";
import '../auth.form.scss'
import { useAuth } from "../hooks/useAuth";

const Register = ()=>{
    const {loading, handleRegister}= useAuth();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        await handleRegister({username, email, password});  //this is the hook that we have made
        //to keep the ui and business logic seperated
        navigate('/')
    }

    return  (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                        onChange={(e)=>setUsername(e.target.value)}
                        type="username" id="username" name="username" placeholder="Enter Username"  />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Email">Email</label>
                        <input 
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email" id="email" name="email" placeholder="Enter email address"  />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Email">Password</label>
                        <input 
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password" id="password" name="password" placeholder="Enter password here"  />
                    </div>
                    <button className="button primary-button">
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register;