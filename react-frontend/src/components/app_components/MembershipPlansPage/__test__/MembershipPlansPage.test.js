import React from "react";
import { render, screen } from "@testing-library/react";

import MembershipPlansPage from "../MembershipPlansPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders membershipPlans page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MembershipPlansPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("membershipPlans-datatable")).toBeInTheDocument();
    expect(screen.getByRole("membershipPlans-add-button")).toBeInTheDocument();
});
