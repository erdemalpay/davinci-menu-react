import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import { getCategories } from "../common/apis";
import { ICategory } from "../common/types";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategoriesData = async () => {
    setIsLoading(true);
    const data = await getCategories();
    setIsLoading(false);
    setCategories(data);
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
  }, []);

  // TODO: update scroll

  //TODO: design loading page
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Header />
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
    </div>
  );
};

export default Home;
