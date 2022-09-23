import React, { useState, useEffect } from 'react'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {auth} from "../firebase/config"
import { signInWithEmailAndPassword } from 'firebase/auth';

const Index = () => {

  const router = useRouter();
  const [animate, setAnimate] = useState(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)

  const showInfo = () => {
    message.info("Right Click is Disabled for security reasons")
  }
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showInfo()
    });
  }, [])

  const login=()=>{
    setLoading(true)
    if(email&&password)
    {
      signInWithEmailAndPassword(auth,email,password).then((user)=>{
        sessionStorage.setItem("user",JSON.stringify(user.user))
        sessionStorage.setItem("token",user.user.accessToken)
        message.success("Successfully Logged In")
        setLoading(false)
        setTimeout(() => { setAnimate(true) }, 1000); router.replace("/home")
      }).catch((e)=>{
        message.error(e.message)
        setLoading(false)
      })
    }
    else{
      message.error("Enter Email and Password")
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='bg-index w-screen h-screen flex flex-col justify-center items-center'>
        <div className="overlay"></div>
        <h1 className='text-white md:text-6xl xs:text-4xl text-2xl font-bold xs:mb-10 font-space z-10 animate__animated animate__pulse animate__slow animate__infinite'>{"<"}BYTE FIGHT 3.0{">"}</h1>
        <div className={`w-1/2 h-1/2 bg-grey-transluscent flex flex-col justify-center items-center animate__animated ${animate ? "animate__zoomOutDown" : ""}`}>
          <h1 className='text-white xs:text-2xl text-lg font-mono xs:mb-10 uppercase z-10 animate__animated animate__flash animate__slower animate__infinite'> {">>"} Enter Contest</h1>
          <div className="flex flex-col justify-center items-center">
            <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} size="large" className='my-3' placeholder="Enter Email" prefix={<MailOutlined />} />
            <Input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}  size="large" className='my-3' placeholder="Enter Password" prefix={<LockOutlined />} />
            <Button type="primary" onClick={() => { login()}} className='mt-10 font-space'>{!loading?"Sign In":"Loading..."}</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index