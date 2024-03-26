import { useEffect, useState } from "react";
import "./App.css";
import ImageContainer from "./ImageContainer/ImageContainer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";
import { getNewCategories } from "./helper";

function App() {
  const [categories, setCategories] = useState([]);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://vercel-image-filter-backend.vercel.app/getCategories")
      .then((res) => {
        const categories = res.data.categories;
        setCategories(getNewCategories(categories).reverse());
        setDefaultCategories(getNewCategories(categories).reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (filters.length) {
      axios
        .post(`https://vercel-image-filter-backend.vercel.app/getFilteredImages?page=${currentPage}`, {
          categories: filters,
        })
        .then((res) => {
          setLoading(false);
          setImages(res.data.results);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      axios
        .get(`https://vercel-image-filter-backend.vercel.app/getAllImages?page=${currentPage}`)
        .then((res) => {
          setLoading(false);
          setImages(res.data.results);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(1);
    setLoading(true);
    setCurrentPage(page);
  };

  const handleChange = (e, type, superId = null) => {
    setLoading(true)
    const { id, checked } = e.target;

    if (type === "category") {
      const supercategoryIndex = categories.findIndex(
        (category) => superId === category.id
      );
      let updatedSupercategory = categories[supercategoryIndex];

      if (updatedSupercategory) {
        let updatedSubcategories = updatedSupercategory.subCategory.map(
          (category) => {
            return category.id === +id
              ? { ...category, isChecked: checked }
              : category;
          }
        );
        updatedSupercategory = {
          ...updatedSupercategory,
          subCategory: updatedSubcategories,
          isChecked: checked,
        };
        let updatedSuperCategories = categories.map((category) =>
          category?.id === superId ? updatedSupercategory : category
        );
        setCategories(updatedSuperCategories);

        setFilters(
          [].concat(
            ...updatedSuperCategories.map((category) => {
              return category.subCategory
                .map((subcategory) =>
                  subcategory.isChecked ? subcategory.name : ""
                )
                .filter((category) => category);
            })
          )
        );
      }
    }

    if (type === "supercategory") {
      const supercategoryIndex = categories.findIndex(
        (category) => id === category.id
      );
      let updatedSupercategory = categories[supercategoryIndex];

      if (updatedSupercategory) {
        let updatedSubcategories = updatedSupercategory.subCategory.map(
          (category) => ({
            ...category,
            isChecked: checked,
          })
        );
        updatedSupercategory = {
          ...updatedSupercategory,
          subCategory: updatedSubcategories,
          isChecked: checked,
        };
        let updatedSuperCategories = categories.map((category) =>
          category?.id === id ? updatedSupercategory : category
        );
        setCategories(updatedSuperCategories);

        setFilters(
          [].concat(
            ...updatedSuperCategories.map((category) => {
              return category.subCategory
                .map((subcategory) =>
                  subcategory.isChecked ? subcategory.name : ""
                )
                .filter((category) => category);
            })
          )
        );
      }
    }

    //filtering out all filters
  };
  return (
    <div className="App">
      <Navbar />
      <Sidebar
        categories={categories}
        setCategories={setCategories}
        defaultCategories={defaultCategories}
        setDefaultCategories={setDefaultCategories}
        filters={filters}
        handleChange={handleChange}
        setFilters={setFilters}
      />
      <ImageContainer
        images={images}
        setImages={setImages}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        setLoading={setLoading}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
