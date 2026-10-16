import { describe, expect, it } from "vitest";
import { mentalTabs, resultForScore, shuffleTabs } from "@/lib/tabs";

describe("23 Tabs", () => {
  it("has one correct filing for every tab", () => {
    const answers = new Set(mentalTabs.map((tab) => tab.answer));
    expect(mentalTabs).toHaveLength(8);
    expect(answers).toEqual(new Set(["keep", "shape", "close"]));
    expect(new Set(mentalTabs.map((tab) => tab.id)).size).toBe(mentalTabs.length);
  });

  it("shuffles without dropping or duplicating tabs", () => {
    let n = 0;
    const random = () => {
      n += 1;
      return (n % 3) / 3;
    };
    const shuffled = shuffleTabs(mentalTabs, random);
    expect(shuffled.map((tab) => tab.id).sort()).toEqual(mentalTabs.map((tab) => tab.id).sort());
    expect(shuffled.map((tab) => tab.id).join()).not.toBe(mentalTabs.map((tab) => tab.id).join());
  });

  it("names the score in three bands", () => {
    expect(resultForScore(8, 8).title).toBe("Clear head");
    expect(resultForScore(4, 8).title).toBe("A few tabs still open");
    expect(resultForScore(2, 8).title).toBe("The tabs won this round");
  });
});
