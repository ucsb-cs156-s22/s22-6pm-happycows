import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsTable from 'main/components/Commons/CommonsTable';
import { useBackend } from 'main/utils/useBackend';
import { useCurrentUser } from 'main/utils/currentUser'
import { useBackendMutation } from "main/utils/useBackend";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const AdminListCommonsPage = () => {

const currentUser = useCurrentUser();

  const { data: commons, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/commons/all"],
      { method: "GET", url: "/api/commons/all" },
      []
    );


    

    return (
        <BasicLayout>
          <div className="pt-2">
            <h1>List Commons</h1>
            <CommonsTable commons={commons} currentUser={currentUser} />
          </div>
        </BasicLayout>
      )
};

export default AdminListCommonsPage;