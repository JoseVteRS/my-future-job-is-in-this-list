import { Document } from 'mongoose';

export interface IJob {
  _id: string;
  title: string;
  description: string;
  extraInformation: string;
  url: string;
  status: string;
}

export interface IJobDoc extends IJob, Omit<Document, '_id'> {}
