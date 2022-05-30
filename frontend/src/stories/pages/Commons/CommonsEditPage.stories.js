
import React from 'react';

import AdminEditCommonsPage from "main/pages/AdminEditCommonsPage";
import { commonsFixtures } from "fixtures/commonsFixtures";

const Template = (args) => {
    return (
        <AdminEditCommonsPage {...args} />
    )
};

export default {
    title: 'pages/AdminEditCommonsPage',
    component: AdminEditCommonsPage
};

export const Default = Template.bind({});

Default.args = {
    commons: commonsFixtures.oneCommons,
};
