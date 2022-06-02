import { fireEvent, render, screen } from "@testing-library/react";
import CommonsCard from "main/components/Commons/CommonsCard";
import commonsFixtures from "fixtures/commonsFixtures";

describe("CommonsCard tests", () => {
    test("renders without crashing when button text is set", async () => {
        const click = jest.fn();
        render(
            <CommonsCard commons = {commonsFixtures.threeCommons[1]} buttonText = {"Join"}  buttonLink = {click}/>
        );

        const button = screen.getByTestId("commonsCard-button-Join-4");
        expect(button).toBeInTheDocument();
        expect(typeof(button.textContent)).toBe('string');
        expect(button.textContent).toEqual('Join');
        fireEvent.click(button);
        expect(click).toBeCalledTimes(1);

        const name = screen.getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Kevin\'s Commons');

        const id = screen.getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('4');

        const countdown = screen.getByTestId("commonsCard-endDate");
        expect(countdown).toBeInTheDocument();
        expect(typeof(countdown.textContent)).toBe('string');
        expect(countdown.textContent).toEqual('Finished');

    });

    test("renders no button when button text is null", () => {
        render(
            <CommonsCard commons = {commonsFixtures.threeCommons[1]} buttonText = {null} />
        );

        expect(() => screen.getByTestId("commonsCard-button")).toThrow('Unable to find an element');

        const name = screen.getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Kevin\'s Commons');

        const id = screen.getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('4');

        const countdown = screen.getByTestId("commonsCard-endDate");
        expect(countdown).toBeInTheDocument();
        expect(typeof(countdown.textContent)).toBe('string');
        expect(countdown.textContent).toEqual('Finished');

    });

    test("countdown says Not Set when endDate is 0ms", async () => {
        const click = jest.fn();
        let commons = commonsFixtures.threeCommons[0];
        commons.endDate = new Date(0);
        render(
            <CommonsCard commons = {commons} buttonText = {"Join"}  buttonLink = {click}/>
        );

        const button = screen.getByTestId("commonsCard-button-Join-5");
        expect(button).toBeInTheDocument();
        expect(typeof(button.textContent)).toBe('string');
        expect(button.textContent).toEqual('Join');
        fireEvent.click(button);
        expect(click).toBeCalledTimes(1);

        const name = screen.getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Seths Common');

        const id = screen.getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('5');

        const countdown = screen.getByTestId("commonsCard-endDate");
        expect(countdown).toBeInTheDocument();
        expect(typeof(countdown.textContent)).toBe('string');
        expect(countdown.textContent).toEqual('Not set');

    });

    test("countdown says number of days when endDate is in the future", async () => {
        const click = jest.fn();
        let commons = commonsFixtures.threeCommons[2];

        //makes endDate a day 5 days after the current date
        const DAYDIFF = 5;
        const MILLISECONDSPERDAY = 86400001; //add 1 to account for floating point error
        let date = new Date();
        commons.endDate = date.getTime() + MILLISECONDSPERDAY * DAYDIFF;

        render(
            <CommonsCard commons = {commons} buttonText = {"Join"}  buttonLink = {click}/>
        );

        const button = screen.getByTestId("commonsCard-button-Join-1");
        expect(button).toBeInTheDocument();
        expect(typeof(button.textContent)).toBe('string');
        expect(button.textContent).toEqual('Join');
        fireEvent.click(button);
        expect(click).toBeCalledTimes(1);

        const name = screen.getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Anika\'s Commons');

        const id = screen.getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('1');

        const countdown = screen.getByTestId("commonsCard-endDate");
        expect(countdown).toBeInTheDocument();
        expect(typeof(countdown.textContent)).toBe('string');
        expect(countdown.textContent).toEqual(`${DAYDIFF}`);

    });

    test("countdown says 0 when endDate is the same day", async () => {
        const click = jest.fn();
        let commons = commonsFixtures.threeCommons[2];
        commons.endDate = new Date();

        render(
            <CommonsCard commons = {commons} buttonText = {"Join"}  buttonLink = {click}/>
        );

        const button = screen.getByTestId("commonsCard-button-Join-1");
        expect(button).toBeInTheDocument();
        expect(typeof(button.textContent)).toBe('string');
        expect(button.textContent).toEqual('Join');
        fireEvent.click(button);
        expect(click).toBeCalledTimes(1);

        const name = screen.getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Anika\'s Commons');

        const id = screen.getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('1');

        const countdown = screen.getByTestId("commonsCard-endDate");
        expect(countdown).toBeInTheDocument();
        expect(typeof(countdown.textContent)).toBe('string');
        expect(countdown.textContent).toEqual(`${DAYDIFF}`);

    });

});
