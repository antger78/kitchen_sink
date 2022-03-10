const { Recipe, User } = require("../models");

const resolvers = {
	Query: {
		recipes: async () => {
			return Recipe.find().sort({ createdAt: -1 });
		},

		users: async () => {
			return User.find();
		},
		recipe: async (parent,{_id}) => {
			return Recipe.findOne({_id});
		},

	},

	// Mutation: {},
};

module.exports = resolvers;
