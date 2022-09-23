import React, { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Home = () => {

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
        <title>Questions</title>
      </Head>
      <div className='bg-processor w-screen h-screen flex justify-center items-center'>
        <div className="overlay"></div>
        <div className={`lg:w-1/2 md:w-2/3 w-5/6 h-2/3 flex bg-grey-transluscent flex-col justify-center items-center animate__animated ${animate ? "animate__zoomOutDown" : "animate__backInDown"}`}>
          <h1 className='xs:text-5xl text-3xl text-white font-bold uppercase mb-10 font-space text-center animate__animated animate__pulse animate__slow animate__infinite'>Welcome Subham Roy</h1>
          <h1 className='xs:text-xl text-white font-semibold text-center'>A Total Of 20 Minutes Will be Provided.</h1>
          <h1 className='xs:text-xl text-white font-semibold text-center'>The Following Quiz Contains 20 Question.s</h1>
          <h1 className='xs:text-xl text-white font-semibold text-center'>Each Correct Answer will help you gain 1 Point.</h1>
          <h1 className='xs:text-xl text-white font-semibold text-center'>There is no Negative Marking.</h1>
          <Button type="primary" onClick={() => { setTimeout(() => { setAnimate(true) }, 1000); router.replace("/question") }} className='mt-10'>Click Here to Begin</Button>
        </div>
      </div>
    </>
  )
}

export default Home