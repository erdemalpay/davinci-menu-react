import React, { useEffect, useState } from "react";
import { getCategories } from "../apis";
import Header from "../components/Header";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const getCategoriesData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
