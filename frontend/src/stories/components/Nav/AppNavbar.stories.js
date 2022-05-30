import React from 'react';

import AppNavbar from "main/components/Nav/AppNavbar";
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { systemInfoFixtures } from 'fixtures/systemInfoFixtures';

export default {
    title: 'components/Nav/AppNavbar',
    component: AppNavbar
};


const Template = (args) => {
    return (
        <AppNavbar {...args} />
    )
};

export const basic_notLoggedIn = Template.bind({});


export const basic_loggedInAdminUser = Template.bind({});
basic_loggedInAdminUser.args = {
    currentUser: currentUserFixtures.adminUser
};

export const basic_loggedInRegularUser = Template.bind({});
basic_loggedInRegularUser.args = {
    currentUser: currentUserFixtures.userOnly
};

export const extraLinks_neitherH2NorSwagger = Template.bind({});
extraLinks_neitherH2NorSwagger.args = {
    currentUser: currentUserFixtures.userOnly,
    systemInfo: systemInfoFixtures.showingNeither
};

export const extraLinks_H2Only = Template.bind({});
extraLinks_H2Only.args = {
    currentUser: currentUserFixtures.userOnly,
    systemInfo: {
        "springH2ConsoleEnabled": true,
        "showSwaggerUILink": false,
    }
};

export const extraLinks_SwaggerOnly = Template.bind({});
extraLinks_SwaggerOnly.args = {
    currentUser: currentUserFixtures.userOnly,
    systemInfo: {
        "springH2ConsoleEnabled": false,
        "showSwaggerUILink": true,
    }
};

export const extraLinks_bothH2AndSwagger = Template.bind({});
extraLinks_bothH2AndSwagger.args = {
    currentUser: currentUserFixtures.userOnly,
    systemInfo: systemInfoFixtures.showingBoth
};


export const localhost_3000 = Template.bind({});
localhost_3000.args = {
    currentUrl: "http://localhost:3000"
};

export const localhost_127_0_0_1__3000 = Template.bind({});
localhost_127_0_0_1__3000.args = {
    currentUrl: "http://127.0.0.1:3000"
};

export const localhost_8080 = Template.bind({});
localhost_8080.args = {
    currentUrl: "http://localhost:8080"
};