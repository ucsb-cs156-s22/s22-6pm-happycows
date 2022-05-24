import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

// example
//  queryKey ["/api/users/all"] for "api/users/all"
//  queryKey ["/api/users","4"]  for "/api/users?id=4"

// For axiosParameters
//   
// {
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//  }
// 

// GET Example:
// useBackend(
//     ["/api/admin/users"],
//     { method: "GET", url: "/api/admin/users" },
//     []
// );

export function useBackend(queryKey, axiosParameters, initialData) {

    return useQuery(queryKey, async () => {
        try {
            const response = await axios(axiosParameters);
            return response.data;
        } catch (e) {
            // Stryker disable next-line OptionalChaining
            if (e.response?.data?.message) {
                toast.error(e.response.data.message);
            } else {
                const errorMessage = `Error communicating with backend via ${axiosParameters.method} on ${axiosParameters.url}`;
                toast.error(errorMessage);
            }
            throw e;
        }
    }, {
        initialData
    });
}



const wrappedParams = async (params) => {
    return await (await axios(params)).data;
};

export function useBackendMutation(objectToAxiosParams, useMutationParams, queryKey = null) {
    const queryClient = useQueryClient();

    return useMutation((object) => wrappedParams(objectToAxiosParams(object)), {
        onError: (error) => {
            // Stryker disable next-line OptionalChaining : we want to check if each nested object is there but we dont want to write tests for each specific case
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                const errorMessage = `Error communicating with backend via ${error.response.config.method} on ${error.response.config.url}`;
                toast.error(errorMessage);
            }
        },
        // Stryker disable all : Not sure how to set up the complex behavior needed to test this
        onSettled: () => {
            if (queryKey !== null)
                queryClient.invalidateQueries(queryKey);
        },
        // Stryker enable all
        retry: false,
        ...useMutationParams
    })
}

