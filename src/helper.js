export const getNewCategories = (categories) => {
    let finalCategories = [];
    for (let category of categories) {
      const supercategoryIndex = finalCategories.findIndex(
        (supercategory) => supercategory.id === category.supercategory
      );

      if (supercategoryIndex === -1) {
        const newSuperCategory = {
          name: category.supercategory,
          id: category.supercategory,
          subCategory: [category],
        };
        finalCategories.push(newSuperCategory);
      } else {
        finalCategories[supercategoryIndex].subCategory.push(category);
      }
    }

    return finalCategories;
  };

  export const showClearFilterBtn = (categories) => {
    const finalOutput = categories.filter((category) => {
      return (
        category.subCategory.filter((subcategory) => subcategory.isChecked)
          .length !== 0
      );
    });
    return finalOutput.length;
  };