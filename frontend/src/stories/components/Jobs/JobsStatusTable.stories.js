import React from 'react';

import JobsStatusTable from "main/components/Jobs/JobsStatusTable";
import { jobsStatusFixtures } from 'fixtures/jobsStatusFixtures';

export default {
    title: 'components/jobs/JobsStatusTable',
    component: JobsStatusTable
};

const Template = (args) => {
    return (
        <JobsStatusTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    jobs: []
};

export const OneJob = Template.bind({});

OneJob.args = {
    jobs: [ jobsStatusFixtures.oneJob ]
};




