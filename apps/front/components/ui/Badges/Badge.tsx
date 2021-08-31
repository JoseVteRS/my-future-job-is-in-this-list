import React from 'react';

const Badge = () => {
  return (
    <div
      className={`${jobStatusMapper[job.status].bgColor} ${
        jobStatusMapper[job.status].textColor
      } max-w-max px-2 py-1 rounded-full text-sm font-medium`}
    >
      {jobStatusMapper[job.status].name}
    </div>
  );
};

export default Badge;
