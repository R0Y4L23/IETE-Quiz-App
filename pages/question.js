/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Radio, message } from 'antd'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined, ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { firestore } from "../firebase/config"
import Head from 'next/head';
import Countdown from 'react-countdown';

const Question = () => {

    const showInfo = () => {
        message.info("Right Click is Disabled for security reasons")
    }
    const [display, setDisplay] = useState(false)
    const [data, setData] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState(0)
    useEffect(() => {
        message.info("Loading....")
        const token = sessionStorage.getItem("token")
        if (!token) {
            message.error("Please Login")
            router.replace("/")
        }
        else {
            const user = JSON.parse(sessionStorage.getItem("user"))
            onSnapshot(doc(firestore, "Users", user.uid), (doc) => {
                setData(doc.data())
                if (!doc.data().hasFinished) {
                    setDisplay(true)
                    message.success("All the best")
                }
                else {
                    message.error("Test Already Given")
                    router.replace("/endPage")
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

    useEffect(() => {
        var today = new Date();
        var day, month, year, startH, startM, endH, endM
        onSnapshot(doc(firestore, "Exam Date", "DateAndTime"), (doc) => {

            let d = doc.data()
            day = d.day
            month = d.month
            year = d.year
            startH = d.startHour
            startM = d.startMinute
            endH = d.endHour
            endM = d.endMinute

            if (today.getDate() == day && (today.getMonth() + 1) == month && today.getFullYear() == year) {
                if (today.getHours() >= startH && today.getHours() <= endH && today.getMinutes() >= startM && today.getMinutes() <= endM) {
                    if(today.getSeconds()==0)
                    {
                        setTimeRemaining((endM - today.getMinutes())*60000)
                    }
                    else{
                        setTimeRemaining(((endM - today.getMinutes()-1)*60000)+((60-today.getSeconds())*1000))

                    }
                }
                else {
                    router.replace("/endPage")
                }
            }
            else {
                router.replace("/endPage")
            }
        });
    })

    const router = useRouter();
    const [animate, setAnimate] = useState(true)
    const [value, setValue] = useState(0);
    const [answers, setAnswers] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,])
    const [optionSelected, setOptionSelected] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questions, setQuestions] = useState([
        {
            "q": `
#include <stdio.h>\\n
int main() {\\n
    int a[5]={2,5,7,3,4};\\n
    for(int i=0;i<=3;i++)\\n
    {\\n
        if(a[i]&(i+1)<=a[i+1])\\n
        {\\n
            a[i]=a[i+1]^(i+1);\\n
        }\\n
        else\\n
        {\\n
            a[i]=a[i+1]&(i+1);\\n
        }\\n
    }\\n
    for(int j=0;j<5;j++)\\n
    {\\n
        printf("%d\t",a[j]);\\n
    }\\n
    return 0;\\n
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
    #include <stdio.h>\\n
int main() {\\n
   int a[8]={2,5,1,7,6,4,9,0};\\n
   int temp,count=0;\\n
   for(int i=0;i<7;i++)\\n
   {\\n
       for(int j=0;j<7-i;j++)\\n
       {\\n
           if(a[j]>a[j+1])\\n
           {\\n
               temp=a[j];\\n
               a[j]=a[j+1];\\n
               a[j+1]=temp;\\n
               count++;\\n
           }\\n
       }\\n
   }\\n
   printf("\n%d",count);\\n
    return 0;\\n
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
            "q": "Which One Of the Following is not a Linear Data Structure?",
            "o1": "Stack",
            "o2": "Trees",
            "o3": "Queue",
            "o4": "Linked List",
            "a": 2
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
    //What is the output of below program?\\n
int main()\\n
{\\n
int a = 10;\\n
printf("%d",a++);\\n
return 0;\\n
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
    What will be the output of the C program?\\n
    #include<stdio.h>\\n
    #define CODE(j)\ \\n
    printf("ByteFight 3.0\n");\\n
    int main()\\n
    {\\n
    CODE(0);\\n
    return 0;\\n
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
    //What will be the output of the following program?\\n

#include<stdio.h>\\n
int main() {\\n
    int p=2,q=5,r=9;\\n
    if((q+9)<<p||(q&p)<p)\\n
    {\\n
        r=(p&p)+q;\\n
    }\\n
    else\\n
    {\\n
        p=r+p;\\n
    }\\n
    r=q+p;\\n
    printf("%d",p+q+r);\\n
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
    //What will be the output of the following program?\\n

#include<stdio.h>\\n
int main() {\\n
    int p=7,q=3,r=4;\\n
    if((r+p)>(p-r))\\n
    {\\n
        p=(p+8)+p;\\n
    }\\n
    if(r<p||(p&q)<(6-p))\\n
    {\\n
        r=9&r; \\n
    }\\n
    else\\n
    {\\n
        p=q+r;\\n
    }\\n
    printf("%d",p+q+r);\\n
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
        setValue(e.target.value);
        submitAnswer(e.target.value);
    };

    useEffect(() => {
        setAnimate(true)
    }, [animate])

    const submitAnswer = (v) => {

        let o = optionSelected
        if (v != null) {
            o[currentQuestion] = v
        }
        else {
            o[currentQuestion] = 0
        }
        setOptionSelected(o)

        if (v == null) {
            let a = answers
            a[currentQuestion] = -1
            setAnswers(a)
        }
        else {
            let a = answers
            if (v == questions[currentQuestion].a) {
                a[currentQuestion] = 1
            }
            else {
                a[currentQuestion] = 0
            }
            setAnswers(a)
        }
    }

    const finishTest = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"))
        var m = 0
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] != -1) {
                m += answers[i]
            }
        }
        const userRef = doc(firestore, "Users", user.uid);
        await updateDoc(userRef, {
            hasFinished: true,
            marks: m,
            options: optionSelected,
            answerGiven: answers
        }).then(() => {
            message.info("Quiz Ended")
            router.replace({ "pathname": "/endPage" })
        }).catch((e) => {
            message.error("Some Error Occured")
        });
    }

    if (display&&data) {
        return (
            <>
                <Head>
                    <title>Questions</title>
                </Head>
                <div className='bg1 w-screen h-screen flex flex-col justify-center items-center'>
                    <Countdown onComplete={finishTest} className='self-start text-2xl font-bold text-white lg:translate-x-20 sm2:translate-x-16 translate-x-6 sm2:-translate-y-12 translate-y-3' date={Date.now() + (timeRemaining)} />
                    <Button onClick={() => { finishTest() }} shape="round" type="danger" className=" self-end lg:-translate-x-20 sm2:-translate-x-16 -translate-x-6 sm2:-translate-y-20 -translate-y-5">Finish</Button>
                    <div className={`xl:w-2/3 lg:w-4/5 sm2:w-[90%] w-[98%] sm2:h-2/3 h-4/5 bg-grey-transluscent-questions flex animate__animated ${animate ? "animate__fadeInLeft" : "animate__fadeOutRight"}`}>
                        <div className='w-2/5 bg-gray-600 flex flex-col justify-center items-center px-12 text-center'>
                            <h1 className='text-white lg:text-5xl sm2:text-3xl text-lg mb-12 font-space'>Question {currentQuestion + 1}</h1>
                            <h1 className='text-white text-sm'>{questions[currentQuestion].q.split("\\n").map((item,index)=>{return (<div key={index}>{item}</div>)})}</h1>
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
                                {currentQuestion !== 0 && <Button type="primary" className="sm2:ml-0 -ml-16" onClick={() => { setValue(optionSelected[currentQuestion - 1]); if (currentQuestion != 0) { setCurrentQuestion(currentQuestion - 1) } setAnimate(false); }} icon={<ArrowLeftOutlined />} shape="round" size="middle" />}
                                <Button className="sm2:mr-0 -mr-16" onClick={() => { if (currentQuestion != questions.length - 1) { setValue(optionSelected[currentQuestion + 1]); setCurrentQuestion(currentQuestion + 1); setAnimate(false); } else { finishTest() } }} type="primary" icon={currentQuestion == questions.length - 1 ? <SendOutlined /> : <ArrowRightOutlined />} shape="round" size="middle" />
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-white translate-y-8">Ⓒ IETE 2022</p>
                </div>
            </>
        )

    }
    else {
        return null
    }
}

export default Question