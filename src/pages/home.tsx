import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { getCategories, getMenuItems } from "../common/apis";
import { ICategory, IMenuItem } from "../common/types";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import Nodata from "../components/Nodata";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [popularProducts, setPopularProducts] = useState<IMenuItem[]>([]);

  const getCategoriesData = async () => {
    const data = await getCategories();

    setCategories(data);
  };

  const getPopularProduct = async () => {
    setIsLoading(true);
    const res = await getMenuItems();
    setIsLoading(false);
    if (res) {
      let temp = res.filter((item: IMenuItem) => item.category._id === 11);
      setPopularProducts(temp);
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

  return (
    <div>
      {/*TODO: improve UI categories */}
      <div className="container m-auto my-10">
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full"
          >
            {"<"}
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full"
          >
            {">"}
          </button>
          <div
            ref={containerRef}
            className="flex gap-3 overflow-x-auto whitespace-nowrap"
          >
            {categories.length > 0 ? (
              categories.map((item) => (
                <div key={item._id}>
                  <CategoryCard Category={item} />
                </div>
              ))
            ) : (
              <div> No Categories found!</div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Items */}

      <div className="container mx-auto">
        <div className="text-xl font-bold"> Popular</div>

        <div className="grid gap-3 my-4 mx-2 md:grid-cols-2 justify-center">
          {(isLoading ? [...Array(12)] : popularProducts).map(
            (product: IMenuItem, index: number) =>
              product ? (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ) : (
                <div key={index}>
                  {/* TODO: improve this */}
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
