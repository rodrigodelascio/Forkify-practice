import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";


const controlRecipes = async function () {

  try {

    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // LOAD RECIPE
    await model.loadRecipe(id);

    // RENDERING RECIPE
    recipeView.render(model.state.recipe);

  } catch (err) {

    recipeView.renderError();

  }

};

const controlSearchResults = async function () {

  try {
    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);

  } catch (err) {

    console.log(err);

  }

};



const init = function () {

  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);

};


init();

