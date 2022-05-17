import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading";

const Login = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(data.email, data.password);
  };

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  let signInError;

  if (gError || error) {
    signInError = (
      <p className="text-red-500 py-3">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  if (user || gUser) {
    console.log(user);
  }

  return (
    <div className=" flex justify-center items-center h-[80vh]">
      <div class="card w-96 bg-base-100 shadow-xl text-center">
        <div class="card-body">
          <h2 class="font-semibold text-2xl text-center">Login</h2>

          <form
            class="form-control w-full max-w-xs"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid email",
                },
              })}
            />
            <label class="label">
              {errors.email?.type === "required" && (
                <span class="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span class="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                pattern: {
                  value: /[A-Za-z0-9]{6}/,
                  message: "Password must be 6 character.",
                },
              })}
            />
            <label class="label">
              {errors.password?.type === "required" && (
                <span class="label-text-alt text-red-500">
                  {errors.password.message}
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span class="label-text-alt text-red-500">
                  {errors.password.message}
                </span>
              )}
            </label>
            {signInError}
            <button type="submit" class="btn w-full max-w-xs text-white ">
              Login
            </button>
          </form>

          <div class="divider">OR</div>
          <button onClick={() => signInWithGoogle()} class="btn btn-outline">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
