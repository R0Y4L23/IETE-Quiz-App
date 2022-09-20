import React,{useEffect, useState} from 'react'
import { Button,Radio } from 'antd'
import { useRouter } from 'next/router'
import {ArrowLeftOutlined,ArrowRightOutlined} from "@ant-design/icons";
import Head from 'next/head';

const Question = () => {

const router=useRouter();

const [animate,setAnimate]=useState(true)
const [value, setValue] = useState(null);
const [answers,setAnswers]=useState([])
const [currentQuestion,setCurrentQuestion]=useState(0)
const [questions,setQuestions]=useState([
    {"q":"This is question 1",
"o1":"This is option 1",
"o2":"This is option 2",
"o3":"This is option 3",
"o4":"This is option 4",
"a":1},
{"q":"This is question 2",
"o1":"This is option 1",
"o2":"This is option 2",
"o3":"This is option 3",
"o4":"This is option 4",
"a":1},
{"q":"This is question 3",
"o1":"This is option 1",
"o2":"This is option 2",
"o3":"This is option 3",
"o4":"This is option 4",
"a":1},
{"q":"This is question 4",
"o1":"This is option 1",
"o2":"This is option 2",
"o3":"This is option 3",
"o4":"This is option 4",
"a":1},
{"q":"This is question 5",
"o1":"This is option 1",
"o2":"This is option 2",
"o3":"This is option 3",
"o4":"This is option 4",
"a":1}
]);
const onChange = (e) => {
console.log('radio checked', e.target.value);
setValue(e.target.value);
};

useEffect(()=>{
setAnimate(true)
},[animate])

const submitAnswer=()=>{
    if(value==null)
    {
        let a=answers
        a[currentQuestion]=-1
        setAnswers(a)
    }
    else{
        let a=answers
        if(value==questions[currentQuestion].a)
        {
            a[currentQuestion]=1
        }
        else{
            a[currentQuestion]=0
        }
        setAnswers(a)
    }
}

return (
    <>
    <Head>
        <title>Questions</title>
    </Head>
   
<div className='bg1 w-screen h-screen flex justify-center items-center'>
    <div className={`w-2/3 h-2/3 bg-grey-transluscent flex animate__animated ${animate?"animate__fadeInLeft":"animate__fadeOutRight"}`}>
        <div className='w-2/5 bg-gray-600 flex flex-col justify-center items-center px-12 text-center'>
            <h1 className='text-white text-5xl mb-12'>Question {currentQuestion+1}</h1>
            <h1 className='text-white text-3xl'>{questions[currentQuestion].q}</h1>
        </div>
        <div className='w-3/5 text-center flex flex-col'>
            <h1 className='text-white text-3xl mt-12 mb-20'>Choose The Correct Option</h1>
            <Radio.Group onChange={onChange} value={value}>
                <div className='flex flex-col ml-12'>
                <Radio value={1}><span className="text-white text-xl">{questions[currentQuestion].o1}</span></Radio>
                <div className='h-[15px]'></div>
                <Radio value={2}><span className="text-white text-xl">{questions[currentQuestion].o2}</span></Radio>
                <div className='h-[15px]'></div>
                <Radio value={3}><span className="text-white text-xl">{questions[currentQuestion].o3}</span></Radio>
                <div className='h-[15px]'></div>
                <Radio value={4}><span className="text-white text-xl">{questions[currentQuestion].o4}</span></Radio>
                </div>
            </Radio.Group>
            <div className='mt-12 flex justify-between mx-20'>
                <Button type="primary" onClick={()=>{if(currentQuestion!=0){setCurrentQuestion(currentQuestion-1)}setValue(null);setAnimate(false);}} icon={<ArrowLeftOutlined />} shape="round" size="middle" />
                <Button onClick={()=>{submitAnswer();if(currentQuestion!=questions.length-1){setCurrentQuestion(currentQuestion+1);setValue(null);setAnimate(false);}else{router.replace("/endPage")}}} type="primary" icon={<ArrowRightOutlined />}shape="round" size="middle" />
            </div>
        </div>
    </div>
</div>
</>
)
}

export default Question