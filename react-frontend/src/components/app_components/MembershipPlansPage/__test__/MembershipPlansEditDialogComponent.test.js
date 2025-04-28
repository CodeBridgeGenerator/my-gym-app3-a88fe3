import React from "react";
import { render, screen } from "@testing-library/react";

import MembershipPlansEditDialogComponent from "../MembershipPlansEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders membershipPlans edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MembershipPlansEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("membershipPlans-edit-dialog-component")).toBeInTheDocument();
});
