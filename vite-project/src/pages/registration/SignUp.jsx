import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { API } from '../../utils/Constants'
import { toast } from 'react-toastify'
import axios from 'axios'

function Signup() {

    const SignupRef = useRef()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = (e) => {
        setLoading(true)
        e.preventDefault();
        // console.log("name:", username)
        // console.log("email:", email)
        // console.log("password:", password)
        var body = {
            username: username,
            email: email,
            password: password,
            userId: new Date().valueOf()
        }
        axios.post(API.register, body).then(
            response => {
                console.log(response)
                toast.success("Sign Up Succesfull")
                SignupRef.current.reset();
                setLoading(false)
                navigate("/login")
            },
            error => {
                console.log("error", error)
                toast.error("Sign up Failed")
                setLoading(false)
            }
        )



    }


    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <form ref={SignupRef}>
                    <div>
                        <input type="text"
                            name='Username'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="email"
                            name='email'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={handleSignup}
                            className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                            Signup
                        </button>
                    </div>
                </form>
                <div>

                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup