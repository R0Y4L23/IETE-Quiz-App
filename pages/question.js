import React,{useState} from 'react'
import { Button,Radio } from 'antd'
import { useRouter } from 'next/router'
import {ArrowLeftOutlined,ArrowRightOutlined} from "@ant-design/icons";

const Question = () => {

const router=useRouter();
const [value, setValue] = useState(1);
const onChange = (e) => {
console.log('radio checked', e.target.value);
setValue(e.target.value);
};

return (
<div className='bg1 w-screen h-screen flex justify-center items-center'>
    <div className='w-2/3 h-2/3 bg-grey-transluscent flex'>
        <div className='w-2/5 bg-gray-600 flex flex-col justify-center items-center px-12 text-center'>
            <h1 className='text-white text-5xl mb-12'>Question 1</h1>
            <h1 className='text-white text-3xl'>What is the correct way to declare a variable in c++?</h1>
        </div>
        <div className='w-3/5 text-center flex flex-col'>
            <h1 className='text-white text-3xl mt-12 mb-20'>Choose The Correct Option</h1>
            <Radio.Group onChange={onChange} value={value}>
                <div className='flex flex-col ml-12'>
                <Radio value={1}><span className="text-white text-xl">Int a=6;</span></Radio>
                <div className='h-[15px]'></div>
                <Radio value={2}><span className="text-white text-xl">Integer a=6;</span></Radio>
                <div className='h-[15px]'></div>
                <Radio value={3}><span className="text-white text-xl">int a=6;</span></Radio>
                <div className='h-[15px]'></div>
                <Radio value={4}><span className="text-white text-xl">a=6;</span></Radio>
                </div>
            </Radio.Group>
            <div className='mt-12 flex justify-between mx-20'>
                <Button type="primary" icon={<ArrowLeftOutlined />} shape="round" size="middle" />
                <Button onClick={()=>{router.push("/endPage")}} type="primary" icon={<ArrowRightOutlined />}shape="round" size="middle" />
            </div>
        </div>
    </div>
</div>
)
}

export default Question