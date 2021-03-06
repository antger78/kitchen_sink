const { Schema, model, Types } = require("mongoose");

// if we want
const dateFormat = require("../utils/dateFormat");

// const IngredientSchema = new Schema({
// 	ingredient: {
// 		type: String,
// 		required: true
// 	},
// 	quantity: {
// 		type: String,
// 		required: true,
// 	},
// });

const RecipeSchema = new Schema(
	{
		title: {
			type: String,
			required: "You need to include a title!",
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		author: {
			type: String,
			ref: "User",
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		// ingredients: [IngredientSchema],

		ingredients: [{
			type: String,
			trim: true
		}],
		prepInstructions: {
			type: String,
			required: true,
			trim: true,
		},
		prepTime: {
			type: Number,
			required: true,
		},
		cookTime: {
			type: Number,
			required: true,
		},
		difficulty: {
			type: String,
			required: true,
			enum: ["Easy", "Medium", "Hard"],
			default: "Medium",
		},
		userLikes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

RecipeSchema.virtual("likesCount").get(function () {
	return this.userLikes.length;
});

const Recipe = model("Recipe", RecipeSchema);

module.exports = Recipe;
