/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import correct from "../assets/correct.png"
import wrong from "../assets/wrong.png"
import { Button, message } from 'antd'
import Link from 'next/link'
import Head from 'next/head'

const EndPage = (props) => {

  const [passed, setPassed] = useState(true)
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
      <div className={`${passed ? "endWinBg" : "endLoseBg"} w-screen h-screen flex justify-center items-center`}>
        <div className="overlay sm2:hidden"></div>
        <div className='lg:w-1/2 w-4/5 h-2/3 bg-grey-transluscent flex flex-col justify-evenly items-center sm:px-32 px-20'>
          {passed ? <Image width={100} height={100} src={correct} /> : <Image width={100} height={100} src={wrong} />}
          <h1 className='sm:text-4xl xs:text-2xl text-lg text-white font-semibold text-center font-space animate__animated animate__pulse animate__slow animate__infinite'>{passed ? "Congratulations ,you are shortlisted for next round." : "Success is most often achieved by those who don't know that failure is inevitable."}</h1>
          <h1 className='sm:text-2xl text-lg text-white font-semibold font-mono text-center animate__animated animate__flash animate__slower animate__infinite'>{passed ? "Click the button to continue" : "Thank You for giving the test. Better Luck Next Time!"}</h1>
          {passed && <Link href="https://hackerrank.com/bytefight-3-o" passHref={true}><Button type="primary">Continue</Button></Link>}
        </div>
      </div>
    </>
  )
}

export default EndPage