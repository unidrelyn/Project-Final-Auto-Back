const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
	id: { type: Number, unique: true },
	class: { type: String },
	cylinders: { type: Number },
	drive: { type: String, enum: ["fwd", "rwd", "awd", "4wd"] },
	fuel_type: { type: String, enum: ["gas", "diesel", "electricity"] },
	brand: { type: String },
	model: { type: String },
	transmission: { type: String, enum: ["manual", "automatic"] },
	year: { type: Number },
	color: { type: String },
	image: { type: String },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
