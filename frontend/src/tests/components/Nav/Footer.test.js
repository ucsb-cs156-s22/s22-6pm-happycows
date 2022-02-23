import { render } from "@testing-library/react";
import Footer from "main/components/Nav/Footer";

describe("Footer tests", () => {
    test("renders correctly ", async () => {
        const { getByTestId } = render(
            <Footer />
        );

        const text = getByTestId("footer-content");
        expect(text).toBeInTheDocument();
        expect(typeof(text.textContent)).toBe('string');
        expect(text.textContent).toEqual('HappierCows is a project of Mattanjah de Vries, Distinguished Professor of Chemistry at UC Santa Barbara. The open source code is available on GitHub.');
    });
});


