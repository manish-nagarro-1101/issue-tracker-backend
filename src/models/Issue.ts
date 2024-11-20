import mongoose, { Schema, Document } from 'mongoose';

export interface IIssue extends Document {
  title: string;
  description: string;
  status: string;
}

const IssueSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'inprogress','closed'], default: 'open' }
});

export const Issue = mongoose.model<IIssue>('Issue', IssueSchema);
