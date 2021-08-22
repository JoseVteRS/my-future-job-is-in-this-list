import { Document } from 'mongoose';

export interface IJob {
  _id: string;
  title: string;
  description: string;
  url: string;
  status: string;
  isChecked: boolean;
}

export interface IJobDoc extends IJob, Omit<Document, '_id'> {}
