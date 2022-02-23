import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CreateCommonsForm from "main/components/Commons/CreateCommonsForm";
import { createCommons } from "main/services/commons"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import { toast } from "react-toastify"

import { useBackendMutation } from "main/utils/useBackend";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const AdminCreateCommonsPage = () => {

    const objectToAxiosParams = (newCommons) => ({
        url: "/api/commons/new",
        method: "POST",
        data: newCommons
    });

    const onSuccess = (commons) => {
        console.log("***** onSuccess ********");
        toast(`Commons successfully created! - id: ${commons.id} name: ${commons.name}`);
    }

    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/commons"]
    );

    const onSubmit = async (data) => {
        console.log("***** onSubmit ********");
        mutation.mutate(data);
    }

    console.log("mutation=",mutation);

    if (mutation.isSuccess) {
        return <Navigate to="/" />
    }

    return (
        <BasicLayout>
            <h2>Create Commons</h2>
            <CreateCommonsForm
                onSubmit={onSubmit}
            />
        </BasicLayout>
    );
};

export default AdminCreateCommonsPage;