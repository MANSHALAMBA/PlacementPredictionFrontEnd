import React from "react";
import { Route, Redirect } from "react-router-dom";

export const Protected = ({ isLoggedIn, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isLoggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/sign-in",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

export const Guest = ({ isLoggedIn, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!isLoggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/",
						state: { from: "/" }
					}}
				/>
			)
		}
	/>
);
