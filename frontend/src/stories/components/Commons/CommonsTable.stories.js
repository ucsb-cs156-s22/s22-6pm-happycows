import React from 'react';

import CommonsTable from "main/components/Commons/CommonsTable";
import commonsFixtures from 'fixtures/commonsFixtures';

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


