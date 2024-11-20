import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Issue } from "../models/Issue";
import { DeleteIssueResponse, IssueType } from "../types/IssueType";
import { IIssue } from "../models/Issue";

@Resolver()
export class IssueResolver {
	@Query(() => [IssueType])
	async issues(): Promise<IIssue[]> {
		console.log("Get call ::::");
		return await Issue.find();
	}

	@Mutation(() => IssueType)
	async addIssue(
		@Arg("title") title: string,
		@Arg("description") description: string,
		@Arg("status") status: string
	): Promise<IIssue> {
		console.log("Add request received: ", title, description, status);
		const issue = new Issue({ title, description, status });
		await issue.save();
		return issue;
	}

	@Mutation(() => IssueType, { nullable: true })
	async updateIssue(
        @Arg('id', () => ID) id: string,
		@Arg("title", { nullable: true }) title?: string,
		@Arg("description", { nullable: true }) description?: string,
		@Arg("status", { nullable: true }) status?: string
	): Promise<IIssue | null> {
		console.log("Update request received: ", id, title, description, status);

		const issue = await Issue.findById(id);
		if (!issue) {
			throw new Error("Issue not found");
		}

		// Update only provided fields
		if (title !== undefined) {
			issue.title = title;
		}
		if (description !== undefined) {
			issue.description = description;
		}
		if (status !== undefined) {
			issue.status = status;
		}

		await issue.save();
		return issue;
	}

	@Mutation(() => DeleteIssueResponse, { nullable: true })
	async deleteIssue(
        @Arg('id', () => ID) id: string
	): Promise<{ _id: string; message: string } | null> {
		console.log("Delete request received: ", id);

		const issue = await Issue.findById(id);
		if (!issue) {
			throw new Error("Issue not found");
		}

		await Issue.deleteOne({ _id: id });
		return { _id: id, message: "Issue deleted successfully" };
	}
}
