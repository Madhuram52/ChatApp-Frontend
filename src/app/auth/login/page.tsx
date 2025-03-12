'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useAuth();

    interface LoginFormValues {
        email: string;
        password: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValues: LoginFormValues = { email, password };
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/api/auth/login `, formValues , {withCredentials: true});
            console.log(response.data);
            if(response.data.token){
                setIsAuthenticated(true); 
                router.push('/');
            }
            else{
                console.log(response.data);     
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className='flex justify-center m-10'>
            <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg shadow-purple-400">
                <h5 className="text-xl font-medium text-purple-600 mb-4">Login to your account</h5>
                <div className='space-y-6'>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-10">
                        <div>
                            <label htmlFor="email" className="block text-md font-medium text-purple-600">Your email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-sm mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-md font-medium text-purple-600">Your password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-sm mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-md px-3 py-2">Login</button>
                        {/* <button type="submit" className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-md px-3 py-2" onClick={()=>{ */}
                            {/* router.push('/');
                        }}>redirect</button> */}

                    </form>
                    <div className="text-sm font-medium text-gray-500 text-center">
                        Not having an account? <Link href="/auth/signup" className="text-purple-700 hover:underline">Signup here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
