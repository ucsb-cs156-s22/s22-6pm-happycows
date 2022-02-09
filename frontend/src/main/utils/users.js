import { useQuery } from "react-query";
import axios from "axios";

export function useUsers() {
  return useQuery("users", async () => {
    const uri = "/api/admin/users";
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
