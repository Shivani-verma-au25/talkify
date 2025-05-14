import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../utils/api";

const useLogin = () => {
    const queryClient = new QueryClient()
    const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] })
        toast.success("Login successful!")
    },
    onError : (error) => {
      toast.error(error?.response?.data.message)
    }
  });

    return {error , isPending , loginMutation : mutate }
}

export default useLogin;