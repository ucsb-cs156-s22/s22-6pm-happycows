
import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function NotFoundPage() {
    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>404 Error!</h1>
                The Page You Are Looking For Does Not Exist Or You Do Not Have Access!
            </div>
        </BasicLayout>
    )
}