import { fireEvent, render, screen } from "@testing-library/react";
import CommonsCard from "main/components/Commons/CommonsCard"; 
import commonsFixtures from "fixtures/commonsFixtures"; 

describe("CommonsCard tests", () => {
    test("renders without crashing when button text is set", async () => {
        const click = jest.fn();
        render(
            <CommonsCard commons = {commonsFixtures.threeCommons[0]} buttonText = {"Join"}  buttonLink = {click}/>
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
    });

    test("renders no button when button text is null", () => {
        render(
            <CommonsCard commons = {commonsFixtures.threeCommons[0]} buttonText = {null} />
        );
        
        expect(() => screen.getByTestId("commonsCard-button")).toThrow('Unable to find an element');

        const name = screen.getByTestId("commonsCard-name");
        expect(name).toBeInTheDocument();
        expect(typeof(name.textContent)).toBe('string');
        expect(name.textContent).toEqual('Seths Common');  

        const id = screen.getByTestId("commonsCard-id");
        expect(id).toBeInTheDocument();
        expect(typeof(id.textContent)).toBe('string');
        expect(id.textContent).toEqual('5');
    });
});