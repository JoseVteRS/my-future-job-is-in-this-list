import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';
import { JobModel } from '@back/admin/domain/model/job.model';
import { IRepository } from '@shared-kernel/common/domain/interfaces/repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';

export interface IJobRepository extends IRepository<JobModel> {
  create(job: JobModel): Promise<boolean>;

  update(job: JobModel): Promise<boolean>;

  updateExtraInformation(jobId: VOUuid, extraInformation: VOExtraInformation): Promise<boolean>

  findAll(): Promise<JobModel[]>;

  findById(jobId: VOUuid): Promise<JobModel>;

  changeStatusJob(jobId: VOUuid, status: VOStatus): Promise<boolean>;

  delete(jobId: VOUuid): Promise<boolean>;
}
