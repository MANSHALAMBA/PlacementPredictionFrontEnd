const initialState = {
	projectlistTabledata: []
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "PUSH PROJECTLIST DATA":
			return {
				projectlistTabledata: action.data
			};
			break;
		case "UPDATE REVIEW":
			let projectlistTabledata = [...state.projectlistTabledata];
			projectlistTabledata = projectlistTabledata.map(project => {
				if (project.id === action.projectId) {
					let updatedProject = { ...project };

					updatedProject.milestones = updatedProject.milestones.map(
						milestone => {
							if (milestone.id === action.milestoneId) {
								let updatedmilestone = { ...milestone };
								updatedmilestone.submissions = updatedmilestone.submissions.map(
									submission => {
										if (submission.id === action.submissionId) {
											let updatedSubmission = { ...submission };
											updatedSubmission.status = action.updatedReview.status;
											updatedSubmission.remark = action.updatedReview.remark;
											return updatedSubmission;
										} else {
											return submission;
										}
									}
								);

								return updatedmilestone;
							} else {
								return milestone;
							}
						}
					);

					return updatedProject;
				} else {
					return project;
				}
			});
			return {
				projectlistTabledata: projectlistTabledata
			};
			break;

		case "PUSH PROJECT TO PROJECT LIST":
			let ProjectlistTabledata = [...state.projectlistTabledata];
			ProjectlistTabledata.push(action.project);
			return {
				projectlistTabledata: ProjectlistTabledata
			};
			break;

		default:
			return state;
	}
};

export default reducer;
