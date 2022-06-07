import React from 'react';

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import leaderboardFixtures from 'fixtures/leaderboardFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Leaderboard/LeaderboardTable',
    component: LeaderboardTable
};

const Template = (args) => {
    return (
        <LeaderboardTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    leaderboardUsers: []
};

export const OneUserCommons = Template.bind({});

OneUserCommons.args = {
    leaderboardUsers: leaderboardFixtures.oneUserCommonsLB
};

export const ThreeUserCommons = Template.bind({});

ThreeUserCommons.args = {
    leaderboardUsers: leaderboardFixtures.threeUserCommonsLB

};

export const ThreeUserCommonsAdmin = Template.bind({});

ThreeUserCommonsAdmin.args = {
    leaderboardUsers: leaderboardFixtures.threeUserCommonsLB,
    currentUser: currentUserFixtures.adminUser

};

export const FiveUserCommons = Template.bind({});

FiveUserCommons.args = {
    leaderboardUsers: leaderboardFixtures.fiveUserCommonsLB
};


export const FiveUserCommonsAdmin = Template.bind({});

FiveUserCommonsAdmin.args = {
    leaderboardUsers: leaderboardFixtures.fiveUserCommonsLB,
    currentUser: currentUserFixtures.adminUser

};

export const TenUserCommons = Template.bind({});

TenUserCommons.args = {
    leaderboardUsers: leaderboardFixtures.tenUserCommonsLB
};


