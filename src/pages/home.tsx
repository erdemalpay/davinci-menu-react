import React, { useEffect, useRef, useState } from "react";

//apis
import { useQuery } from "react-query";
import { getCategories, getMenuItems, getPopularItems } from "../common/apis";

//@types
import { ICategory, IMenuItem } from "../common/types";

//components
// import OffersCard from "../components/OffersCard";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import Nodata from "../components/Nodata";
import CategoryCardSkeleton from "../components/skeleton/CategoryCardSkeleton";
import Header from "../components/Header";

//-----------------------------------------------------------------------------

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [filterProducts, setFilterProducts] = useState<IMenuItem[]>([]);

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);

  const [param, setParam] = useState<number>(0);
  const popularCategory = { _id: 999999999, name: "Popüler", order: 0 };
  const { isLoading: isMenuLoading, data: menuItems = [] } = useQuery(
    "menuItem",
    getMenuItems
  );
  const { isLoading: isPopularItemsLoading, data: popularItems = [] } =
    useQuery("popularItems", getPopularItems);

  const { isLoading, data: categories = [] } = useQuery(
    "categories",
    getCategories
  );

  const handleCategory = (category: ICategory) => {
    setActiveCategory(category);
    if (menuItems) {
      const temp = menuItems
        .filter(
          (item: IMenuItem) => item.category._id === category._id && item.price
        )
        .sort((a, b) => a.order - b.order);
      setFilterProducts(temp);
      if (category === popularCategory) {
        setFilterProducts(popularItems.map((popularItem) => popularItem.item));
      }
    }
    window.scrollTo({
      top: 0, // Scroll to the top of the window
      behavior: "smooth", // Optional: Defines the transition animation. Remove for instant scroll
    });
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

  useEffect(() => {
    // Extracting the last segment of the URL path
    const pathSegments = window.location.pathname.split("/");
    const lastSegment = pathSegments.pop() || pathSegments.pop(); // Handle trailing slash

    // Check if the last segment is a valid parameter and set it
    if (lastSegment && !isNaN(Number(lastSegment))) {
      setParam(Number(lastSegment));
    }
  }, []);

  useEffect(() => {
    handleCategory(popularCategory);
  }, [popularItems]);

  return (
    <div className=" mx-auto">
      <div className="fixed top-0 w-full  z-1000">
        <Header />

        {/* Popular Categories */}
        <div className="container pt-5 max-md:pb-0 max-md:px-4 bg-[#eaf0f9]">
          <div className="relative category">
            <button
              onClick={scrollLeft}
              className="absolute max-sm:hidden left-icon top-1/2 transform -translate-y-1/2  p-1 rounded-full bg-gray-300 z-10"
            >
              <img
                src="./assets/next-16.png"
                className="h-5 w-5 rotate-180"
                alt=""
              />
            </button>
            <button
              onClick={scrollRight}
              className="absolute max-sm:hidden right-icon top-1/2 transform -translate-y-1/2  p-1 rounded-full bg-gray-300 z-10"
            >
              <img src="./assets/next-16.png" className="h-5 w-5" alt="" />
            </button>

            <div
              ref={containerRef}
              className="flex max-md:gap-2 gap-3 overflow-auto"
            >
              {(isLoading
                ? [...Array(10)]
                : [popularCategory, ...categories]
              ) /* .filter(
                    (category) =>
                      category && category.name !== "Haftanın Kampanyaları"
                  ) */
                .map((category: ICategory, index: number) =>
                  category ? (
                    <div
                      key={category._id}
                      onClick={() => handleCategory(category)}
                    >
                      <CategoryCard
                        category={category}
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
      </div>

      <div className="container mt-[360px] max-md:mt-[300px]">
        {/* Hot Offers */}
        {/* <div className="mt-0 max-md:mx-4">
          <h1 className="text-xl font-bold mb-3">Kampanyalar</h1>
          <div className="flex gap-3 overflow-x-auto">
            {[...Array(3)].map((_, index: number) => (
              <div key={index}>
                <OffersCard />
              </div>
            ))}
          </div>
        </div> */}

        {/* Popular Items */}

        <div className="pt-6 sm:pt-12">
          <div className=" flex justify-between px-4 md:px-0">
            <h1 className="text-xl px-3 font-bold">
              {activeCategory && activeCategory.name}
            </h1>
            {activeCategory && activeCategory.name !== popularCategory.name && (
              <div
                onClick={() => handleCategory(popularCategory)}
                className="border px-3 py-1 bg-orange-300 rounded-lg cursor-pointer hover:bg-orange-200"
              >
                Popüler
              </div>
            )}
          </div>

          <div className="grid my-5 gap-3 max-md:mx-4 md:grid-cols-2 lg:grid-cols-3 justify-center max-md:justify-normal">
            {isMenuLoading || isPopularItemsLoading ? (
              [...Array(12)]
            ) : activeCategory ? (
              filterProducts.map((product: IMenuItem, index: number) =>
                product ? (
                  <div key={product._id}>
                    <ProductCard product={product} param={param} />
                  </div>
                ) : (
                  <div key={index}>
                    <ProductCardSkeleton />
                  </div>
                )
              )
            ) : (
              <></>
            )}
          </div>

          {filterProducts.length === 0 && <Nodata />}
        </div>
      </div>
    </div>
  );
};

export default Home;
