import { Materials } from "./materials";
import { GameService } from "../game.service";

describe("Materials", () => {
  it("should create an instance", () => {
    const game = new GameService();
    expect(new Materials(game)).toBeTruthy();
  });
});
