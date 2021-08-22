import { JobModel } from '@back/admin/domain/model/job.model';
import { Job } from '@back/admin/infrastructure/graphql/types/job.gqltype';

export const jobListMapper = () => (jobList: JobModel[]): Job[] =>
  jobList.map((job) => {
    return {
      _id: job._id.value,
      title: job.title.value,
      description: job.description.value,
      url: job.url.value,
    };
  });
