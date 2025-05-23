import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../utils/api";

const useSignup = () => {
      const queryClient = useQueryClient();
    
      const {mutate ,isPending ,error} = useMutation({
        mutationFn : signup,
        onSuccess : () => queryClient.invalidateQueries({queryKey : ['authUser']})  
      });
      return {isPending , error , signupMutate : mutate}
}

export default  useSignup;