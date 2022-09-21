import React, { useState } from 'react'
import { MailOutlined,LockOutlined } from '@ant-design/icons';
import { Input,Button } from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Index = () => {

  const router=useRouter();
  const [animate,setAnimate]=useState(false)

  return (
    <>
    <Head>
        <title>Login</title>
    </Head>
    <div className='bg-index w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='text-white text-4xl font-bold mb-10'>{"/*"}  BYTE FIGHT 3.0  {"*/"}</h1>
      <div className={`w-1/2 h-1/2 bg-grey-transluscent flex flex-col justify-center items-center animate__animated ${animate?"animate__zoomOutDown":""}`}>
      <h1 className='text-white text-2xl font-mono mb-10 uppercase'> {">>"} Enter Contest</h1>
       <div className="flex flex-col justify-center items-center">
          <Input size="large" className='my-3' placeholder="Enter Email" prefix={<MailOutlined />} />
          <Input size="large" className='my-3' placeholder="Enter Password" prefix={<LockOutlined />} />
          <Button type="primary" onClick={()=>{setTimeout(()=>{setAnimate(true)},1000); router.replace("/home")}} className='mt-10'>Sign In</Button>
      </div>
      </div>
    </div>
    </>
  )
}

export default Index