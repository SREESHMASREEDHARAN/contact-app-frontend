
import './Auth.css';

import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { MDBInput } from 'mdb-react-ui-kit';

import { Link, useNavigate } from 'react-router-dom';
import { registerAPI, loginAPI } from '../Services/allAPIs'



function Auth({register}) {
    const location = useNavigate()
  const isRegisterForm = register?true : false

  const [userData,setUserData] = useState({
    username:"",
    email:"",
    password:"",
  })
  const registerData=async()=>{
    const {username,email,password} = userData

    if(!username || !email || !password){
      alert("Please fill the form ")
    }

    else{

      const result = await registerAPI(userData)
      console.log(result);
        if(result.status==200){
          alert(result.data)//user registration successful
          location('/login')
        }
        else{
          alert(result.response.data)//user already registered
        }
    }

    console.log(userData);
    
  }




  const loginData= async()=>{
    const {email,password} = userData
    if(!email||!password){
      alert("Please fill the form ")
    }
    else{
        const result = await loginAPI(userData)
        console.log(result);
         if(result.status==200){
          alert("login successful")
           sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
           location('/dashboard')
         }
        else{
          alert("Invalid user data")
        }
       
      }
  }



  return (
    <div className=' background'>
       <div className='container'style={{width:'50%',backgroundColor:'rgba(0, 0, 0, 0.5)',marginTop:'120px'
}}>
        <Row>
         
          <Col >
          <h2 className='text-center mt-5 text-white'>
           {
              isRegisterForm? 'Register' :'Login'
            }
          </h2>
          <form className='p-5'>
            {
              isRegisterForm && 
              <MDBInput value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}   label='User Name' id='formControlLg' type='text' size='lg' />
            }
            <br/>
            <MDBInput value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}   label='Email' id='formControlLg' type='email' size='lg' />
              
              
              <br/>
              <MDBInput value={userData.password}  onChange={e=>setUserData({...userData,password:e.target.value})}   label='Password' id='formControlLg' type='password' size='lg' />
            
          </form>

          {
            isRegisterForm ?
            <div className='text-center text-white'>
            <button onClick={registerData}  className="button-submit text-center" style={{backgroundColor:'#0a4275',border:'none',color:'white',width:'200px',height:'50px',borderRadius:'10px'}}>Register</button>
            <p class="mt-4">Already have an account? <Link to={'/login'} style={{textDecoration:'none'}}>
            <span class="spanauth">Sign In</span>
            </Link></p>
            </div>
            :
            <div className='text-center text-white'>
            <button onClick={loginData}   className="button-submit text-center" style={{backgroundColor:'#0a4275',border:'none',color:'white',width:'200px',height:'50px',borderRadius:'10px'}}>Login</button>
            <p class="mt-4">Don't have an account? <Link to={'/register'} style={{textDecoration:'none'}}><span class="spanauth">Sign Up</span></Link></p>
            </div>
          }
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Auth
