import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { SchemasEnum } from '@back/config/monodb/enums/schemas.enum';
import { Model } from 'mongoose';
import {
  IJob,
  IJobDoc,
} from '@back/config/monodb/interfaces/job-doc.interface';
import { JobModel } from '@back/admin/domain/model/job.model';
import { JobNotFoundException } from '@back/admin/domain/exceptions/job-not-found.exception';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';

export class JobMongoRepository implements IJobRepository {
  constructor(
    @InjectModel(SchemasEnum.JOB)
    private readonly jobMongoModel: Model<IJobDoc>
  ) {}

  toDomain(persistanceEntity: IJob): JobModel {
    const {
      _id,
      title,
      description,
      url,
      status,
      isChecked,
    } = persistanceEntity;
    return JobModel.build(_id, title, description, url, status, isChecked);
  }

  toPersistence(domainEntity: JobModel): IJob {
    const { _id, title, description, url, status, isChecked } = domainEntity;
    return {
      _id: _id.value,
      title: title.value,
      description: description.value,
      url: url.value,
      status: status.value,
      isChecked: isChecked.value,
    };
  }

  async create(job: JobModel): Promise<boolean> {
    const persistentJob = this.toPersistence(job);
    await this.jobMongoModel.create(persistentJob);
    return true;
  }

  async findAll(): Promise<JobModel[]> {
    const persitentJob = await this.jobMongoModel.find().exec();
    return persitentJob.map((job) => {
      return this.toDomain(job);
    });
  }

  async findById(jobId: VOUuid): Promise<JobModel> {
    const existingJob = await this.jobMongoModel.findById(jobId).exec();
    if (!existingJob) throw new JobNotFoundException();
    return this.toDomain(existingJob);
  }

  async update(job: JobModel): Promise<boolean> {
    const persistentJob = this.toPersistence(job);
    const { _id, ...rest } = persistentJob;
    await this.jobMongoModel.findByIdAndUpdate(_id, rest).exec();
    return true;
  }

  async markCheckedJob(jobId: VOUuid): Promise<void> {
    await this.findById(jobId);
    await this.jobMongoModel
      .findByIdAndUpdate(jobId, { isChecked: true })
      .exec();
  }

  async markNotCheckedJob(jobId: VOUuid): Promise<void> {
    await this.findById(jobId);
    await this.jobMongoModel
      .findByIdAndUpdate(jobId, { isChecked: false })
      .exec();
  }

  async delete(jobId: VOUuid): Promise<boolean> {
    await this.findById(jobId);
    await this.jobMongoModel.findByIdAndRemove(jobId).exec();
    return true;
  }
}
