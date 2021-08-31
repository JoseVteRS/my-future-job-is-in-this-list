import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Job {
  @Prop({ type: String, required: true })
  _id: string;

  /** Job's title */
  @Prop({ type: String, required: true, unique: false, index: true })
  title: string;

  /** Job's description */
  @Prop({ type: String, required: false })
  description: string;

  /** Job's extra information */
  @Prop({ type: String, required: false })
  extraInformation: string;

  /** Job's url */
  @Prop({ type: String, required: false })
  url: string;

  /** Job's status */
  @Prop({ type: String, required: false, enum: JobStatusEnum })
  status: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.index({ title: 1 });
