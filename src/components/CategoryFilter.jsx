/* TO BE IMPLEMENTED


import categories from "../pages/home/data";
import React from "react";

function CategoryFilter() {
  return (
    <div className="mb-8 flex items-center">
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        name="category"
        id="category"
        className="border bg-slate-200 border-gray-200 rounded-md p-1 text-gray-800 focus:outline-none "
      >
        {categories.map((category, index) => (
          <option key={index} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
 */
