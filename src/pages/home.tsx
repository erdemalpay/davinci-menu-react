import React, { useRef, useState } from "react";

//apis
import { useQuery } from "react-query";
import { getCategories, getMenuItems } from "../common/apis";

//@types
import { ICategory, IMenuItem } from "../common/types";

//components
import OffersCard from "../components/OffersCard";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import Nodata from "../components/Nodata";
import CategoryCardSkeleton from "../components/skeleton/CategoryCardSkeleton";

//-----------------------------------------------------------------------------

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [popularProducts, setPopularProducts] = useState<IMenuItem[]>([]);

  const [filterProducts, setFilterProducts] = useState<IMenuItem[]>([]);

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);

  const { isLoading: isMenuLoading, data: menuItems = [] } = useQuery(
    "menuItem",
    getMenuItems,
    {
      onSuccess: (data: IMenuItem[]) => {
        let popularItem = data.filter(
          (item: IMenuItem) =>
            item.category._id === 11 && item.priceNeorama !== 0
        );
        setPopularProducts(popularItem);
      },
    }
  );

  const { isLoading, data: categories = [] } = useQuery(
    "categories",
    getCategories
  );

  const handleCategory = (category: ICategory) => {
    setActiveCategory(category);
    if (menuItems) {
      const temp = menuItems.filter(
        (item: IMenuItem) =>
          item.category._id === category._id && item.priceNeorama !== 0
      );
      setFilterProducts(temp);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto">
      {/* Popular Categories */}
      <div className="m-auto mt-5 max-md:mx-4">
        <div className="relative category">
          <button
            onClick={scrollLeft}
            className="absolute max-sm:hidden left-icon top-1/2 transform -translate-y-1/2  p-1 rounded-full bg-gray-300 z-10"
          >
            <img
              src="src/assets/next-16.png"
              className="h-5 w-5 rotate-180"
              alt=""
            />
          </button>
          <button
            onClick={scrollRight}
            className="absolute max-sm:hidden right-icon top-1/2 transform -translate-y-1/2  p-1 rounded-full bg-gray-300 z-10"
          >
            <img src="src/assets/next-16.png" className="h-5 w-5" alt="" />
          </button>

          <div
            ref={containerRef}
            className="flex max-md:gap-2 gap-3 overflow-x-auto"
          >
            {(isLoading ? [...Array(10)] : categories).map(
              (category: ICategory, index: number) =>
                category ? (
                  <div
                    key={category._id}
                    onClick={() => handleCategory(category)}
                  >
                    <CategoryCard
                      Category={category}
                      isActive={Boolean(category._id === activeCategory?._id)}
                    />
                  </div>
                ) : (
                  <div key={index}>
                    <CategoryCardSkeleton />
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* Hot Offers */}
      <div className="mt-0 max-md:mx-4">
        <h1 className="text-xl font-bold mb-3">Hot Offers</h1>
        <div className="flex gap-3 overflow-x-auto">
          {[...Array(3)].map((_, index: number) => (
            <div key={index}>
              <OffersCard />
            </div>
          ))}
        </div>
      </div>

      {/* Popular Items */}

      <div className="mt-7">
        <div className=" flex justify-between">
          <h1 className="text-xl px-3 font-bold">
            {activeCategory ? activeCategory.name : "Popular"}
          </h1>
          {activeCategory && (
            <div
              onClick={() => setActiveCategory(null)}
              className="border px-3 py-1 bg-orange-300 rounded-lg cursor-pointer hover:bg-orange-200"
            >
              Popular
            </div>
          )}
        </div>

        <div className="grid my-5 gap-3 max-md:mx-4 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {(isMenuLoading
            ? [...Array(12)]
            : activeCategory
            ? filterProducts
            : popularProducts
          ).map((product: IMenuItem, index: number) =>
            product ? (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ) : (
              <div key={index}>
                <ProductCardSkeleton />
              </div>
            )
          )}
        </div>

        {popularProducts.length === 0 && filterProducts.length === 0 && (
          <Nodata />
        )}
      </div>
    </div>
  );
};

export default Home;
