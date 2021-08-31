import React, { Fragment } from 'react';
import { jobStatusMapper } from '../../../next-shared/job-status-mapper';

const Badge = ({ status }) => {
  return (
    <>
      <div
        className={`${jobStatusMapper[status].bgColor} ${jobStatusMapper[status].textColor} max-w-max px-2 py-1 rounded-full text-sm font-medium`}
      >
        {jobStatusMapper[status].name}
      </div>
    </>
  );
};

export default Badge;
