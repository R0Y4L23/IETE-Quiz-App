import React,{useState} from 'react'
import Image from 'next/image'
import correct from "../assets/correct.png"
import wrong from "../assets/wrong.png"

const EndPage = () => {
  const [passed,setPassed]=useState(false)
  return (
    <div className='endLoseBg w-screen h-screen flex justify-center items-center'>
    <div className='w-1/2 h-2/3 bg-grey-transluscent flex flex-col justify-center items-center'>
        {passed?<Image src={correct}/>:<Image src={wrong}/>}
        <h1 className='text-xl font-semibold'>Sorry ,you are not shortlisted for next Round</h1>
        <h1 className='text-xl font-semibold'>Thank You for giving the test.</h1>
    </div>
</div>
  )
}

export default EndPage