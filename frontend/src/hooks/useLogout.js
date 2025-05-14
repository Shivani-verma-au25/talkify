import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../utils/api"

const useLogout = () =>{
    const queryClinet = useQueryClient()
     const {mutate  , isPending} = useMutation({
        mutationFn : logout,
        onSuccess :() => queryClinet.invalidateQueries({queryKey : ['authUser']})
      });
      return {isPending , logoutMethod : mutate}
}

export default useLogout;