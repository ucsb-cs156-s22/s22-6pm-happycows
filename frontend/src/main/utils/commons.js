import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function useCommons() {
  return useQuery("getCommons", async () => {
    const uri = "/api/commons";
    try {
      const response = await axios.get(uri);      
      return response.data ;
    } catch (e) {
      console.error(`Error getting data from ${uri}:`,e);
      return [];
    }
  }, {
    initialData: []
  });
}

export function useJoinCommons(params) {
  const queryClient = useQueryClient();
  return useMutation((id) => {
    return axios.post("/api/commons/join/" + id);
  }, { 
    onSuccess: () => {
        params?.onSuccess && params.onSuccess();
        queryClient.invalidateQueries('current user') //refresh commons for current user
    },
    onError: params?.onError
  });
}