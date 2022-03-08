const db = require("../config/connection");
const { User } = require("../models");
const { Recipe } = require("../models");
const userSeeds = require("./userSeeds.json");
const recipeSeeds = require("./recipeSeeds.json");

db.once("open", async () => {
	await User.deleteMany({});
	await Recipe.deleteMany({});
	await User.create(userSeeds);
	await Recipe.create(recipeSeeds);

	console.log("all done!");
	process.exit(0);
});
