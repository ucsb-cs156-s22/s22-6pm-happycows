import React from 'react';

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import userCommonsFixtures from 'fixtures/userCommonsFixtures';

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
    leaderboardUsers: userCommonsFixtures.oneUserCommons
};

export const ThreeUserCommons = Template.bind({});

ThreeUserCommons.args = {
    leaderboardUsers: userCommonsFixtures.threeUserCommons
};

export const FiveUserCommons = Template.bind({});

FiveUserCommons.args = {
    leaderboardUsers: userCommonsFixtures.fiveUserCommons
};

export const TenUserCommons = Template.bind({});

TenUserCommons.args = {
    leaderboardUsers: userCommonsFixtures.tenUserCommons
};


