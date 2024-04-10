const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
	id: { type: Number, unique: true },
	price: { type: String },
	class: { type: String },
	cylinders: { type: Number },
	drive: { type: String, enum: ["fwd", "rwd", "awd", "4wd"] },
	fuel_type: { type: String, enum: ["gas", "diesel", "electricity"] },
	brand: { type: String },
	model: { type: String },
	transmission: { type: String, enum: ["manual", "automatic"] },
	year: { type: Number },
	color: { type: String },
	image: {
		type: String,
		default:
			"https://media.istockphoto.com/id/1325694210/es/vector/sed%C3%A1n-car-line-art-vector-icon-monochrome-illustration.jpg?s=612x612&w=0&k=20&c=dapCTaL8GvkOB53yeWOdjyRhmseoEe_JBysWrrc5OIo=",
	},
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
