import React from "react";
import { useNavigate, Link} from "react-router";
import '../auth.form.scss'

const Register = ()=>{

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    return  (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="username" id="username" name="username" placeholder="Enter Username"  />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email address"  />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Email">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter password here"  />
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