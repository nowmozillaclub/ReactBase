import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../../fbConfig';
import M from 'materialize-css'

function SignIn() {
    
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, pass).then(()=>{
            console.log("Sign in successful")
        }).catch(err => {
            M.toast({html: err.message})
        })
    }

    return (
        <div className="row valign-wrapper" style={{ height: "100vh" }}>
            <div className="container">
                <form className="col s12 white" onSubmit={handleSubmit} style={{ borderRadius: "24px", padding: "20px" }}>
                    <h3 className="center-align">Sign In</h3>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input id="password" onChange={(e) => setPass(e.target.value)} type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <input id="submit" type="submit" className="btn center-align col s3 offset-s3" style={{borderRadius:"24px"}}/>
                        <Link to="/signup" style={{paddingLeft:"20px"}}>Don't have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
