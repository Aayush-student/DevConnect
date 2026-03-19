import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'

const INPUT_STYLE = "w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all text-white font-medium"

const SignUpForm = ({ close, toggle }) => {
    const { setAccessToken, setRefreshToken, setShowLogin, navigate, axios } = useContext(AppContext)
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirm: "" })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const { username, email, password, confirm } = formData
        
        if (password !== confirm) return toast.error("Passwords do not match!")

        try {
            const { data } = await axios.post('/user/register', { username, email, password })

            if (data.success) {
                const { accessToken, refreshToken } = data.data
                
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", refreshToken)

                toast.success('Account created!')
                setShowLogin(false)
                close()
                navigate('/')
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed.")
        }
    }

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
            <div className="relative w-full max-w-md bg-[#0B0E14] border border-white/10 rounded-2xl shadow-2xl p-10">
                <button onClick={close} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer">
                    <X size={20} />
                </button>
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Create Account</h2>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Join the developer community</p>
                </div>

                <form className="space-y-5" onSubmit={submitHandler}>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Username</label>
                        <input 
                            type="text" name='username' required placeholder="johndoe"
                            onChange={onChangeHandler} value={formData.username}
                            className={INPUT_STYLE}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                        <input 
                            type="email" name='email' required placeholder="name@example.com"
                            onChange={onChangeHandler} value={formData.email}
                            className={INPUT_STYLE}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                        <input 
                            type="password" name='password' required placeholder="••••••••"
                            onChange={onChangeHandler} value={formData.password}
                            className={INPUT_STYLE}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Confirm</label>
                        <input 
                            type="password" name='confirm' required placeholder="••••••••"
                            onChange={onChangeHandler} value={formData.confirm}
                            className={INPUT_STYLE}
                        />
                    </div>

                    <button type='submit' className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] mt-4 uppercase tracking-widest cursor-pointer">
                        Register
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-4">
                        Already have an account?{' '}
                        <button type="button" onClick={toggle} className="text-indigo-400 hover:underline font-semibold cursor-pointer">
                            Login
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm