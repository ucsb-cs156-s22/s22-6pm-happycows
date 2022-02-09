import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersTable from "main/components/Users/UsersTable"

import { useUsers } from "main/utils/users";
const AdminUsersPage = () => {

    const { data: users } = useUsers();

    return (
        <BasicLayout>
            <h2>Users</h2>
            <UsersTable users={users} />
        </BasicLayout>
    );
};

export default AdminUsersPage;
