import {  useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate()
    const queryClient =  useQueryClient()
    const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] })
        navigate('/')

    },
    onError : (error) => {
      toast.error(error?.response?.data.message)
    }
  });

    return {error , isPending , loginMutation : mutate }
}

export default useLogin;