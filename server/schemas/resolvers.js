const { Recipe, User, Ingredient } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		/*keywordRecipe: async (parent, args) => {
			return Recipe.find({title:{regex: '^' + args.search_text, $options: 'i'}})
		},*/
		recipes: async () => {
			return Recipe.find().sort({ createdAt: -1 });
		},

		users: async () => {
			return User.find();
		},
		recipe: async (parent, { _id }) => {
			return Recipe.findOne({ _id });
		},
		keywordRecipe: async (parent, args) => {
			console.log(args);
			
			const search_term = args.input.filter.title;
			const regex = new RegExp(search_term, 'i');
			console.log(regex);
			
			const found = await Recipe.find({ title: { $regex: regex } });
			console.log(found);
			
			return found;
		}
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
				console.log(args);


				const recipe = await Recipe.create({
					author: context.user.username,
					title: args.title,
					prepInstructions: args.prepInstructions,
					prepTime: args.prepTime,
					cookTime: args.cookTime,
					difficulty: args.difficulty,
					ingredients: args.ingredients
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { recipes: recipe._id } },
					{ new: true }
				);

				return recipe;
			}
			throw new AuthenticationError('You must be logged in');
		},
		updateRecipe: async (parent, { _id, ...args }, context) => {
			if (context.user) {
				const recipe = await Recipe.findOneAndUpdate(
					{ _id }, args, { new: true }
				);

				return recipe;
			}

			throw new AuthenticationError('You must be logged in');
		},
		likeRecipe: async (parent, args, context) => {
			if (context.user._id) {
				const likedRecipe = await Recipe.findOneAndUpdate(
					{ _id: args._id },
					{ $push: { userLikes: context.user._id } },
					{ new: true }
				);
				return likedRecipe;
			}
			throw new AuthenticationError('You must be logged in');
		},
		deleteRecipe: async (parent, args, context) => {
			if (context.user) {
				const recipe = await Recipe.findOneAndDelete({ _id: args._id });
				return recipe;
			}
			throw new AuthenticationError('You must be logged in');
		}
	},
};

module.exports = resolvers;
