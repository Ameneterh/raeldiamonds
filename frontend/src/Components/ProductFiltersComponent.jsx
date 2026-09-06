import { Input } from "antd";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ProductFiltersComponent({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
}) {
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const categories = [
    {
      name: "Health & Beauty",
      value: "health_beauty",
    },
    {
      name: "Fashion & Wears",
      value: "fashion_wears",
    },
    {
      name: "Kids",
      value: "kids_babies",
    },
    {
      name: "Agric & Foods",
      value: "agric_food",
    },
    {
      name: "General",
      value: "general",
    },
  ];

  const sub_categories = [
    // for health & beauty 0-5
    {
      name: "Accessories",
      value: "beauty_accessories",
    },
    {
      name: "Cosmetics",
      value: "cosmetics",
    },
    {
      name: "Hairs",
      value: "hairs",
    },
    {
      name: "Make Ups",
      value: "make_ups",
    },
    {
      name: "Perfumes",
      value: "perfumes",
    },

    // for fashion & wears 5-12
    {
      name: "Bags & Caps/Hats",
      value: "bags_caps",
    },
    {
      name: "Clothing",
      value: "clothing",
    },
    {
      name: "Accessories",
      value: "clothing_accessories",
    },
    {
      name: "Jewellery",
      value: "jewellery",
    },
    {
      name: "Shoes",
      value: "shoes",
    },
    {
      name: "Watches",
      value: "watches",
    },
    {
      name: "Glasses",
      value: "glasses",
    },

    // for kids & babies 12-15
    {
      name: "Clothing",
      value: "clothing",
    },
    {
      name: "Shoes",
      value: "shoes",
    },
    {
      name: "Toys",
      value: "toys",
    },

    // for agric & foods 15-18
    {
      name: "Baked",
      value: "baked",
    },
    {
      name: "Fried",
      value: "fried",
    },
    {
      name: "Fresh",
      value: "fresh",
    },
    {
      name: "Drinks",
      value: "drinks",
    },
  ];

  console.log(filters.category);

  useEffect(() => {
    console.log(filters.category);
  }, [filters]);

  return (
    <div className="min-w-36 flex flex-col">
      <div className="flex justify-between">
        <p className="text-primary">Filters</p>
        <IoClose
          onClick={() => setShowFilters(!showFilters)}
          className="cursor-pointer w-5 h-5 text-red-600"
        />
      </div>

      {/* category filters */}
      <div className="flex flex-col gap-1 mt-3">
        <p className="text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-1">
          {categories.map((category, index) => {
            return (
              <div key={index} className="flex items-center gap-2 text-sm h-6">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <hr className="h-[1.5px] bg-gray-300 my-3" />

        {/* sub categories */}
        <p className="text-sm font-medium">SUB CATEGORY</p>
        <div className="flex flex-col gap-1">
          {/* health & beauty */}
          {filters.category.includes("health_beauty") &&
            sub_categories.slice(0, 5).map((sub_category) => {
              return (
                <div className="flex items-center gap-2 text-sm h-6">
                  <input
                    type="checkbox"
                    name="sub_category"
                    className="max-width"
                    checked={filters.sub_category.includes(sub_category.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          sub_category: [
                            ...filters.sub_category,
                            sub_category.value,
                          ],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          sub_category: filters.sub_category.filter(
                            (item) => item !== sub_category.value
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor="sub_category">{sub_category.name}</label>
                </div>
              );
            })}

          {/* fashion & wears */}
          {filters.category.includes("fashion_wears") &&
            sub_categories.slice(5, 12).map((sub_category) => {
              return (
                <div className="flex items-center gap-2 text-sm h-6">
                  <input
                    type="checkbox"
                    name="sub_category"
                    className="max-width"
                    checked={filters.sub_category.includes(sub_category.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          sub_category: [
                            ...filters.sub_category,
                            sub_category.value,
                          ],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          sub_category: filters.sub_category.filter(
                            (item) => item !== sub_category.value
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor="sub_category">{sub_category.name}</label>
                </div>
              );
            })}

          {/* kids & babies */}
          {filters.category.includes("kids_babies") &&
            sub_categories.slice(12, 15).map((sub_category) => {
              return (
                <div className="flex items-center gap-2 text-sm h-6">
                  <input
                    type="checkbox"
                    name="sub_category"
                    className="max-width"
                    checked={filters.sub_category.includes(sub_category.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          sub_category: [
                            ...filters.sub_category,
                            sub_category.value,
                          ],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          sub_category: filters.sub_category.filter(
                            (item) => item !== sub_category.value
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor="sub_category">{sub_category.name}</label>
                </div>
              );
            })}

          {/* kids & babies */}
          {filters.category.includes("agric_food") &&
            sub_categories.slice(15).map((sub_category) => {
              return (
                <div className="flex items-center gap-2 text-sm h-6">
                  <input
                    type="checkbox"
                    name="sub_category"
                    className="max-width"
                    checked={filters.sub_category.includes(sub_category.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          sub_category: [
                            ...filters.sub_category,
                            sub_category.value,
                          ],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          sub_category: filters.sub_category.filter(
                            (item) => item !== sub_category.value
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor="sub_category">{sub_category.name}</label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
