import React, { useState, useEffect } from 'react'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Index = () => {

  const router = useRouter();
  const [animate, setAnimate] = useState(false)

  const showInfo = () => {
    message.info("Right Click is Disabled for security reasons")
  }
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showInfo()
    });
  }, [])

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
            <Input size="large" className='my-3' placeholder="Enter Email" prefix={<MailOutlined />} />
            <Input size="large" className='my-3' placeholder="Enter Password" prefix={<LockOutlined />} />
            <Button type="primary" onClick={() => { setTimeout(() => { setAnimate(true) }, 1000); router.replace("/home") }} className='mt-10 font-space'>Sign In</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index