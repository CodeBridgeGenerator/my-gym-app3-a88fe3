import React from "react";
import { render, screen } from "@testing-library/react";

import RenewalLogsPage from "../RenewalLogsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders renewalLogs page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RenewalLogsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("renewalLogs-datatable")).toBeInTheDocument();
    expect(screen.getByRole("renewalLogs-add-button")).toBeInTheDocument();
});
