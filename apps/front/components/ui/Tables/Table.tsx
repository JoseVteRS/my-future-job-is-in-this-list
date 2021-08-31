import React, { useCallback, useEffect } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import SortAscendingIcon from '../Icons/sort-ascending-icon';
import SortDescendingIcon from '../Icons/sort-descending-icon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  data: any[];
  fetchData: (pageIndex: number) => Promise<any>;
  columns: any[];
  pageCount: number;
};

const Table = ({
  data,
  fetchData,
  columns,
  pageCount: controlledPageCount,
}: Props) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    useExpanded
  );

  const {
    canPreviousPage,
    canNextPage,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = tableInstance;

  useEffect(() => {
    fetchData(pageIndex);
  }, [pageIndex, fetchData]);

  //TODO: Refactor this component
  const renderRowSubComponent = useCallback(({ row }) => {
    return (
      <>
        <div>
          <div className="text-gray-500">{row.original.description}</div>
          {row.original.extraInformation ? (
            <div className="bg-gray-200 p-2 rounded my-2">
              <div className='mark-container'>
                <ReactMarkdown plugins={[remarkGfm]}>
                  {row.original.extraInformation}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }, []);

  return (
    <>
      <div className="w-full ">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-3"
                  >
                    <div className="flex items-center justify-between w-full">
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <SortDescendingIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <SortAscendingIcon className="h-5 w-5 text-gray-500" />
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-gray-100">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()} className="text-gray-700">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-3 text-md border"
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td
                        colSpan={visibleColumns.length}
                        className="px-4 py-3 text-md border"
                      >
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
