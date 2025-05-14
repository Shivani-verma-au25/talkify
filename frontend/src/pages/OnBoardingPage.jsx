import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, toast } from "react-hot-toast";
import { completeOnboarding } from "../utils/api.js";
import { CameraIcon, MapPin , ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../index.js";

function OnBoardingPage() {
  const { authUser } = useAuthUser();
  const queryClinet = useQueryClient();

  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onBoardingMutation, isPending ,error} = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onBoarded successfully!");
      queryClinet.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError : (error)=> {
      toast.error(error.response.data?.message);
    }
  });

  const handleSubmitMethond = (e) => {
    e.preventDefault();
    onBoardingMutation(formData);
  };

  // handel random avatar
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() *100) + 1; // 1-100 incluede
    const rondomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormData({...formData , profilePic:rondomAvatar});
    toast.success("Random Profile picture is generated!")
  };

 

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl ">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile{" "}
          </h1>
          <form onSubmit={handleSubmitMethond} className="space-y-6">
            {/* profile pic container */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* image privew */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formData?.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile preview "
                    className="w-f"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* generate random avatar btm  */}
              <div className="flex items-center  justify-center gap-2">
                <button onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* fullname */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullname"
                value={formData?.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder='"Full Name'
              />
            </div>

            {/* bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData?.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Tell other about yourself "
              />
            </div>

            {/* languages*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* native langauage */}
              {/* native language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-3">Native language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={(e) =>
                    setFormData({ ...formData, nativeLanguage: e.target.value })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* learning language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-3">Learning language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                {/* <MapPin  className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content " /> */}
                <MapPin  className ="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-red-500 bg-white" />

                <input 
                type="text" 
                name="location" 
                value={formData.location}
                onChange={(e)=>setFormData({...formData,location : e.target.value})}
                className="input input-bordered w-full pl-10"
                placeholder="City , Country"
                />
              </div>
            </div>

            {/* submit button */}
            <button className="btn btn-primary w-full" disabled={isPending} type='submit'>
              {
                !isPending ? (
                  <>
                  <ShipWheelIcon  className="size-5 mr-2"/>
                  Compelete onboarding
                  </>
                ) : (
                  <>
                  <LoaderIcon  className="animate-spin size-5 mr-2"/>
                  Onboarding...
                  </>
                )
              }
            </button>
          </form>
          {/* {toast.error(error?.response?.data?.message  )} */}
        </div>
      </div>
    </div>
  );
}

export default OnBoardingPage;
