import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../utils/Constants';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import axios from 'axios';

function Login() {

    const formRef = useRef()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    const updateLogin = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setLogin({ ...login, [name]: value })
    }

    const handleLogin = (e) => {
        setLoading(true)    
        e.preventDefault()
        // console.log(login)
        axios.post(API.login, login).then(
            response => {
                console.log(response)
                toast.success("Login Successfull")
                formRef.current.reset();
                setLoading(false)
                if(response.data.statusCode == 200){
                    // localStorage.setItem("isUserLoggedIn", true)
                    localStorage.setItem("user", JSON.stringify(login))
                    navigate("/")   
                }
            },
            error => {
                // console.log("error", error)
                toast.error("Login Failed")
                setLoading(false)
            }
        )

    }
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <form ref={formRef}>
                    <div>
                        <input type="text"
                            name='username'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Username'
                            onChange={updateLogin}
                        />
                    </div>
                    <div>
                        <input
                            name='password'
                            type="password"
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                            onChange={updateLogin}
                        />
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={handleLogin}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Login
                        </button>
                    </div>
                </form>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}


export default Login;