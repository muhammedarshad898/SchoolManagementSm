import React, { useState } from 'react'
import { registerApi,loginApi } from '../services/Allapi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const[authstatus,setauthstatus]=useState(false)
    const[user,setuser]=useState({
        email:"",username:"",password:""
    })
    const changestatus=()=>{
        setauthstatus(!authstatus)
    }
    const nav=useNavigate()
    const handleregister=async()=>{
        console.log(user)
        const{email,password,username}=user
        if(!email||!password||!username){
           alert("enter a valid input")
        }
        else{
            const res=await registerApi(user)
            console.log(res)
            if(res.status==201){
                toast.success("registration successfull")
                setuser({
                    email:"",username:"",password:""
                })
                changestatus()
                
            }
            else{
               if (res?.response?.data){
                toast.error(res.response.data)

                }
                else{
                    toast.error("something went wrong")
                }
            }
        }
    }
    const handlelogin=async()=>{
        const {email,password}=user
        if(!email||!password){
            toast.warning("enter a valid input")
        }
        else{
            const res=await loginApi(user)
            console.log(res)
            if(res.status==200){
                toast.success("login successfull")
                setuser({
                    email:"",username:"",password:""
                })
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('uname',res.data.username)
                nav('/dash')
            }
            else{
                if(res?.response?.data){
                    toast.error(res.response.data)
                }
                else{
                    toast.error("something went wrong")
                }
            }
        }
    }

  return (
    <div className="page auth">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-panel">
            <p className="hero-kicker">Teacher Access</p>
            <h1 className="auth-title">
              {authstatus ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="auth-subtitle">
              {authstatus
                ? 'Set up your profile to manage student records and dashboards.'
                : 'Sign in to continue managing student details and insights.'}
            </p>
            <div className="auth-highlights">
              <div>
                <h4>Fast CRUD</h4>
                <p>Add, edit, and update students in one flow.</p>
              </div>
              <div>
                <h4>Secure Records</h4>
                <p>Keep student details organized and accessible.</p>
              </div>
            </div>
          </div>

          <div className="auth-form">
            <div className="auth-header">
              <h2>{authstatus ? 'Register' : 'Login'}</h2>
              <p>Use your teacher credentials to proceed.</p>
            </div>
            <div className="auth-fields">
              {authstatus && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={user.username}
                  onChange={(e) => setuser({ ...user, username: e.target.value })}
                />
              )}
              <input
                type="text"
                className="form-control"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => setuser({ ...user, email: e.target.value })}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setuser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="auth-actions">
              {authstatus ? (
                <button className="btn-brand" onClick={handleregister}>Register</button>
              ) : (
                <button className="btn-brand" onClick={handlelogin}>Login</button>
              )}
              {authstatus ? (
                <button className="btn-link" onClick={changestatus}>Already a user?</button>
              ) : (
                <button className="btn-link" onClick={changestatus}>Are you a new user?</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
