const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const IngredientSchema = new Schema(
  {
    ingredient: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Decimal128,
      required: true,
    }
  }
);

const RecipeSchema = new Schema(
	{
		title: {
			type: String,
			required: "You need to include a title!",
			unique: true,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
    author: {
      type: String,
      ref: "User"
    },
		ingredients: [IngredientSchema],
		prepInstructions: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: /.+\@.+\..+/,
		},
		prepTime: {},
    cookTime: {

    },
    difficulty: {type: String,
			required: true,
			// enumerable - data set that can be iterated over
			enum: ["Easy", "Medium", "Difficult"],
			default: "Medium",},
    userLikes: [
			{
				type: Schema.Types.ObjectId,
				ref: "likes",
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
