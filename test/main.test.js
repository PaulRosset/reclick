import React from "react";
import Reclick from "../lib/ReClick";
import {
  renderIntoDocument,
  cleanup,
  render,
  fireEvent,
  Simulate
} from "react-testing-library";
import ReactTestRenderer from "react-test-renderer";

let component;
let source;
let ShotRenderer;

describe("Simple rendering", () => {
  beforeAll(() => {
    component = render(
      <Reclick>
        <button source="true">Click me</button>
        <div destination="true">
          <a>Item 1</a>
          <a>Item 2</a>
          <a>Item 3</a>
        </div>
      </Reclick>
    );
    source = component.getByText("Click me");
  });

  test("Normal rendering", () => {
    expect(source.textContent).toEqual("Click me");
    expect(component.queryByText("Item 1")).toBeNull();
  });

  test("Normal rendering when Clicking on source", () => {
    Simulate.click(source);
    const destination = component.queryByText("Item 1");
    expect(destination).not.toBeNull();
  });

  test("Testing onKeyDown 13 to close menu", () => {
    Simulate.keyDown(source, { keyCode: 13 });
    const destination = component.queryByText("Item 1");
    expect(destination).toBeNull();
  });

  test("Testing Toggle on Source, expect to open then close", () => {
    const destinationInitState = component.queryByText("Item 1");
    expect(destinationInitState).toBeNull();
    Simulate.click(source);
    const destinationSecondState = component.queryByText("Item 1");
    expect(destinationSecondState).not.toBeNull();
  });

  describe("render in document Body testing", () => {
    afterEach(cleanup);

    test("Testing onClick on Source", () => {
      const { getByText, queryByText } = renderIntoDocument(
        <Reclick>
          <button source="true">Click me</button>
          <div destination="true">
            <a>Item 1</a>
            <a>Item 2</a>
            <a>Item 3</a>
          </div>
        </Reclick>
      );
      expect(queryByText("Item 1")).toBeNull();
      fireEvent(
        getByText("Click me"),
        new MouseEvent("click", {
          bubbles: true
        })
      );
      expect(queryByText("Item 1")).not.toBeNull();
    });
  });

  describe("Snapshot Testing", () => {
    beforeAll(() => {
      ShotRenderer = ReactTestRenderer.create(
        <Reclick>
          <button source="true">Click me</button>
          <div destination="true">
            <a>Item 1</a>
            <a>Item 2</a>
            <a>Item 3</a>
          </div>
        </Reclick>
      );
    });

    test("Snapshot testing onMount", () => {
      expect(ShotRenderer.toJSON()).toMatchSnapshot();
    });

    test("Snapshot testing onClick Source", () => {
      ShotRenderer.root.findByType("button").props.onClick();
      expect(ShotRenderer.toJSON()).toMatchSnapshot();
    });

    test("Snapshot testing onClick Destination", () => {
      ShotRenderer.root.findByType("button").props.onClick();
      expect(ShotRenderer.toJSON()).toMatchSnapshot();
    });
  });
});
