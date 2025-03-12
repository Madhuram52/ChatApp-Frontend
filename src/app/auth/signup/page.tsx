'use client'
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Signup = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    interface SignupFormValues {
        name: string;
        email: string;
        password: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValues: SignupFormValues = { name, email, password };
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}`+'/api/auth/signup', formValues);
            console.log(response.data); 
            router.push('/auth/login');
        }
        catch(err){
            console.log(err);
        }
    }
        
    return (
        <div className='flex justify-center m-5'>
            <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg shadow-purple-400">
                <h5 className="text-xl font-medium text-purple-600 mb-4">Create a new account</h5>
                <div className='space-y-6'>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-10">
                        <div>
                            <label htmlFor="name" className="block text-md font-medium text-purple-600">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-sm mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                placeholder="John Doe"
                                required
                            />
                        </div>
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
                        <button type="submit" className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-md px-3 py-2">Sign Up</button>

                    </form>
                    <div className="text-sm font-medium text-gray-500 text-center">
                        Already have an account? <Link href="/auth/login" className="text-purple-700 hover:underline">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
