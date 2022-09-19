import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/router'

const Home = () => {
    
    const router=useRouter();

  return (
    <div className='bg-processor w-screen h-screen flex justify-center items-center'>
        <div className='w-1/2 h-2/3 bg-red-transluscent flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold uppercase mb-10'>Welcome Subham Roy</h1>
            <h1 className='text-xl font-semibold'>A Total Of 20 Minutes Will be Provided.</h1>
            <h1 className='text-xl font-semibold'>The Following Quiz Contains 20 Question.s</h1>
            <h1 className='text-xl font-semibold'>Each Correct Answer will help you gain 1 Point.</h1>
            <h1 className='text-xl font-semibold'>There is no Negative Marking.</h1>
            <Button type="danger" onClick={()=>{router.push("/question")}} className='mt-10'>Click Here to Begin</Button>
        </div>
    </div>
  )
}

export default Home