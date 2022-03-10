const { Recipe, User, Ingredient } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    recipes: async () => {
      return Recipe.find().sort({ createdAt: -1 });
    },

    users: async () => {
      return User.find();
    },
    recipe: async (parent, { _id }) => {
      return Recipe.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect Credientials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addRecipe: async (parent, args, context) => {
      if (context.user) {
		const ingredients = await Ingredient.create()
        const recipe = await Recipe.create({
          author: context.user._id,
          title: args.title,
          prepInstructions: args.prepInstructions,
          prepTime: args.prepTime,
          difficulty: args.difficulty,
		  ingredients: ingredients
        });
      }
    },
  },
};

module.exports = resolvers;
