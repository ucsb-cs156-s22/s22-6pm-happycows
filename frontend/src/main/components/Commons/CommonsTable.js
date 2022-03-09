import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
// import { toast } from "react-toastify";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/commonsUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function CommonsTable({ commons, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/commons/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/commons/all"]
    );
    // Stryker enable all

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }


    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data

        },
        {
            Header:'Name',
            accessor: 'name',
        },
        {
            Header:'Cow Price',
            accessor: row => String(row.cowPrice),
            id: 'cowPrice'
        },
        {
            Header:'Milk Price',
            accessor: row => String(row.milkPrice),
            id: 'milkPrice'
        },
        {
            Header:'Starting Balance',
            accessor: row => String(row.startingBalance),
            id: 'startingBalance'
        },
        {
            Header:'Starting Date',
            //accessor: row => row.startingDate.toString(),
            accessor: row => String(row.startingDate),
            id: 'startingDate'
        }
    ];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, "CommonsTable"));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, "CommonsTable"));
    }

    // Stryker disable next-line ArrayDeclaration : [columns] is a performance optimization
    

    for (let readable of commons) {
        readable.startingDate = new Date(readable.startingDate).toLocaleString();
    }

    return <OurTable
        data={commons}
        columns={columns}
        testid={"CommonsTable"}
    />;
};
