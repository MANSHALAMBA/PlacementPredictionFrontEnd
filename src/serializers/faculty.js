export class Faculty {
	constructor(faculty) {
		this.Id = faculty.id;
		this.name = faculty.firstName + " " + faculty.lastName;

		this.department = faculty.department.name;
	}
}
