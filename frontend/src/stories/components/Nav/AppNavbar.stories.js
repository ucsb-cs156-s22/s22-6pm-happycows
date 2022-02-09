
import React from 'react';

import AppNavbar from "main/components/Nav/AppNavbar";

export default {
    title: 'components/Nav/AppNavbar',
    component: AppNavbar
};


const Template = (args) => {
    return (
        <AppNavbar {...args} />
    )
};

export const noRole = Template.bind({});

export const admin = Template.bind({});
admin.args = {
    role: "admin"
};



