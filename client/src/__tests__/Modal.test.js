import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import "jest-styled-components";

import Modal from "../components/modal/Modal";

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
});

afterEach(cleanup);
afterEach(() => {
  ReactDOM.createPortal.mockClear();
});

it("renders modal", () => {
  const component = renderer.create(
    <Modal>
      <button>BUTTON</button>
    </Modal>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
