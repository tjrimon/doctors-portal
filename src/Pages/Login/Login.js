import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { useForm } from "react-hook-form";

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return (
            <div>
                <p>Signed In User: {user.email}</p>
            </div>
        );
    }
    return (
        <div className=' flex justify-center items-center h-[80vh]'>
            <div class="card w-96 bg-base-100 shadow-xl text-center">
                <div class="card-body">
                    <h2 class="font-semibold text-2xl text-center">Login</h2>
                    <div class="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} class="btn btn-outline">Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;