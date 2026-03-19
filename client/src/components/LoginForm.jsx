import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'

const INPUT_STYLE = "w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all text-white font-medium"

const LoginForm = ({ close, toggle }) => {
    const { axios, setAccessToken, setRefreshToken, setUser, setShowLogin, navigate } = useContext(AppContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/user/login', { email, password })
            
            if (data.success) {
                const { accessToken, refreshToken, user } = data.data

                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                setUser(user)

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                
                toast.success("Welcome back")
                setShowLogin(false)
                close()
                navigate('/')
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
            <div className="bg-[#0B0E14] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl relative">
                <button onClick={close} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <X size={20} />
                </button>
                <form onSubmit={handleLogin} className="p-10">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Login</h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Enter your credentials</p>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={INPUT_STYLE} />
                        </div>
                    </div>
                    <button type="submit" className="w-full mt-10 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] cursor-pointer">
                        Sign In
                    </button>
                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <button type="button" onClick={toggle} className="text-xs font-bold text-gray-500 hover:text-indigo-400 uppercase tracking-widest transition-colors cursor-pointer">
                            New here? <span className="text-white ml-1">Create Account</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm