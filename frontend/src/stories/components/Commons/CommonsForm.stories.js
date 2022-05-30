// not sure why this isn't showing up in storybook -kz

import React from 'react';

import CommonsForm from "main/components/Commons/CommonsForm";
import { commonsFixtures } from "fixtures/commonsFixtures";

export default {
    title: 'components/Commons/TestingCommonsForm',
    component: CommonsForm
};


const Template = (args) => {
    return (
        <CommonsForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    initialCommons: commonsFixtures.oneCommons,
    buttonLabel: "Update",
    submitAction: () => { }
};
