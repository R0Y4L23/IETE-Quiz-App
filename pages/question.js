import React, { useEffect, useState } from 'react'
import { Button, Radio, message } from 'antd'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined, ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import Head from 'next/head';

const Question = () => {

    const showInfo = () => {
        message.info("Right Click is Disabled for security reasons")
    }
    useEffect(() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showInfo()
        });
    }, [])

    const router = useRouter();
    const [animate, setAnimate] = useState(true)
    const [value, setValue] = useState(null);
    const [answers, setAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questions, setQuestions] = useState([
        {
            "q": `
#include <stdio.h>
int main() {
    int a[5]={2,5,7,3,4};
    for(int i=0;i<=3;i++)
    {
        if(a[i]&(i+1)<=a[i+1])
        {
            a[i]=a[i+1]^(i+1);
        }
        else
        {
            a[i]=a[i+1]&(i+1);
        }
    }
    for(int j=0;j<5;j++)
    {
        printf("%d\t",a[j]);
    }
    return 0;
}
`,
            "o1": "1 7 0 0 6",
            "o2": "2 5 3 0 4",
            "o3": "1 5 0 0 4",
            "o4": "5 5 0 4 3",
            "a": 3
        },
        {
            "q": `
    #include <stdio.h>
int main() {
   int a[8]={2,5,1,7,6,4,9,0};
   int temp,count=0;
   for(int i=0;i<7;i++)
   {
       for(int j=0;j<7-i;j++)
       {
           if(a[j]>a[j+1])
           {
               temp=a[j];
               a[j]=a[j+1];
               a[j+1]=temp;
               count++;
           }
       }
   }
   printf("\n%d",count);
    return 0;
}
    `,
            "o1": "10",
            "o2": "12",
            "o3": "13",
            "o4": "8",
            "a": 3
        },
        {
            "q": "If we multiply two matrices what is the expected time complexity?",
            "o1": "O(N)",
            "o2": "O(N^2)",
            "o3": "O(Log(N))",
            "o4": "O(N^3)",
            "a": 4
        },
        {
            "q": "If we multiply two matrices what is the expected time complexity?",
            "o1": "O(N)",
            "o2": "O(N^2)",
            "o3": "O(Log(N))",
            "o4": "O(N^3)",
            "a": 4
        },
        {
            "q": "What is the time complexity of merge operation if size of two sorted array is m and n respectively? ",
            "o1": "O(m+n)",
            "o2": "O(mn)",
            "o3": "O(max(m,n))",
            "o4": "O(min(m,n))",
            "a": 1
        },
        {
            "q": `
    //What is the output of below program?
int main()
{
int a = 10;
printf("%d",a++);
return 0;
}
    `,
            "o1": "9",
            "o2": "10",
            "o3": "11",
            "o4": "12",
            "a": 2
        },
        {
            "q": "Which operator has highest precedence in * / % ?",
            "o1": "*",
            "o2": "/",
            "o3": "%",
            "o4": "All Have Same Precedence",
            "a": 4
        },
        {
            "q": "_________ is the preprocessor directive which is used to end the scope of #ifdef.",
            "o1": "#if",
            "o2": "#endif",
            "o3": "#ifndef",
            "o4": "#elif",
            "a": 2
        },
        {
            "q": "What following operator is called ?:",
            "o1": "Scope Resolution Operator",
            "o2": "Conditional Operator",
            "o3": "Ternary Operator",
            "o4": "if else o/p",
            "a": 3
        },
        {
            "q": `
    What will be the output of the C program?
    #include<stdio.h>
    #define CODE(j)\
    printf("ByteFight 3.0\n");
    int main()
    {
    CODE(0);
    return 0;
    }
    `,
            "o1": "Compilation error",
            "o2": "ByteFight 3.0",
            "o3": "Runtime Error",
            "o4": "No Output",
            "a": 2
        },
        {
            "q": "A queue is a ?",
            "o1": "FIFO (First In First Out) list",
            "o2": "LIFO (Last In First Out) list.",
            "o3": "Ordered Tree",
            "o4": "Linear Tree",
            "a": 1
        },
        {
            "q": "If the elements “C”, “O”, “D” and “E” are placed in a QUEUE and STACK and are deleted one at a time, in what order will they be removed?",
            "o1": "QUEUE : EDOC and STACK : EDOC",
            "o2": "QUEUE : EDOC and STACK : CODE",
            "o3": "QUEUE : CODE and STACK : CODE",
            "o4": "QUEUE : CODE and STACK : EDOC",
            "a": 4
        },
        {
            "q": "In the array implementation of circular queue, which of the following operation take worst case linear time?",
            "o1": "Insertion",
            "o2": "Deletion",
            "o3": "Clear a Queue",
            "o4": "None",
            "a": 4
        },
        {
            "q": `
    //What will be the output of the following program?

#include<stdio.h>
int main() {
    int p=2,q=5,r=9;
    if((q+9)<<p||(q&p)<p)
    {
        r=(p&p)+q;
    }
    else
    {
        p=r+p;
    }
    r=q+p;
    printf("%d",p+q+r);
    return 0;
}
    `,
            "o1": "9",
            "o2": "13",
            "o3": "14",
            "o4": "18",
            "a": 3
        },
        {
            "q": `
    //What will be the output of the following program?

#include<stdio.h>
int main() {
    int p=7,q=3,r=4;
    if((r+p)>(p-r))
    {
        p=(p+8)+p;
    }
    if(r<p||(p&q)<(6-p))
    {
        r=9&r; 
    }
    else
    {
        p=q+r;
    }
    printf("%d",p+q+r);
    return 0;
}
    `,
            "o1": "20",
            "o2": "26",
            "o3": "18",
            "o4": "25",
            "a": 4
        }
    ]);
    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    useEffect(() => {
        setAnimate(true)
    }, [animate])

    const submitAnswer = () => {
        if (value == null) {
            let a = answers
            a[currentQuestion] = -1
            setAnswers(a)
        }
        else {
            let a = answers
            if (value == questions[currentQuestion].a) {
                a[currentQuestion] = 1
            }
            else {
                a[currentQuestion] = 0
            }
            setAnswers(a)
        }
    }

    return (
        <>
            <Head>
                <title>Questions</title>
            </Head>

            <div className='bg1 w-screen h-screen flex flex-col justify-center items-center'>
                <Button onClick={() => { router.replace({ "pathname": "/endPage" }) }} shape="round" type="danger" className=" self-end lg:-translate-x-20 sm2:-translate-x-16 -translate-x-6 sm2:-translate-y-20 -translate-y-5">Finish</Button>
                <div className={`xl:w-2/3 lg:w-4/5 sm2:w-[90%] w-[98%] sm2:h-2/3 h-4/5 bg-grey-transluscent-questions flex animate__animated ${animate ? "animate__fadeInLeft" : "animate__fadeOutRight"}`}>
                    <div className='w-2/5 bg-gray-600 flex flex-col justify-center items-center px-12 text-center'>
                        <h1 className='text-white lg:text-5xl sm2:text-3xl text-lg mb-12 font-space'>Question {currentQuestion + 1}</h1>
                        <h1 className='text-white lg:text-xl sm2:text-lg text-sm'>{questions[currentQuestion].q}</h1>
                    </div>
                    <div className='w-3/5 text-center flex flex-col justify-around'>
                        <h1 className='text-white lg:text-4xl sm2:text-3xl text-lg mt-12 mb-20 font-space'>Choose The Correct Option</h1>
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
                            {currentQuestion !== 0 && <Button type="primary" className="sm2:ml-0 -ml-16" onClick={() => { if (currentQuestion != 0) { setCurrentQuestion(currentQuestion - 1) } setValue(null); setAnimate(false); }} icon={<ArrowLeftOutlined />} shape="round" size="middle" />}
                            <Button className="sm2:mr-0 -mr-16" onClick={() => { submitAnswer(); if (currentQuestion != questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setValue(null); setAnimate(false); } else { router.replace({ "pathname": "/endPage" }) } }} type="primary" icon={currentQuestion == questions.length - 1 ? <SendOutlined /> : <ArrowRightOutlined />} shape="round" size="middle" />
                        </div>
                    </div>
                </div>
                <p className="text-center text-white translate-y-8">Ⓒ IETE 2022</p>
            </div>
        </>
    )
}

export default Question