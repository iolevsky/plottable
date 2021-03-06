import * as d3 from "d3";

import { assert } from "chai";

import * as Plottable from "../../src";

import * as TestMethods from "../testMethods";

describe("Drawers", () => {
  describe("Arc Drawer", () => {
    it("has a stroke of \"none\"", () => {
      const drawer = new Plottable.Drawers.Arc(null);
      const svg = TestMethods.generateSVG();
      drawer.renderArea(svg);

      const data = [["A", "B", "C"]]; // arc normally takes single array of data
      const drawSteps: Plottable.Drawers.DrawStep[] = [
        {
          attrToProjector: {},
          animator: new Plottable.Animators.Null(),
        },
      ];
      drawer.draw(data, drawSteps);

      assert.strictEqual(drawer.selection().style("stroke"), "none");

      svg.remove();
    });
  });
});
