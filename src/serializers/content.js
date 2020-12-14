export class Content {
	constructor(content) {
		this.id = content.id;
		this.title = content.title;
		this.description = content.description;
		this.type = content.type;
		this.url = content.url;
		this.fileurl = content.file;
		this.groups = content.groups.map(group => {
			return group.name;
		});

		this.lectures = content.lectures.map(lecture => {
			return (
				lecture.classRoom.departmentCode +
				" " +
				lecture.classRoom.section +
				" " +
				lecture.classRoom.startYear +
				" Batch"
			);
		});
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
