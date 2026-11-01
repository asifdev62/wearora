import Banner from "../Banner";
import CategoryTiles from "./CategoryTiles";
import FeaturedProducts from "./FeaturedProducts";
import NewArrivals from "./NewArrivals";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CategoryTiles />
      <NewArrivals />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
