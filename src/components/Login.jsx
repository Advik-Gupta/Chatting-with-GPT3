import React from 'react'
import OpenAILogo from '../images/openAI.jpg'
import { auth, provider } from '../firebase'
import db from '../firebase'

const Login = ({setUser}) => {

    const signInWithGoogle = () => {
        return auth.signInWithPopup(provider)
        .then(result => {
            const {displayName, email, photoURL, uid} = result.user
            const signedInUser = {
                name: displayName,
                email: email,
                image: photoURL,
                id: uid,
                messages: []
            }
            
            const userRef = db.collection('users').doc(uid)
            userRef.get().then(doc => {
                if(!doc.exists) {
                    userRef.set(signedInUser)
                    setUser(signedInUser)
                } else {
                    setUser(doc.data())
                }
            })
        })
    }

    return (
        <div class="container-fluid" style={{height: '100vh'}}>
            <div className="container m-auto mt-auto" style={{height: '100vh', display: 'flex'}}>
                <div class="card m-auto" style={{width: '25rem'}}>
                    <img src={OpenAILogo} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Login</h5>
                        <p class="card-text">Login with your gmail account to chat with one of the most advanced AIs in the whole world.</p>
                        <a href="#" class="btn btn-primary" onClick={signInWithGoogle}>Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;