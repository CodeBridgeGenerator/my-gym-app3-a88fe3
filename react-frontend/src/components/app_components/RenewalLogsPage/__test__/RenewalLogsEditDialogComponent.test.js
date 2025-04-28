import React from "react";
import { render, screen } from "@testing-library/react";

import RenewalLogsEditDialogComponent from "../RenewalLogsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders renewalLogs edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RenewalLogsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("renewalLogs-edit-dialog-component")).toBeInTheDocument();
});
