import { JobModel } from '@back/admin/domain/model/job.model';
import { IRepository } from '@shared-kernel/common/domain/interfaces/repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';

export interface IJobRepository extends IRepository<JobModel> {
  create(job: JobModel): Promise<boolean>;

  update(job: JobModel): Promise<boolean>;

  markCheckedJob(jobId: VOUuid): Promise<void>;

  markNotCheckedJob(jobId: VOUuid): Promise<void>;

  findAll(): Promise<JobModel[]>;

  findById(jobId: VOUuid): Promise<JobModel>;

  delete(jobId: VOUuid): Promise<boolean>;
}
