import validate from "validate.js";

import moment from "moment";

validate.extend(validate.validators.datetime, {
	// The value is guaranteed not to be null or undefined but otherwise it
	// could be anything.
	parse: function(value, options) {
		return +moment.utc(value);
	},
	// Input is a unix timestamp
	format: function(value, options) {
		var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
		return moment.utc(value).format(format);
	}
});

export class Quiz {
	constructor(quiz) {
		this.id = quiz.id;
		this.title = quiz.title;
		this.skills = quiz.tags;
		this.numberOfQuestions = Number(quiz.noOfQuestions);
		this.schedulingStatus = this.getSchedulingStatus(quiz);

		this.schedule = moment(quiz.schedule).format("D/M/YYYY");
		this.expiry = moment(quiz.expiry).format("D/M/YYYY");
	}

	getSchedulingStatus(quiz) {
		let a = 0;

		let error = validate(quiz.expiry, {
			expiry: {
				datetime: {
					earliest: moment.utc(),
					message: "Expired"
				}
			}
		});

		if (quiz.isActive && quiz.schedule && error) {
			a = 3;
			return a;
		} else if (quiz.isActive && quiz.schedule) {
			a = 1;
			return a;
		} else if (!quiz.isActive && quiz.schedule) {
			a = 2;
			return a;
		} else if (!quiz.expiry) {
			a = 0;
			return a;
		} else {
			return a;
		}
	}
}

export class Quizdetail {
	constructor(quiz) {
		this.title = quiz.title;
		this.skills = quiz.tags.map(tag => {
			return tag.tag;
		});
		this.numberOfQuestions = quiz.questions.length;
		this.estimatedTime = quiz.timeToComplete;
		this.Questions = quiz.questions.map(question => {
			return {
				questiontitle: question.question,
				difficultyLevel: question.level,
				skills: question.tags.map(tag => {
					return tag.tag;
				}),
				id: question.id,
				options: question.options
			};
		});
	}
}

export class Question {
	constructor(question) {
		this.questiontitle = question.question;
		this.difficultyLevel = question.level;
		this.skills = question.tags.map(tag => {
			return tag.tag;
		});
		this.id = question.id;
		this.options = question.options;
	}
}

export class StudentGroup {
	constructor(group) {
		this.type = "group";
		this.id = group.id;

		this.name = group.name;
	}
}

export class Lecture {
	constructor(lecture) {
		this.type = "lecture";
		this.id = lecture.id;

		this.name =
			lecture.classRoom.departmentCode +
			" " +
			lecture.classRoom.section +
			" " +
			lecture.classRoom.startYear +
			" " +
			"Batch";
	}
}
