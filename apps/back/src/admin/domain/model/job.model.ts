import { AggregateRoot } from '@nestjs/cqrs';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VOTitle } from '@back/admin/domain/value-objects/title.vo';
import { VODescription } from '@back/admin/domain/value-objects/description.vo';
import { VOString } from '@shared-kernel/common/domain/value-objects/string.vo';
import { JobNothingToUpdateException } from '@back/admin/domain/exceptions/job-nothing-to-update.exception';
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';
import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';

export class JobModel extends AggregateRoot {
  constructor(
    public _id: VOUuid,
    public title: VOTitle,
    public description: VODescription | null,
    public extraInformation: VOExtraInformation | null,
    public url: VOString | null,
    public status: VOStatus | null
  ) {
    super();
  }

  static build(
    _id: string,
    title: string,
    description: string,
    extraInformation: string,
    url: string,
    status: string
  ) {
    return new JobModel(
      new VOUuid(_id),
      new VOTitle(title),
      new VODescription(description),
      new VOExtraInformation(extraInformation),
      new VOString(url),
      new VOStatus(status || JobStatusEnum.NO_SENDED)
    );
  }

  static create(
    jobId: VOUuid,
    title: VOTitle,
    description: VODescription,
    extraInformation: VOExtraInformation,
    url: VOString,
    status: VOStatus
  ) {
    return new JobModel(
      jobId,
      title,
      description,
      extraInformation,
      url,
      status
    );
  }

  public update(
    title: VOTitle,
    description: VODescription,
    extraInformation: VOExtraInformation,
    url: VOString
  ) {
    this._assertDataWillChange(title, description, extraInformation, url);

    this.title = title;
    this.description = description;
    this.extraInformation = extraInformation;
    this.url = url;
  }


  public updateExtraInformation(
    extraInformation: VOExtraInformation,
  ) {
    this._assertCanChangeExtraInformation(extraInformation);
    this.extraInformation = extraInformation;
  }

  public changeStatusJob(status: VOStatus) {
    this._assertCanChangeStatus(status);
    this.status = status;
  }

  private _assertCanChangeStatus(status: VOStatus) {
    const oldStatus = this.status.value;
    const newStatus = status.value;
    if (oldStatus === newStatus) throw new JobNothingToUpdateException();
  }

  private _assertCanChangeExtraInformation(extraInfo: VOExtraInformation) {
    const oldInfo = this.extraInformation.value;
    const newInfo = extraInfo.value;
    if (oldInfo === newInfo) throw new Error('NOTHING_TO_UPDATE');
  }

  private _assertDataWillChange(
    title: VOTitle,
    description: VODescription,
    extraInformation: VOExtraInformation,
    url: VOString
  ) {
    const oldData = {
      title: this.title.value,
      description: this.description.value,
      extraInformation: this.extraInformation.value,
      url: this.url.value,
    };

    const newData = {
      title: title.value,
      description: description.value,
      extraInformation: extraInformation.value,
      url: url.value,
    };

    if (JSON.stringify(oldData) === JSON.stringify(newData))
      throw new JobNothingToUpdateException();
  }
}
