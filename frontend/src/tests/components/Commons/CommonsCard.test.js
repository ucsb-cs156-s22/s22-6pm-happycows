import { render, fireEvent } from "@testing-library/react";
import CommonsCard from "main/components/Commons/CommonsCard"; 
import commonsFixtures from "fixtures/commonsFixtures"; 

describe("CommonsCard tests", () => {

    test("renders without crashing when button text is set", async () => {
        const click = jest.fn();
        const { getByTestId } = render(
            <CommonsCard commons = {commonsFixtures.threeCommons[0]} buttonText = {"Join"}  buttonLink = {click}/>
        );

        const button = getByTestId("commonsCard-button-Join-5");
        expect(button).toBeInTheDocument();
        expect(typeof(button.textContent)).toBe('string');
        expect(button.textContent).toEqual('Join');
        fireEvent.click(button);
        expect(click).toBeCalledTimes(1);

        const name = getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Seths Common');  

        const id = getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('5');
    });

    test("renders no button when button text is null", () => {
        const { getByTestId } = render(
            <CommonsCard commons = {commonsFixtures.threeCommons[0]} buttonText = {null} />
        );
        
        expect(() => getByTestId("commonsCard-button")).toThrow('Unable to find an element');

        const name = getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Seths Common');  

        const id = getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('5');
    });
});