/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {firestore} from "../firebase/config"
import { doc,onSnapshot } from 'firebase/firestore'

const Home = () => {

  const router = useRouter();
  const [animate, setAnimate] = useState(false)
  const [display,setDisplay]=useState(false)
  const [data,setData]=useState(null)
  const [time,setTime]=useState(false)

  const showInfo = () => {
    message.info("Right Click is Disabled for security reasons")
  }
  useEffect(() => {
    message.info("Loading....")
    const token=sessionStorage.getItem("token")
    if(!token)
    {
      message.error("Please Login")
      router.replace("/")
    }
    else
    {
      const user=JSON.parse(sessionStorage.getItem("user"))
      onSnapshot(doc(firestore, "Users", user.uid), (doc) => {
        setData(doc.data())
      });
      setDisplay(true)
    }
  }, [])

  useEffect(()=>{
     document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showInfo()
    });
  },[])

  useEffect(()=>{
    var today = new Date();
    var day,month,year,startH,startM,endH,endM
    onSnapshot(doc(firestore, "Exam Date", "DateAndTime"), (doc) => {

      let d=doc.data()
      day=d.day
      month=d.month
      year=d.year
      startH=d.startHour
      startM=d.startMinute
      endH=d.endHour
      endM=d.endMinute

      if (today.getDate() == day && (today.getMonth() + 1) == month && today.getFullYear() == year) {
        if (today.getHours() >= startH && today.getHours() <= endH && today.getMinutes() >= startM && today.getMinutes() <= endM) {
          setTime(true)
        }
        else {
          setTime(false)
        }
      }
      else {
        setTime(false)
      }
    });
  })

  if(display&&data)
  {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <div className='bg-processor w-screen h-screen flex justify-center items-center'>
          <div className="overlay"></div>
          <div className={`lg:w-1/2 md:w-2/3 w-5/6 h-2/3 flex bg-grey-transluscent flex-col justify-center items-center animate__animated ${animate ? "animate__zoomOutDown" : "animate__backInDown"}`}>
            <h1 className='xs:text-5xl text-3xl text-white font-bold uppercase mb-10 font-space text-center animate__animated animate__pulse animate__slow animate__infinite'>Welcome {data.name}</h1>
            <h1 className='xs:text-xl text-white font-semibold text-center'>Do Not Refresh the Page. Progress is not Stored.</h1>
            <h1 className='xs:text-xl text-white font-semibold text-center'>It is preferred to attempt the quiz on desktop for better experience.</h1>
            <h1 className='xs:text-xl text-white font-semibold text-center'>Your Browser must have an active internet connection.</h1>
            <h1 className='xs:text-xl text-white font-semibold text-center'>A Total Of 30 Minutes Will be Provided.</h1>
            <h1 className='xs:text-xl text-white font-semibold text-center'>The Following Quiz Contains 15 Questions.</h1>
            <h1 className='xs:text-xl text-white font-semibold text-center'>Each Correct Answer will help you gain 1 Point.</h1>
            <h1 className='xs:text-xl text-white font-semibold text-center'>There is no Negative Marking.</h1>
            {!data.hasFinished ? (time ? <Button type="primary" onClick={() => { setTimeout(() => { setAnimate(true) }, 1000); router.replace("/question") }} className='mt-10'>Click Here to Begin</Button> : <Button className='mt-10' disabled>Time is over or you are too early for the test</Button> ): <Button className='mt-10' disabled>Test Already Given</Button>}
          </div>
        </div>
      </>
    )
  }
  else{
    return null
  }
}

export default Home