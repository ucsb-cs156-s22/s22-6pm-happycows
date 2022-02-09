import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export function useCurrentUser() {
  let rolesList = ["ERROR_GETTING_ROLES"];
  return useQuery("current user", async () => {
    try {
      const response = await axios.get("/api/currentUser");
      try {
        rolesList = response.data.roles.map((r) => r.authority);
      } catch (e) {
        console.error("Error getting roles: ", e);
      }
      response.data = { ...response.data, rolesList: rolesList }
      return { loggedIn: true, root: response.data };
    } catch (e) {
      console.error("Error invoking axios.get: ", e);
      return { loggedIn: false, root: null };
    }
  }, {
    initialData: { loggedIn: false, root: null, initialData:true }
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(async () => {
    await axios.post("/logout");
    await queryClient.resetQueries("current user", { exact: true });
    navigate("/");
  })
  return mutation;
}

export function hasRole(currentUser, role) {
  return currentUser
    && currentUser.loggedIn
    && currentUser.root
    && currentUser.root.rolesList
    && currentUser.root.rolesList.includes(role)
}