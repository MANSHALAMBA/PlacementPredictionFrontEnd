export class Lecture {
	constructor(lecture) {
		this.Id = lecture.classRoom.id;

		this.name =
			lecture.classRoom.departmentCode +
			" " +
			lecture.classRoom.section +
			" " +
			lecture.classRoom.startYear +
			" " +
			"Batch";
		this.cousrename = lecture.subject;
	}
}

export class Student {
	constructor(student) {
		this.id = student.user.id;
		this.name = student.user.firstName + " " + student.user.lastName;
		this.rollnumber = student.id;
	}
}
