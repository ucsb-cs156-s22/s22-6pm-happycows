
import React from 'react';

import RoleBadge from "main/components/Profile/RoleBadge";

export default {
    title: 'components/Profile/RoleBadge',
    component: RoleBadge
};


const Template = (args) => {
    return (
        <RoleBadge {...args} />
    )
};

export const noRole = Template.bind({});

export const admin = Template.bind({});
admin.args = {
    role: "admin"
};



