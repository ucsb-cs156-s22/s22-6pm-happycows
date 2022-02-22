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
            const errorMessage = `Error communicating with backend via ${axiosParameters.method} on ${axiosParameters.url}`;
            toast(errorMessage);
            console.error(errorMessage, e);
            throw e;
        }
    }, {
        initialData
    });
}

// const wrappedParams = async (params) =>
//   await ( await axios(params)).data;


const reportAxiosError = (error) => {
    console.error("Axios Error:", error);
    toast(`Axios Error: ${error}`);
    return null;
};

const wrappedParams = async (params) => {
    try {
        return await (await axios(params)).data;
    } catch (rejectedValue) {
        reportAxiosError(rejectedValue);
        throw rejectedValue;
    }
};

export function useBackendMutation(objectToAxiosParams, useMutationParams, queryKey=null) {
    const queryClient = useQueryClient();

    return useMutation((object) => wrappedParams(objectToAxiosParams(object)), {
        onError: (data) => {
            toast(`${data}`)
        },
        // Stryker disable all: Not sure how to set up the complex behavior needed to test this
        onSettled: () => {
            if (queryKey!==null)
             queryClient.invalidateQueries(queryKey);
        },
        // Stryker enable all
        retry: false,
        ...useMutationParams
    })
}

