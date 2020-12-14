import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./ErrorBoundary";

// Service worker
import * as serviceWorker from "./common/serviceWorker";

// App
import App from "./App";

//Configure Store
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import { doLogInAction } from "store/actions/auth";

// Storage
import { Storage } from "helpers";
import { USER_TOKEN, LOGGEDIN_USER } from "constants/storage/auth";

// CSS
import "./index.css";

const store = configureStore();

const user = Storage.readJSON(LOGGEDIN_USER),
	token = Storage.read(USER_TOKEN);

if (token && user) {
	store.dispatch(doLogInAction({ user, token }));
}

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
