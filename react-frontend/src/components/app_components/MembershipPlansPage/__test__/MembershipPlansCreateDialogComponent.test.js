import React from "react";
import { render, screen } from "@testing-library/react";

import MembershipPlansCreateDialogComponent from "../MembershipPlansCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders membershipPlans create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MembershipPlansCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("membershipPlans-create-dialog-component")).toBeInTheDocument();
});
