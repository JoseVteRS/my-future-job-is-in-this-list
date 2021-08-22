import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  /** Job's description */
  @Prop({ type: String, required: false })
  url: string;

  /** Job's description */
  @Prop({ type: String, required: false })
  status: string;

  /** Job's state */
  @Prop({ type: Boolean, required: false, default: false })
  isChecked: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.index({ title: 1 });
