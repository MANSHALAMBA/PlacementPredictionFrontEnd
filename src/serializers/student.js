export class Student {
	constructor(student) {
		this.Id = student.id;
		this.name = student.firstName + " " + student.lastName;
		this.rollNumber = student.student.id;
		this.department = student.student.classRoom.department.name;
		this.year =
			new Date().getFullYear() - student.student.classRoom.startYear + 1;
		this.section = student.student.classRoom.section;
	}
}
