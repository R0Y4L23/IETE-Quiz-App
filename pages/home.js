import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Home = () => {
    
    const router=useRouter();

  return (
    <>
    <Head>
        <title>Questions</title>
    </Head>
    <div className='bg-processor w-screen h-screen flex justify-center items-center'>
        <div className='w-1/2 h-2/3 flex flex-col justify-center items-center animate__animated animate__backInDown'>
            <h1 className='text-4xl text-white font-bold uppercase mb-10'>Welcome Subham Roy</h1>
            <h1 className='text-xl text-white font-semibold'>A Total Of 20 Minutes Will be Provided.</h1>
            <h1 className='text-xl text-white font-semibold'>The Following Quiz Contains 20 Question.s</h1>
            <h1 className='text-xl text-white font-semibold'>Each Correct Answer will help you gain 1 Point.</h1>
            <h1 className='text-xl text-white font-semibold'>There is no Negative Marking.</h1>
            <Button type="primary" onClick={()=>{router.push("/question")}} className='mt-10'>Click Here to Begin</Button>
        </div>
    </div>
    </>
  )
}

export default Home