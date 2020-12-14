const initialState = {
	quizlistTabledata: []
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "PUSH QUIZLIST DATA":
			return {
				quizlistTabledata: [...action.data]
			};
			break;
		case "UPDATE SCHEDULE STATUS":
			let quizlistTabledata = [...state.quizlistTabledata];
			quizlistTabledata = quizlistTabledata.map(quiz => {
				if (quiz.id === action.quizId) {
					quiz.schedulingStatus = action.updatedStatus;
					quiz.schedule = action.startdate;
					quiz.expiry = action.enddate;
				}
				return quiz;
			});
			return {
				quizlistTabledata: quizlistTabledata
			};
			break;
		case "PUSH NEW QUIZ":
			let quizlistTabledata3 = [...state.quizlistTabledata];
			quizlistTabledata3.push(action.newquiz);
			return {
				quizlistTabledata: quizlistTabledata3
			};
			break;
		case "UPDATE NUMBER OF QUESTIONS":
			let quizlistTabledata2 = [...state.quizlistTabledata];
			quizlistTabledata2 = quizlistTabledata2.map(quiz => {
				if (quiz.id === action.quizId) {
					++quiz.numberOfQuestions;
				}
				return quiz;
			});
			return {
				quizlistTabledata: quizlistTabledata2
			};
			break;
		case "DECREMENT NUMBER OF QUESTIONS":
			let quizlistTabledata4 = [...state.quizlistTabledata];
			quizlistTabledata4 = quizlistTabledata4.map(quiz => {
				if (quiz.id === action.quizId) {
					--quiz.numberOfQuestions;
				}
				return quiz;
			});
			return {
				quizlistTabledata: quizlistTabledata4
			};
			break;
		case "PUSH QUIZ TO QUIZ LIST":
			let QuizlistTabledata = [...state.quizlistTabledata];
			QuizlistTabledata.push(action.quiz);
			return {
				quizlistTabledata: QuizlistTabledata
			};
			break;
		case "UPDATE END DATE":
			let quizlistTabledata5 = [...state.quizlistTabledata];
			quizlistTabledata5 = quizlistTabledata5.map(quiz => {
				let Quiz;
				if (quiz.id === action.quizId) {
					Quiz = {
						expiry: action.updatedDate,
						...quiz
					};
				} else {
					Quiz = {
						...quiz
					};
				}

				return Quiz;
			});
			return {
				quizlistTabledata: quizlistTabledata5
			};
			break;
		default:
			return state;
	}
};

export default reducer;
