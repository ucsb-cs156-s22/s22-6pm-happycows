import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CreateCommonsForm from "main/components/Commons/CreateCommonsForm";
import {createCommons} from "main/services/commons"
import {useMutation} from "react-query";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from "react-router-dom";

const AdminCreateCommonsPage = () => {
    const {addToast} = useToasts();
    const navigate = useNavigate();
    const mutation = useMutation(createCommons,
        {
            onSuccess: () => {
                console.log("onSuccess Function Called");
                addToast("Commons successfully created!", { appearance: 'success' });
                navigate("/");
            },
            onError: (error) => {
                // addToast(`Error creating commons: ${error?.response?.data?.message}`, { appearance: 'error' });
                console.log("onError Function Called", JSON.stringify(error));
                console.log("error.response.data: ",error.response.data)
            }
        }
    )
    return (
        <BasicLayout>
            <h2>Create Commons</h2>
            <CreateCommonsForm 
                onSubmit={ (result) => mutation.mutate(result)}
            />
        </BasicLayout>
    );
};

export default AdminCreateCommonsPage;