import SkipList from "../components/SkipList";
import Stepper from "../components/Stepper";

const HomePage: React.FC = () => {
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Stepper />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Skip Size
        </h1>

        <p className="text-gray-600 mb-8">
          Select the skip size that best suits your needs
        </p>

        <SkipList />
      </div>
    </main>
  );
};

export default HomePage;
