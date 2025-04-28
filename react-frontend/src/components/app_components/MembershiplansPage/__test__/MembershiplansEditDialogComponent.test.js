import React from "react";
import { render, screen } from "@testing-library/react";

import MembershiplansEditDialogComponent from "../MembershiplansEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders membershiplans edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MembershiplansEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("membershiplans-edit-dialog-component")).toBeInTheDocument();
});
