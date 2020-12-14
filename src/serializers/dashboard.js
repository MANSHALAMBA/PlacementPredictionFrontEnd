export class DashboardData {
	constructor(data) {
		this.content = data.content;

		this.quizzes = data.quiz;
		this.engagement = data.engagement;
		this.noOfProjects = data.project.completion.length;
		this.projectGraphLabels = data.project.completion.map(project => {
			return project.label;
		});
		this.projectGraphValues = data.project.completion.map(project => {
			return project.value;
		});
		this.studentCompositionLabels = data.student.score.map(element => {
			return element.label;
		});
		this.studentCompositionValues = data.student.score.map(element => {
			return element.value;
		});
		this.studentCompositionAvgScore = data.student.score.map(element => {
			return element.avgScore;
		});
		this.skillCompositionLabels = data.skills.composition.map(element => {
			return element.label;
		});
		this.skillCompositionValues = data.skills.composition.map(element => {
			return element.value;
		});
		this.weaknesses = data.skills.weakness;
		this.overdueMilestones = data.project.overdue;
	}
}
