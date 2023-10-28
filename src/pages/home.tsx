import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { getCategories, getMenuItems } from "../common/apis";
import { ICategory, IMenuItem } from "../common/types";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import Nodata from "../components/Nodata";
import CategoryCardSkeleton from "../components/skeleton/CategoryCardSkeleton";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<ICategory[]>([]);

  const [popularProducts, setPopularProducts] = useState<IMenuItem[]>([]);

  const [allProducts, setAllProducts] = useState<IMenuItem[]>([]);

  const [filterProducts, setFilterProducts] = useState<IMenuItem[]>([]);

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);

  const getCategoriesData = async () => {
    const data = await getCategories();

    setCategories(data);
  };

  const getPopularProduct = async () => {
    setIsLoading(true);
    const res = await getMenuItems();
    setIsLoading(false);
    if (res) {
      let allItems = res.filter((item: IMenuItem) => item.priceNeorama !== 0);

      setAllProducts(allItems);

      let popularItem = res.filter(
        (item: IMenuItem) => item.category._id === 11 && item.priceNeorama !== 0
      );
      setPopularProducts(popularItem);
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

  useEffect(() => {
    getCategoriesData();
    getPopularProduct();
  }, []);

  const handleCategory = (category: ICategory) => {
    setActiveCategory(category);
    const temp = allProducts.filter(
      (item: IMenuItem) => item.category._id === category._id
    );

    setFilterProducts(temp);
  };

  return (
    <div className="container mx-auto">
      {/* Popular Categories */}
      <div className=" m-auto my-10">
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-1 rounded-full bg-gray-300"
          >
            {"<"}
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-1 rounded-full bg-gray-300"
          >
            {">"}
          </button>
          <div
            ref={containerRef}
            className="flex gap-3 overflow-x-auto whitespace-nowrap"
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
      <div></div>

      {/* Popular Items */}

      <div className="">
        <div className=" flex justify-between ">
          <div className="text-xl font-bold">
            {" "}
            {activeCategory ? activeCategory.name : "Popular"}
          </div>
          {activeCategory && (
            <div
              onClick={() => setActiveCategory(null)}
              className="border px-3 py-1 bg-orange-300 rounded-lg cursor-pointer hover:bg-orange-200"
            >
              Popular
            </div>
          )}
        </div>

        <div className="grid gap-3 my-4 mx-2 lg:grid-cols-2 justify-center">
          {(isLoading
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

        {popularProducts.length === 0 && <Nodata />}
      </div>
    </div>
  );
};

export default Home;
