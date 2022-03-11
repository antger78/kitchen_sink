export const getSavedRecipeIds = () => {
    const savedRecipeIds = localStorage.getItem('saved_recipe')
    ? JSON.parse(localstorage.getItem('saved_recipe'))
    : [];
    return savedRecipeIds;
};

// saveRecipeIds
// removeRecipeIds
