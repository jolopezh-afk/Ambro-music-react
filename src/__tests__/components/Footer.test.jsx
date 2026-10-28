import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
    it("muestra el texto de derechos reservados de AmbroMusic", () => {
        render(<Footer />);

        expect(screen.getByText(/AmbroMusic/)).toBeInTheDocument();
        expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
    });
});