import {SubmitHandler, useForm} from 'react-hook-form'
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import {  useNavigate } from 'react-router';
import axios from 'axios';


const Login = ()=>{
    const navigate= useNavigate()
    const handleLoginFormSubmit: SubmitHandler<{email: string, password: string}>= async (data)=>{
        try {
            const response = await axios.post<{email:string, password:string, message:string}>('http://localhost:7777/customer/login',{email: data.email, password:data.password})
            alert(response.data.message)
        console.log(response)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log("Axios error:", error);
                console.error("Axios Error:", error.message);
                console.log('Response:', JSON.stringify(error.response?.data));
                alert(error.response?.data?.message || "An unexpected Axios error occurred.");
            } else if (error instanceof Error) {
                console.error("Generic Error:", error.message);
                alert(error.message || "An unexpected error occurred.");
            } else {
                console.error("Unknown Error:", error);
                alert("An unknown error occurred.");
            }
        }
    }

    const {register, formState: {errors, isSubmitting},handleSubmit,} = useForm({
        defaultValues: {
            email: "", password:""
        }
    });
    return (
        <main className='flex flex-col justify-center items-center h-screen  border-blue-800  max-w-[60%] min-w-[30%] max-h-[60%] min-h-[30%]'>
            <form action="" onSubmit={handleSubmit(handleLoginFormSubmit)} 
                className='w-[100%] border-2 border-blue-600 rounded-lg py-8 px-4 bg-blue-50'
            >
                <div className='flex px-1 py-3  border-slate-900 rounded-md gap-2 mb-2'>
                    <MdEmail color='blue' className='mt-3' />
                    <input 
                        type='text'
                        id='login-email'
                        {...register("email", {
                            required: "email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._]+@(gmail).(com|in)$/,
                                message: "email is invalid"
                            }
                        })}
                        placeholder="email"
                        style={{borderBottom:"1px solid blue"}}
                        className='w-full border-none text-black rounded-md p-2 focus:ring-0 focus:outline-none placeholder-gray-400'
                        />
                </div>
                        {errors.email && <p className="text-red-600 ml-4">{errors.email.message}</p>}
                <div className='flex px-1 py-3  border-slate-900 rounded-md gap-2 mb-2 '>
                    <TbLockPassword color='blue' className='mt-3'/>
                    <input 
                    type='text'
                    id='login-password'
                    {...register('password',{
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
                    placeholder="password"
                    style={{borderBottom:"1px solid blue"}}
                        className='w-full border-none text-black rounded-md p-2 focus:ring-0 focus:outline-none placeholder-gray-400'
                    />
                </div>
                {errors.password && <p className="text-red-600 ml-4">{errors.password.message}</p>}
                <div className='ml-2 mb-1'>
                    <button className='text-blue-800'
                        onClick={()=>navigate('/forgot-password')}
                    >forgot password?</button>   
            </div>
                <button type='submit' className={`bg-blue-800 w-24 h-10 rounded  text-xl text-white bg-gradient-to-r from-blue-300 from-5% via-blue-700 via-[25%] to-blue-950`}
                    style={{ marginLeft: "calc(50% - 3rem)" }}
                >{isSubmitting? "Logging in " : "Login"}</button>
            </form>
            

        </main>
    )
}

export default Login;