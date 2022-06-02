import { render, screen } from "@testing-library/react";
import CommonsList from "main/components/Commons/CommonsList";
import commonsFixtures from "fixtures/commonsFixtures";

describe("CommonsList tests", () => {
    test("renders without crashing when button text is set", () => {
        render(
            <CommonsList commonList = {commonsFixtures.threeCommons} buttonText = {"Join"} title="Join A Commons"/>
        );

        const title = screen.getByTestId("commonsList-title");
        expect(title).toBeInTheDocument();
        expect(typeof(title.textContent)).toBe('string');
        expect(title.textContent).toEqual('Join A Commons');

        const subtitle_name = screen.getByTestId("commonsList-subtitle-name");
        expect(subtitle_name).toBeInTheDocument();
        expect(typeof(subtitle_name.textContent)).toBe('string');
        expect(subtitle_name.textContent).toEqual("Common's Name");

        const subtitle_id = screen.getByTestId("commonsList-subtitle-id");
        expect(subtitle_id).toBeInTheDocument();
        expect(typeof(subtitle_id.textContent)).toBe('string');
        expect(subtitle_id.textContent).toEqual('ID#');

        const button_spacer = screen.getByTestId("commonsList-button-spacer");
        expect(button_spacer).toBeInTheDocument();

        const buttons = screen.getAllByTestId(/commonsCard-button/);
        buttons.forEach((b) => {
            expect(b).toBeInTheDocument();
            expect(typeof(b.textContent)).toBe('string');
            expect(b.textContent).toEqual('Join');
        });

        let i = 0;
        const names = screen.getAllByTestId("commonsCard-name");
        names.forEach((n) => {
            expect(n).toBeInTheDocument();
            expect(typeof(n.textContent)).toBe('string');
            expect(n.textContent).toEqual(commonsFixtures.threeCommons[i].name);
            i++;
        })

        i = 0;
        const ids = screen.getAllByTestId("commonsCard-id");
        ids.forEach((id) => {
            expect(id).toBeInTheDocument();
            expect(typeof(id.textContent)).toBe('string');
            expect(id.textContent).toEqual(commonsFixtures.threeCommons[i].id.toString());
            i++;
        })
    });

    test("renders no button when button text is null", () => {
        render(
            <CommonsList commonList = {commonsFixtures.threeCommons} buttonText = {null} />
        );

        const title = screen.getByTestId("commonsList-title");
        expect(title).toBeInTheDocument();
        expect(typeof(title.textContent)).toBe('string');
        expect(title.textContent).toEqual('');

        const subtitle_name = screen.getByTestId("commonsList-subtitle-name");
        expect(subtitle_name).toBeInTheDocument();
        expect(typeof(subtitle_name.textContent)).toBe('string');
        expect(subtitle_name.textContent).toEqual("Common's Name");

        const subtitle_id = screen.getByTestId("commonsList-subtitle-id");
        expect(subtitle_id).toBeInTheDocument();
        expect(typeof(subtitle_id.textContent)).toBe('string');
        expect(subtitle_id.textContent).toEqual('ID#');

        expect(() => screen.getAllByTestId(/commonsCard-button/)).toThrow('Unable to find an element');

        expect(() => screen.getAllByTestId(/commonsList-button-spacer/)).toThrow('Unable to find an element');

        let i = 0;
        const names = screen.getAllByTestId("commonsCard-name");
        names.forEach((n) => {
            expect(n).toBeInTheDocument();
            expect(typeof(n.textContent)).toBe('string');
            expect(n.textContent).toEqual(commonsFixtures.threeCommons[i].name);
            i++;
        })

        i = 0;
        const ids = screen.getAllByTestId("commonsCard-id");
        ids.forEach((id) => {
            expect(id).toBeInTheDocument();
            expect(typeof(id.textContent)).toBe('string');
            expect(id.textContent).toEqual(commonsFixtures.threeCommons[i].id.toString());
            i++;
        })
    });
});
