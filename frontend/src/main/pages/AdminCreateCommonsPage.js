import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsForm from "main/components/Commons/CommonsForm";
import { Navigate } from 'react-router-dom'
import { toast } from "react-toastify"

import { useBackendMutation } from "main/utils/useBackend";

const AdminCreateCommonsPage = () => {

    const objectToAxiosParams = (newCommons) => ({
        url: "/api/commons/new",
        method: "POST",
        data: newCommons
    });

    const onSuccess = (commons) => {
        toast(<div>Commons successfully created!<br />id: {commons.id}<br />name: {commons.name}<br />startDate: {commons.startingDate}<br />cowPrice: {commons.cowPrice}</div>);
    }
   
    // Stryker disable all
    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/commons/all"]
    );
    // Stryker enable all

    const submitAction = async (data) => {
        mutation.mutate(data);
    }


    if (mutation.isSuccess) {
        return <Navigate to="/" />
    }

    return (
        <BasicLayout>
            <h2>Create Commons</h2>
            <CommonsForm
                submitAction={submitAction}
            />
        </BasicLayout>
    );
};

export default AdminCreateCommonsPage;