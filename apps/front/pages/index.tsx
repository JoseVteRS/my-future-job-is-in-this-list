import JobCardList from '../components/app/Job/job-card-list';
import JobCreateForm from '../components/app/Job/job-create-form';
import JobTableList from '../components/app/Job/job-table-list';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import SearchJobInput from '../components/ui/common/SearchJobInput';

const source = `
## MarkdownPreview

> todo: React component preview markdown text.
`;

export function Index({ source }) {
  return (
    <>
      <SearchJobInput showMessage={false} />
      <div className="grid grid-cols-5 gap-4 bg-gray-100 rounded-md shadow p-4">
        <div className="col-span-3 bg-gray-200 p-4 rounded">
          <JobTableList />
          {/* <JobCardList /> */}
        </div>
        <div className="col-span-2 bg-gray-200 p-4 rounded">
          <JobCreateForm />
        </div>
      </div>
    </>
  );
}

export default Index;
