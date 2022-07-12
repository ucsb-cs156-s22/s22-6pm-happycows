import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsTable from 'main/components/Commons/CommonsTable';
import { useBackend } from 'main/utils/useBackend';
import { useCurrentUser } from "main/utils/currentUser";

export default function AdminListCommonsPage()
{
  const { data: currentUser } = useCurrentUser();

  // Stryker disable  all 
  const { data: commons, error: _error, status: _status } =
    useBackend(
      ["/api/commons/allplus"],
      { method: "GET", url: "/api/commons/allplus" },
      []
    );
  // Stryker enable  all 

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>List Commons</h1>
        <CommonsTable commons={commons} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
};
