import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';
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
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';

export class JobMongoRepository implements IJobRepository {
  constructor(
    @InjectModel(SchemasEnum.JOB)
    private readonly jobMongoModel: Model<IJobDoc>
  ) { }

  toDomain(persistanceEntity: IJob): JobModel {
    const {
      _id,
      title,
      description,
      extraInformation,
      url,
      status,
    } = persistanceEntity;
    return JobModel.build(
      _id,
      title,
      description,
      extraInformation,
      url,
      status
    );
  }

  toPersistence(domainEntity: JobModel): IJob {
    const {
      _id,
      title,
      description,
      extraInformation,
      url,
      status,
    } = domainEntity;
    return {
      _id: _id.value,
      title: title.value,
      description: description.value,
      extraInformation: extraInformation.value,
      url: url.value,
      status: status.value,
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

  async updateExtraInformation(jobId: VOUuid, extraInformation: VOExtraInformation): Promise<boolean> {
    await this.jobMongoModel.findByIdAndUpdate(jobId, { extraInformation: extraInformation.value });
    return true;
  }

  async changeStatusJob(jobId: VOUuid, status: VOStatus): Promise<boolean> {
    await this.findById(jobId);
    await this.jobMongoModel
      .findByIdAndUpdate(jobId, { status: status.value })
      .exec();
    return true;
  }

  async delete(jobId: VOUuid): Promise<boolean> {
    await this.findById(jobId);
    await this.jobMongoModel.findByIdAndRemove(jobId).exec();
    return true;
  }
}
