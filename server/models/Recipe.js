const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		required: "You need to a username!",
    unique: true,
		minlength: 5,
		maxlength: 30,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 30,
		trim: true,
		// add encryption
	},
	email: {
		type: String,
		required: true,
    unique: true,
		trim: true,
		match: /.+\@.+\..+/,
	},
	recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipes",
    },
  ]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

UserSchema.virtual("recipesCount").get(function () {
	return this.recipes.length;
});

const User = model("User", userSchema);

module.exports = User;
