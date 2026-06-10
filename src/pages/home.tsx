import React, { useEffect, useRef, useState } from "react";

//apis
import { useQuery } from "react-query";
import { getActiveCustomerPopup, getCategories, getMenuItems, getPopularItems, ICustomerPopup } from "../common/apis";

//@types
import { ICategory, IMenuItem } from "../common/types";

//components
import CategoryCard from "../components/CategoryCard";
import CustomerPopupModal from "../components/CustomerPopupModal";
import Header from "../components/Header";
import LocationSelectModal from "../components/LocationSelectModal";
import Nodata from "../components/Nodata";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import CategoryCardSkeleton from "../components/skeleton/CategoryCardSkeleton";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";

//-----------------------------------------------------------------------------

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const popularCategory = {
    _id: 999999999,
    name: "Popüler",
    order: 0,
    locations: [1, 2],
    imageUrl: "/assets/popular.jpeg",
  };

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(popularCategory);
  const [param, setParam] = useState<number>(0);
  const [isLocationSelectModalOpen, setIsLocationSelectModalOpen] = useState(false);
  const [popupQueue, setPopupQueue] = useState<ICustomerPopup[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IMenuItem | null>(null);

  const { isLoading: isMenuLoading, data: menuItems = [] } = useQuery("menuItem", getMenuItems);
  const { isLoading: isPopularItemsLoading, data: popularItems = [] } = useQuery("popularItems", getPopularItems);

  const [filterProducts, setFilterProducts] = useState<IMenuItem[]>(
    popularItems
      ?.map((popularItem) => {
        const foundItem = menuItems?.find((item: IMenuItem) => item._id === popularItem.item && item.shownInMenu);
        return foundItem ? foundItem : null;
      })
      ?.filter((item) => item !== null) as IMenuItem[]
  );

  const { isLoading, data: categories = [] } = useQuery("categories", getCategories);

  const handleCategory = (category: ICategory) => {
    setActiveCategory(category);

    if (menuItems) {
      const temp = menuItems
        .filter(
          (item: IMenuItem) =>
            (item.category === category._id || item.additionalCategories?.includes(category._id)) &&
            item.price &&
            item.shownInMenu
        )
        .sort((a, b) => a.order - b.order);
      setFilterProducts(temp);

      if (category === popularCategory) {
        setFilterProducts(
          popularItems
            ?.map((popularItem) => {
              const foundItem = menuItems?.find((item: IMenuItem) => item._id === popularItem.item && item.shownInMenu);
              return foundItem ? foundItem : null;
            })
            ?.filter((item) => item !== null) as IMenuItem[]
        );
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const lastSegment = pathSegments.pop() || pathSegments.pop();

    if (lastSegment && !isNaN(Number(lastSegment))) {
      const locationId = Number(lastSegment);
      if (locationId === 1) {
        window.location.href = "/2";
      } else {
        setParam(locationId);
      }
    } else {
      window.location.href = "/2";
    }
  }, []);

  useEffect(() => {
    setActiveCategory(popularCategory);
    const items = popularItems
      .map((pi) => menuItems.find((mi) => mi._id === pi.item && mi.shownInMenu))
      .filter((x): x is IMenuItem => x != null);
    setFilterProducts(items);
  }, [param, menuItems, popularItems]);

  useEffect(() => {
    if (!param) return;
    getActiveCustomerPopup(param).then((popups) => {
      if (!popups?.length) return;
      const visible = popups.filter((popup) => {
        const storageKey = `popup_seen_${popup._id}`;
        const lastSeen = localStorage.getItem(storageKey);
        const cooldownMs = (popup.cooldownHours ?? 24) * 60 * 60 * 1000;
        return !lastSeen || Date.now() - Number(lastSeen) > cooldownMs;
      });
      setPopupQueue(visible);
    });
  }, [param]);

  return (
    <div className="mx-auto min-h-screen bg-white">
      {/* Fixed top bar */}
      <div className="fixed top-0 w-full z-[1000]">
        <Header />

        {/* Category strip */}
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 max-md:px-3">
          <div className="relative category container mx-auto">
            {/* Desktop scroll arrows */}
            <button
              onClick={scrollLeft}
              className="absolute max-sm:hidden left-icon top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white hover:bg-gray-50 z-10 border border-gray-200 shadow-sm transition-colors"
            >
              <img src="./assets/next-16.png" className="h-4 w-4 rotate-180 opacity-50" alt="" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute max-sm:hidden right-icon top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white hover:bg-gray-50 z-10 border border-gray-200 shadow-sm transition-colors"
            >
              <img src="./assets/next-16.png" className="h-4 w-4 opacity-50" alt="" />
            </button>

            <div ref={containerRef} className="flex gap-1 overflow-auto pb-1">
              {(isLoading ? [...Array(10)] : [popularCategory, ...categories]).map(
                (category: ICategory, index: number) =>
                  category ? (
                    param ? (
                      category.locations.includes(param) ? (
                        <div key={category._id + "category" + index} onClick={() => handleCategory(category)}>
                          <CategoryCard category={category} isActive={category._id === activeCategory?._id} />
                        </div>
                      ) : (
                        <></>
                      )
                    ) : (
                      <div key={category._id} onClick={() => handleCategory(category)}>
                        <CategoryCard category={category} isActive={category._id === activeCategory?._id} />
                      </div>
                    )
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

      {/* Content — offset for fixed header + category bar */}
      {/* Header: 88px desktop / 72px mobile. Category strip: ~120px desktop / ~104px mobile */}
      <div className="mt-[216px] max-md:mt-[182px] pb-12">
        {/* Section header */}
        <div className="max-w-[470px] mx-auto flex items-start justify-between gap-4 pt-4 pb-2 px-3 border-b border-gray-200">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-900 font-bold text-sm tracking-tight">
              {activeCategory?.name}
            </h1>
            <p className="text-[10px] text-gray-500 leading-relaxed max-w-sm">
              * Siparişinizi seçtikten sonra masadaki çağrı butonunu kullanarak sipariş verebilirsiniz.
            </p>
          </div>

          {activeCategory && activeCategory.name !== popularCategory.name && (
            <button
              onClick={() => handleCategory(popularCategory)}
              className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 transition-all duration-200 whitespace-nowrap"
            >
              ✦ Popüler
            </button>
          )}
        </div>

        {/* Instagram feed */}
        <div
          key={activeCategory?._id}
          className="max-w-[470px] mx-auto flex flex-col"
        >
          {isMenuLoading || isPopularItemsLoading
            ? [...Array(12)].map((_, i) => (
                <div key={i}>
                  <ProductCardSkeleton />
                </div>
              ))
            : activeCategory
            ? filterProducts.map((product: IMenuItem, index: number) =>
                product ? (
                  product?.locations?.includes(param) ? (
                    <div key={product._id + "item"}>
                      <ProductCard
                        product={product}
                        param={param}
                        categories={categories}
                        onClick={() => setSelectedProduct(product)}
                      />
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <div key={index}>
                    <ProductCardSkeleton />
                  </div>
                )
              )
            : null}
        </div>

        {filterProducts.length === 0 && !isMenuLoading && !isPopularItemsLoading && <Nodata />}
      </div>

      {isLocationSelectModalOpen && (
        <LocationSelectModal
          isOpen={isLocationSelectModalOpen}
          onSelect={(locationId: number) => {
            setParam(locationId);
            setIsLocationSelectModalOpen(false);
            handleCategory(popularCategory);
          }}
          onClose={() => setIsLocationSelectModalOpen(false)}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          categories={categories}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {popupQueue.length > 0 && (
        <CustomerPopupModal
          popup={popupQueue[0]}
          onClose={() => {
            localStorage.setItem(`popup_seen_${popupQueue[0]._id}`, String(Date.now()));
            setPopupQueue((prev) => prev.slice(1));
          }}
        />
      )}
    </div>
  );
};

export default Home;
