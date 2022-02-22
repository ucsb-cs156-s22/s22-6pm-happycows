import { render, fireEvent } from "@testing-library/react";
import { createCommons } from "main/services/commons"; 
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import commonsFixtures from "fixtures/commonsFixtures"

describe("createCommons tests", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach( () => {
        axiosMock.reset();
        axiosMock.resetHistory();
    });

    test("createCommons works", async () => {
        axiosMock.onPost('/api/commons/new').reply(200, commonsFixtures.oneCommons[0]);

        const param = {
            "name": "Anika's Commons",
            "day": 5,
            "endDate": "6/11/2021",
            "totalPlayers": 50,
            "cowPrice": 15
        };
        const result = await createCommons(param);

        expect(result.data).toEqual(commonsFixtures.oneCommons[0]);
    });

    // test("createCommons fails", async () => {
    //     axiosMock.onPost('/api/commons/new').reply(200, apiCurrentUserFixtures.userOnly);
    // });
});