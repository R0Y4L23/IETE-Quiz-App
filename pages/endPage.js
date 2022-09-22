import React,{useState} from 'react'
import Image from 'next/image'
import correct from "../assets/correct.png"
import wrong from "../assets/wrong.png"
import { Button } from 'antd'
import Link from 'next/link'
import Head from 'next/head'

const EndPage = (props) => {

  const [passed,setPassed]=useState(true)
  return (
    <>
    <Head>
        <title>Questions</title>
    </Head>
    <div className={`${passed?"endWinBg":"endLoseBg"} w-screen h-screen flex justify-center items-center`}>
    <div className='w-1/2 h-2/3 bg-grey-transluscent flex flex-col justify-evenly items-center px-32'>
        {passed?<Image width={100} height={100} src={correct}/>:<Image width={100} height={100} src={wrong}/>}
        <h1 className='text-4xl text-white font-semibold text-center font-space'>{passed?"Congratulations ,you are shortlisted for next round.":"Sorry ,you are not shortlisted for next Round"}</h1>
        <h1 className='text-2xl text-white font-semibold font-mono'>{passed?"Click the button to continue":"Thank You for giving the test."}</h1>
        {passed&&<Link href="https://hackerrank.com/bytefight-3-o" passHref={true}><Button type="primary">Continue</Button></Link>}
    </div>
</div>
</>
  )
}

export default EndPage