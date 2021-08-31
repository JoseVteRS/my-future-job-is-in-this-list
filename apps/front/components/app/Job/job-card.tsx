import Link from 'next/link';
import React from 'react';
import Badge from '../../ui/Badges/Badge';
import domainList from '../../../next-shared/domain-list';

const JobCard = ({ job }) => {
  const getUrl = function (url: string) {
    const domain = url.split('.');
    console.log(domain)
    if (domainList.includes(domain[1].toLowerCase())) {
      console.log({ domain, domain1: domain[1], domain2: domain[2] });
      return domain[0];
    } else {
      console.log({ domain, domain1: domain[1], domain2: domain[2] });
      return domain[1];
    }
  };

  return (
    <div key={job._id} className={`bg-gray-100 my-2 p-4 shadow`}>
      <div className="flex space-x-2">
        <Badge status={job.status} />

        <Link href={job.url}>
          <a
            className={`text-blue-500 hover:text-blue-600 hover:underline capitalize`}
            target={'_blank'}
          >
            {getUrl(job.url)}
          </a>
        </Link>
      </div>

      <h3 className={`text-xl font-bold`}>{job.title}</h3>
      {job.description ? <div>{job.description}</div> : <></>}

      <div className={`bg-gray-200 p-3 my-3 rounded`}>
        {job.extraInformation}
        <div>
          <button
            className={`bg-gray-300 hover:bg-gray-400 rounded p-1 font-medium`}
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
