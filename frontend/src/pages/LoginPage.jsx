import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { login } from "../utils/api";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginData, setLogin] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError : (error) => {
      toast.error(error?.response?.data.message)
    }
  });

  const hanldeLoginMethod = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8"
      data-theme="coffee"
    >
      <div className="border border-primary/24 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* login form section  */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="text-primary size-9" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider ">
              Talkify
            </span>
          </div>
          {/* Error message display */}
           
        

          <div className="w-full">
            {/* form */}
            <form onSubmit={hanldeLoginMethod}>
              <div className="space-y-4">
                <div>
                  <h2 className="tet-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account ot continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* email */}
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLogin({ ...loginData, email: e.target.value })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLogin({ ...loginData, password: e.target.value })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loadin-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-xs">
                      Allready have an account?{" "}
                      <Link
                        to={"/signup"}
                        className="text-primary hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>


        {/* image section  */}

        <div className="hidden lg:flex w-full lg:w-1/2  bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8" >
            {/* illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={'/signuppagepic.png'} alt="" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice converstion , make friends ,and improve your language skill together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
