import moment from "moment";

export class Project {
	constructor(project) {
		this.id = project.id;
		this.title = project.title;
		this.description = project.description;
		this.skills = project.tags.map(tag => {
			return {
				id: tag.id,
				skill: tag.tag
			};
		});
		this.faculties = project.faculties;
		this.teamMembers = project.users;
		this.team = project.users.map(user => {
			return {
				name: user.firstName + " " + user.lastName,
				id: user.id
			};
		});
		this.milestones = project.milestones.map(milestone => {
			return {
				id: milestone.id,
				title: milestone.title,
				description: milestone.description,
				deadline: moment(milestone.deadline).calendar(),
				submissions: this.serializeSubmissions(milestone.milestoneSubmissions)
			};
		});
	}

	serializeSubmissions = submissions => {
		let Submissions = submissions.map(submission => {
			return {
				id: submission.id,
				summary: submission.summary,
				status: submission.status,
				remark: submission.remark,
				file: submission.file,
				url: submission.url
			};
		});
		return Submissions;
	};
}

export class Message {
	constructor(message) {
		this.text = message.text;
		this.createdAt = moment(message.createdAt).calendar();
		this.senderId = message.creatorId;
		this.sender = this.resolveSender(
			message.creator,
			message.faculty,
			message.user
		);
	}

	resolveSender = (creator, faculty, user) => {
		switch (creator) {
			case "user":
				return user.firstName + " " + user.lastName;
				break;
			case "faculty":
				return faculty.title + faculty.firstName + " " + faculty.lastName;
		}
	};
}
