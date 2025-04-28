import React from "react";
import { render, screen } from "@testing-library/react";

import MembershiplansPage from "../MembershiplansPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders membershiplans page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MembershiplansPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("membershiplans-datatable")).toBeInTheDocument();
    expect(screen.getByRole("membershiplans-add-button")).toBeInTheDocument();
});
