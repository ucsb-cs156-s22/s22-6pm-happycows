import React from 'react';

import CommonsTable from "main/components/Commons/CommonsTable";
import commonsFixtures from 'fixtures/commonsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/commons/CommonsTable',
    component: CommonsTable
};

const Template = (args) => {
    return (
        <CommonsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    commons: []
};

export const ThreeCommons = Template.bind({});

ThreeCommons.args = {
    commons: commonsFixtures.threeCommons
};

export const OneCommons = Template.bind({});

OneCommons.args = {
    commons: commonsFixtures.oneCommons
}

export const ThreeCommonsAdmin = Template.bind({});

ThreeCommonsAdmin.args = {
    commons: commonsFixtures.threeCommons,
    currentUser: currentUserFixtures.adminUser
};

export const OneCommonsAdmin = Template.bind({});

OneCommonsAdmin.args = {
    commons: commonsFixtures.oneCommons,
    currentUser: currentUserFixtures.adminUser
}


