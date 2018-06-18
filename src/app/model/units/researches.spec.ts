import { Researches } from "./researches";
import { Game } from "../game";
import { FullUnit } from "../full-unit";
import { EventEmitter } from "@angular/core";

describe("Researches", () => {
  const science = new FullUnit("scie", "Science", "Science");
  const game = new Game(new EventEmitter<number>(), new EventEmitter<string>());

  it("should create an instance", () => {
    const researchEmitter: EventEmitter<string> = new EventEmitter<string>();

    expect(new Researches(researchEmitter)).toBeTruthy();
  });
  describe("Save", () => {
    // const science = new FullUnit("scie", "Science", "Science");
    const researchEmitter: EventEmitter<string> = new EventEmitter<string>();

    const res1 = new Researches(researchEmitter);
    res1.declareStuff();
    res1.setRelations(science, game);
    res1.team2.unlocked = true;
    res1.team2.done = true;
    res1.team2.quantity = new Decimal(1);
    res1.team2.complete = true;

    const res2 = new Researches(researchEmitter);
    res2.declareStuff();
    res2.setRelations(science, game);

    const result = res2.restore(res1.getSave());

    it("should return true", () => {
      expect(result).toBeTruthy();
    });
    it("should be equal", () => {
      expect(res1.team2.unlocked).toBe(res2.team2.unlocked);
      expect(res1.team2.done).toBe(res2.team2.done);
      expect(res1.team2.quantity.toNumber()).toBe(
        res2.team2.quantity.toNumber()
      );
      expect(res1.team2.complete).toBe(res2.team2.complete);
    });
    it("restore empty return false", () => {
      expect(res1.restore({})).toBeFalsy();
    });
  });
});