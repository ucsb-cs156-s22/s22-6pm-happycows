import React from 'react';

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
//import { reviewsFixtures } from 'fixtures/reviewsFixtures';

export default {
    title: 'components/Reviews/ReviewsTable',
    component: ReviewsTable
};

const Template = (args) => {
    return (
        <ReviewsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    reviews: []
};

export const ThreeReviews = Template.bind({});

ThreeReviews.args = {
    reviews: reviewsFixtures.threeReviews
};


