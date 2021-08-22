import { AggregateRoot } from '@nestjs/cqrs';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VOTitle } from '@back/admin/domain/value-objects/title.vo';
import { VODescription } from '@back/admin/domain/value-objects/description.vo';
import { VOBoolean } from '@shared-kernel/common/domain/value-objects/boolean.vo';
import { VOString } from '@shared-kernel/common/domain/value-objects/string.vo';
import { JobNothingToUpdateException } from '@back/admin/domain/exceptions/job-nothing-to-update.exception';
import { JobCantCheckedException } from '@back/admin/domain/exceptions/job-cant-checked.exception';
import { JobCantUncheckedException } from '@back/admin/domain/exceptions/job-cant-unchecked.exception';
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';

export class JobModel extends AggregateRoot {
  constructor(
    public _id: VOUuid,
    public title: VOTitle,
    public description: VODescription,
    public url: VOString,
    public status: VOStatus,
    public isChecked: VOBoolean
  ) {
    super();
  }

  static build(
    _id: string,
    title: string,
    description: string,
    url: string,
    status: string,
    isChecked: boolean
  ) {
    const job = new JobModel(
      new VOUuid(_id),
      new VOTitle(title),
      new VODescription(description),
      new VOString(url),
      new VOStatus(status),
      new VOBoolean(isChecked || false)
    );
    return job;
  }

  static create(
    jobId: VOUuid,
    title: VOTitle,
    description: VODescription,
    url: VOString,
    status: VOStatus,
    isChecked: VOBoolean
  ) {
    return new JobModel(jobId, title, description, url, status, isChecked);
  }

  public update(title: VOTitle, description: VODescription, url: VOString, status: VOStatus) {
    this._assertDataWillChange(title, description, url);

    this.title = title;
    this.description = description;
    this.url = url;
    this.status = status;
  }

  public checkJob() {
    this._assertJobCheckeable();
    this.isChecked = new VOBoolean(true);
  }

  public uncheckJob() {
    this._assertJobIsNotCheckable();
    this.isChecked = new VOBoolean(false);
  }

  private _assertJobCheckeable() {
    if (this.isChecked.value) throw new JobCantCheckedException();
  }

  private _assertJobIsNotCheckable() {
    if (!this.isChecked.value) throw new JobCantUncheckedException();
  }

  private _assertDataWillChange(
    title: VOTitle,
    description: VODescription,
    url: VOString
  ) {
    const oldData = {
      title: this.title.value,
      description: this.description.value,
      url: this.url.value,
    };

    const newData = {
      title: title.value,
      description: description.value,
      url: url.value,
    };

    if (JSON.stringify(oldData) === JSON.stringify(newData))
      throw new JobNothingToUpdateException();
  }
}
