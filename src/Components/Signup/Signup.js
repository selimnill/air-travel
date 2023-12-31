import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { context } from '../../AuthContext/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    
    const [error, setError] = useState('');


    const {googleSignIn, setUser, loader, updateUser, facebookSignIn, emailPasswordSingUp} = useContext(context);

    const navigate = useNavigate();
    const location = useLocation();
   

    const from = location.state?.from?.pathname || '/';


    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        
        googleSignIn(provider)
        .then(result => {
            const user = result.user;
            setUser(user);
            toast.success('User Created Successful.!');
            navigate(from, {replace: true});
            
        })
        .catch(error => console.error(error));

    }

    const handleFacebookSignIn = () => {
        const provider = new FacebookAuthProvider();

        facebookSignIn(provider)
        .then(result => {
            const user = result.user;
            setUser(user);
            toast.success('User Created Successful.!');
            navigate(from, {replace: true});
        })
        .catch(error => console.error(error));
    }


    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        emailPasswordSingUp(email, password)
        .then(result => {
            const user = result.user;
            setUser(user);
            console.log(user);
            toast.success('User Created Successful.!');
            navigate(from, {replace: true});
            

            
            // update user name
            const userName = {
                displayName: name,
                email: email
            }

            updateUser(userName)
            .then((res) => {
                console.log(res.user);
                
            })
            .catch(err => console.log(err));
        })
        
        .catch(error => {
            console.error(error)
            setError(error);
        });

    }
    if(!loader){
        return <span className="loading loading-infinity loading-lg"></span>
    };


    return (
        <div className="hero login-container bg-base-200 ">
            <div className="hero-content flex-col login-info">
                <div className=" card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-10">
                    <form className="card-body" onSubmit={handleSignIn}>
                        <div className="form-control">
                            <h2 className="text-3xl text-center font-bold">SignUp.!</h2>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name='name' className="input input-bordered rounded-xl h-10" />
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" name='email' required className="input input-bordered rounded-xl h-10" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' required className="input input-bordered rounded-xl h-10" />
                            <label className='lable'>
                                Already have an account? <Link className='font-bold link-hover' to='/login'>Login</Link>
                            </label>
                            {
                                error ? <p className="font-bold text-red-700">{error}</p>  :
                                <>
                                
                                </>
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary rounded-xl">SignUp</button>
                        </div>
                        <div>
                            <p className='font-bold mt-2 mb-3'>~~~~~~~~~~~~~<span className="font-bold">OR</span>~~~~~~~~~~~~~</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent rounded-xl w-24 h-20 mx-3"><FaGoogle className='text-xl mt-3'/> Google</button>
                            <button onClick={handleFacebookSignIn} className="btn btn-outline btn-info rounded-xl w-24 h-20 mx-3"><FaFacebook className='text-xl mt-3'/> Facebook</button>
                            {/* <button className="btn btn-outline btn-error rounded-xl w-24 h-20 mx-3"><FaInstagram className='text-xl mt-3'/> Instagram</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;