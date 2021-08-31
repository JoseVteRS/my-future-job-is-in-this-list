import { useJobs } from 'apps/front/hooks/job/useJob';
import { Column } from 'react-table';
import React, { useMemo, useState } from 'react';
import Table from '../../ui/Tables/Table';
import Badge from '../../ui/Badges/Badge';
import Link from 'next/link';
import PlusIcon from '../../ui/Icons/plus-icon';
import MinusIcon from '../../ui/Icons/minus-icon';
import SearchJobInput from '../../ui/common/SearchJobInput';
import JobUpdateModal from './modals/job-update-modal';
import JobDeleteModal from './modals/job-delete-modal';
import { getUrl } from 'apps/front/next-shared/getUrl';
import JobExtraInformationModal from './modals/job-extra-information-modal';

const JobTableList = () => {
  const [pageCount, setPageCount] = useState(0);
  const { data, loading } = useJobs();
  const [inputValue, setInputValue] = useState(''); // boilerplate React stuff
  const [isInputVisible, setIsInputVisible] = useState(false);

  console.log({inputValue, isInputVisible})

  const columns = useMemo<Column<any>[]>(
    () => [
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <MinusIcon /> : <PlusIcon />}
          </span>
        ),
      },
      {
        Header: 'Titulo',
        accessor: 'title',
        Cell: ({ value }) => <p className="font-medium">{value}</p>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
          <Badge status={value}  />
        ),
      },
      {
        Header: 'URL',
        accessor: 'url',
        Cell: ({ value }) => (
          <Link href={value}>
            <a
              className={`text-blue-300 hover:text-blue-600 capitalize`}
              target={'_blank'}
              rel="noopener noreferrer"
            >
              {getUrl(value, false)}
            </a>
          </Link>
        ),
      },
      {
        Header: 'Acciones',
        accessor: (job) => {
          job.title;
        },
        Cell: (row) => {
          console.log({ row });
          return (
            <>
              <div className="flex items-center justify-start">
                <JobUpdateModal job={row.row.original} />
                <JobDeleteModal job={row.row.original} />
                <JobExtraInformationModal job={row.row.original} />
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      {data.job_list_all.length !== 0 ? (
        <Table
          columns={columns}
          data={data.job_list_all}
          fetchData={async () => console.log('fetchData')}
          pageCount={pageCount || 10}
        />
      ) : (
        <SearchJobInput showMessage />
      )}
    </div>
  );
};

export default JobTableList;
