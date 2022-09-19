import React from 'react'
import { UserOutlined,MailOutlined,LockOutlined } from '@ant-design/icons';
import { Input,Button } from 'antd';
import { useRouter } from 'next/router';

const Index = () => {

  const router=useRouter();

  return (
    <div className='bg-blue-500 w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='text-white text-4xl font-bold mb-10'>LOGIN</h1>
      <div className='w-1/2 h-1/2 bg-blue-300 flex flex-col justify-center items-center'>
       <div className="flex flex-col justify-center items-center">
          <Input size="large" className='my-3' placeholder="Enter Email" prefix={<MailOutlined />} />
          <Input size="large" className='my-3' placeholder="Enter Password" prefix={<LockOutlined />} />
          <Button type="primary" onClick={()=>{router.push("/home")}} className='mt-10'>Sign In</Button>
      </div>
      </div>
    </div>
  )
}

export default Index