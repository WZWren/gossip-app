import React from "react";
import { useRouteError } from "react-router-dom";

/**
 * The Error Page. This is implemented directly under the root as its default
 * error handling page.
 */
const ErrorPage: React.FC = () => {
    const error = useRouteError() as Response;
    console.error(error);
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i> { error.status + ": " + error.statusText } </i>
            </p>
        </div>
    );
};

export default ErrorPage;