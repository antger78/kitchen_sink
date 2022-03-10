const { Recipe } = require("../models");

const resolvers = {
	Query: {
		recipes: async () => {
			return Recipe.find().sort({ createdAt: -1 });
		},
	},

	// Mutation: {},
};

module.exports = resolvers;
