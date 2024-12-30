import {useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { AiFillIdcard } from "react-icons/ai";
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';



const Registeration :React.FC = ()=>{
    const [data,setData]= useState()

    const {register,formState: {errors, isSubmitting}, handleSubmit, getValues}= useForm({
        defaultValues:{name: "",email:"",username:"", password: "", confirmPassword:""}
    });

    const handleRegisterationFormSubmit : SubmitHandler<{name: string,email:string,username:string, password: string, confirmPassword:string}>= async (data)=>{
        try{
            const responce = await axios.post<{message:string}>('http://localhost:7777/customer/register',{name: data.name, email:data.email,userName: data.username, password: data.password})
            alert(responce.data.message)
        }catch(error:unknown){
            if (axios.isAxiosError(error)) {
                console.error("Axios Error:", error.response?.data || error.message);
                alert(error.response?.data || "An unexpected Axios error occurred.");
            } else if (error instanceof Error) {
                console.error("Generic Error:", error.message);
                alert(error.message || "An unexpected error occurred.");
            } else {
                console.error("Unknown Error:", error);
                alert("An unknown error occurred.");
            }
        }
    }
    return (
        <main className='flex flex-col mt-4 h-screen border-blue-800  max-w-[60%] min-w-[30%] min-h-[30%]'>
            
            <form action="" onSubmit={handleSubmit(handleRegisterationFormSubmit)} className='w-[100%] border-2 border-blue-600 rounded-lg py-8 px-4 bg-blue-50'>
                <div className='flex px-1 py-3  border-slate-900 rounded-md gap-2 mb-2'>
                    <AiFillIdcard color='blue' className='mt-3' />
                    <input 
                        type='text'
                        id='Registeration-name'
                        placeholder="name"
                        {...register("name", {
                            required: "name is required",
                            pattern: {
                                value: /^[a-zA-Z/s]{3,}$/,
                                message: "name is invalid"
                            }
                        })}
                        style={{borderBottom:"1px solid blue"}}
                        className='w-full border-none text-black rounded-md p-2 focus:ring-0 focus:outline-none placeholder-gray-400'
                        />
                
                </div>
                {errors.name && <p className='text-red-600 ml-2'>{errors.name.message}</p>}
                <div className='flex px-1 py-3  border-slate-900 rounded-md gap-2 mb-2'>
                    <MdEmail color='blue' className='mt-3' />
                    <input 
                        type='text'
                        id='Registeration-email'
                        placeholder="email"
                        {...register("email", {
                            required: "email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._]+@(gmail).(com|in)$/,
                                message: "email is invalid"
                            }
                        })}
                        style={{borderBottom:"1px solid blue"}}
                        className='w-full border-none text-black rounded-md p-2 focus:ring-0 focus:outline-none placeholder-gray-400'
                        />
                
                </div>
                {errors.email && <p className='text-red-600 ml-2'>{errors.email.message}</p>}
                <div className='flex px-1 py-3  border-slate-900 rounded-md gap-2 mb-2 '>
                    <FaRegUserCircle color='blue' className='mt-3'/>
                    <input 
                    type='text'
                    id='Registeration-username'
                    {...register("username",{
                        required: "username is required",
                        pattern:{
                            value: /^[a-zA-z]+[a-zA-z1-9_.*]{3}$/,
                            message: "username is invalid"
                        }
                    })}
                    placeholder="username"
                    style={{borderBottom:"1px solid blue"}}
                        className='w-full border-none text-black rounded-md p-2 focus:ring-0 focus:outline-none placeholder-gray-400'
                    />
                </div>
                {errors.username && <p className='text-red-600 ml-2'>{errors.username.message}</p>}

                <div className='flex px-1 py-3  border-slate-900 rounded-md gap-2 mb-2 '>
                    <TbLockPassword color='blue' className='mt-3'/>
                    <input 
                        type='password'
                        id='Registeration-password'
                        {...register("password",{
                            required: "password is required",
                            minLength: {
                                value: 8,
                                message: "minimum length of password must be 8"
                            },
                            maxLength:{
                                value: 20,
                                message: "maximum length of password must be 20"
                            }
                        })}
                        placeholder='password'
                        style={{borderBottom:"1px solid blue"}}
                            className='w-full border-none text-black rounded-md p-2 focus:ring-0 focus:outline-none placeholder-gray-400'
                /></div>
                {errors.password && <p className='text-red-600 ml-2'>{errors.password.message}</p>}

                <div className='flex px-1 py-3  border-slate-900 rounded-md gap-2 mb-2 '>
                    <TbLockPassword color='blue' className='mt-3' />
                    <input 
                        type='password'
                        id='Registeration-confirmPassword'
                        {...register('confirmPassword',{
                            required: "confirm password field is required",
                            validate: (value) => value=== getValues('password') || "Password doesnot match"
                        })}
                        placeholder='confirm password'
                        style={{borderBottom:"1px solid blue"}}
                        className='w-full border-none text-black rounded-md p-2 focus:ring-0 focus:outline-none placeholder-gray-400'
                    />
                </div>
                {errors.confirmPassword && <p className='text-red-600 ml-2'>{errors.confirmPassword.message}</p>}

                <button type='submit' className={`bg-blue-800 w-24 h-10 rounded  text-xl text-white bg-gradient-to-r from-blue-300 from-5% via-blue-700 via-[25%] to-blue-950`}
                    style={{ marginLeft: "calc(50% - 3rem)" }}
                >{ isSubmitting ? "Registering":"Register"}</button>
            </form>
        </main>
    )

}

export default Registeration;