import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function FourOFour() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-base-200">
            <Navbar />
            <div>
                <h1 className="text-7xl font-bold text-center">404</h1>
                <p className="max-w-md text-center mx-auto">Where the HELL is this place? Nobody knows, not even the creator of this website.</p>
            </div>
            <Footer />
        </div>
    )
}
