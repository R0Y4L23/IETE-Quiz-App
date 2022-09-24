/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import correct from "../assets/correct.png"
import wrong from "../assets/wrong.png"
import { Button, message } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {firestore} from "../firebase/config"
import {doc,onSnapshot} from "firebase/firestore"

const EndPage = () => {

  const router=useRouter()

  const [passed, setPassed] = useState(false)
  const [display,setDisplay]=useState(false)
  const [data,setData]=useState(null)
  const showInfo = () => {
    message.info("Right Click is Disabled for security reasons")
  }
  useEffect(() => {
    message.info("Loading...")
    const token = sessionStorage.getItem("token")
    if (!token) {
      message.error("Please Login")
      router.replace("/")
    }
    else
    {
      const user = JSON.parse(sessionStorage.getItem("user"))
      onSnapshot(doc(firestore, "Users", user.uid), (doc) => {
        setData(doc.data())
        if (doc.data().hasFinished) {
          if(doc.data().marks>=0)   // <- The Decider Code
          {
            setPassed(true)
          }
          setDisplay(true)
          message.success("Thank You for giving the test")
        }
        else {
          message.error("Please begin the test")
          router.replace("/home")
        }
      });
    }
  }, [])

  useEffect(()=>{
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showInfo()
    });
  },[])

  if(display)
  {
    return (
      <>
        <Head>
          <title>End Page</title>
        </Head>
        <div className={`${passed ? "endWinBg" : "endLoseBg"} w-screen h-screen flex justify-center items-center`}>
          <div className="overlay sm2:hidden"></div>
          <div className='lg:w-1/2 w-4/5 h-2/3 bg-grey-transluscent flex flex-col justify-evenly items-center sm:px-32 px-20'>
            {passed ? <Image width={100} height={100} src={correct} /> : <Image width={100} height={100} src={wrong} />}
            <h1 className='sm:text-4xl xs:text-2xl text-lg text-white font-semibold text-center font-space animate__animated animate__pulse animate__slow animate__infinite'>{passed ? "Congratulations ,you are shortlisted for next round." : "Success is most often achieved by those who don't know that failure is inevitable."}</h1>
            <h1 className='sm:text-2xl text-lg text-white font-semibold font-mono text-center animate__animated animate__flash animate__slower animate__infinite'>{passed ? "Create a Hackerrank Account. Click the button to continue" : "Thank You for giving the test. Better Luck Next Time!"}</h1>
            {passed && <Link href="https://hackerrank.com/bytefight-3-o" passHref={true}><Button type="primary">Continue</Button></Link>}
          </div>
        </div>
      </>
    )
  }
  else{
    return null
  }
}

export default EndPage