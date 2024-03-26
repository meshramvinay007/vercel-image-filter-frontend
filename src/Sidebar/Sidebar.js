import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { showClearFilterBtn } from "../helper";

const Sidebar = ({
  categories,
  setCategories,
  defaultCategories,
  handleChange,
  setFilters,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Categories</div>
      {showClearFilterBtn(categories) !== 0 && (
        <div className="clear-filter">
          <button
            className="clear-filter-btn"
            onClick={() => {
              setCategories(defaultCategories);
              setFilters([]);
            }}
          >
            Clear Filter
          </button>
        </div>
      )}{" "}
      {categories?.map((category) => (
        <div className="category">
          <input
            id={category.id}
            type="checkbox"
            name={category.name}
            checked={
              category.subCategory.filter(
                (category) => category.isChecked !== true
              ).length < 1
            }
            onChange={(e) => handleChange(e, "supercategory")}
          />
          <label>{category.name}</label>
          {category?.subCategory?.map((subCategory) => (
            <div className="sub-category">
              <input
                type="checkbox"
                id={subCategory.id}
                name={subCategory.name}
                checked={subCategory.isChecked ? subCategory.isChecked : false}
                onChange={(e) =>
                  handleChange(e, "category", subCategory.supercategory)
                }
              />
              <label>{subCategory.name}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
