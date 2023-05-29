import ItemList from "../components/ItemList";

function HomePage() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <ItemList /> {/* Render the ItemList component here */}
        </div>
    );
}

export default HomePage;
