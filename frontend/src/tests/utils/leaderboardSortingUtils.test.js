import { sortByWealth, sortByNumCows, sortByCowHealth } from "../../main/utils/leaderboardSortingUtils"
import userCommonsFixtures from "../../fixtures/userCommonsFixtures"

describe("leaderboardSortingUtils tests", () => {
  const {
    oneUserCommons,
    threeUserCommons,
    fiveUserCommons,
    tenUserCommons
  } = userCommonsFixtures;

  test("sortByWealth", () => {
    const sortedUserCommons = sortByWealth(fiveUserCommons);
    const expectedWealths = [100000, 1000, 1000, 800, 50];
    for (i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });

  test("sortByWealthReturnOne", () => {
    const sortedUserCommons = sortByWealth(tenUserCommons, 1);
    expect(sortedUserCommons.length).toBe(1);
    expect(sortedUserCommons[0].totalWealth).toBe(100000);
  });

  test("sortByWealthReturnThree", () => {
    const sortedUserCommons = sortByWealth(tenUserCommons, 3);
    expect(sortedUserCommons.length).toBe(3);
    const expectedWealths = [100000, 100000, 1000];
    for (i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });

  // Expected behavior here is to just return the full sorted array of userCommons
  test("sortByWealthExpectTooMany", () => {
    const sortedUserCommons = sortByWealth(tenUserCommons, 25);
    expect(sortedUserCommons.length).toBe(tenUserCommons.length);
    const expectedWealths = [100000, 100000, 1000, 1000, 1000, 1000, 800, 800, 50, 50];
    for (i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });


})
