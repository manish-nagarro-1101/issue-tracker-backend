import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class IssueType {
  @Field(() => ID)
  _id?: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  status!: string;
}

@ObjectType()
export class DeleteIssueResponse {
  @Field()
  _id!: string;

  @Field()
  message!: string;
}

