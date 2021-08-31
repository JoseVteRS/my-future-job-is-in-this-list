import { Job } from '@back/admin/infrastructure/graphql/types/job.gqltype';
import { JobModel } from '@back/admin/domain/model/job.model';

export const jobItemMapper = (job: JobModel): Job => {
  return {
    _id: job._id.value,
    title: job.title.value,
    description: job.description.value,
    extraInformation: job.extraInformation.value,
    url: job.url.value,
    status: job.status.value,
  };
};
