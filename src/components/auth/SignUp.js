import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../fbConfig';

function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, pass).then((data) => {
            db.collection('users').doc().set({
                'Name': name,
                'Email': email,
                'UID': data.user.uid
            })
        })
    }

    return (
        <div className="row valign-wrapper" style={{ height: "100vh" }}>
            <div className="container">
                <form className="col s12 white" onSubmit={handleSubmit} style={{ borderRadius: "24px", padding: "20px" }}>
                    <h3 className="center-align">Sign Up</h3>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">person</i>
                            <input id="name" onChange={(e) => setName(e.target.value)} type="text" className="validate" />
                            <label htmlFor="name">Name</label>
                        </div>
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
                        <Link to="/" style={{paddingLeft:"20px"}}>Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
