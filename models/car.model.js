const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
	id: { type: String, unique: true },
	price: { type: String, default: "0" },
	class: { type: String, default: "Not Specified" },
	cylinders: { type: Number, default: 0 },
	drive: {
		type: String,
		enum: ["fwd", "rwd", "awd", "4wd"],
		default: "Not Specified",
	},
	fuel_type: {
		type: String,
		enum: ["gas", "diesel", "electricity"],
		default: "Not Specified",
	},
	brand: { type: String, default: "Generic" },
	model: { type: String, default: "Generic" },
	transmission: {
		type: String,
		enum: ["manual", "automatic"],
		default: "Not Specified",
	},
	year: { type: Number, default: 1900 },
	color: { type: String, default: "Not Specified" },
	image: {
		type: String,
		default:
			"https://media.istockphoto.com/id/1325694210/es/vector/sed%C3%A1n-car-line-art-vector-icon-monochrome-illustration.jpg?s=612x612&w=0&k=20&c=dapCTaL8GvkOB53yeWOdjyRhmseoEe_JBysWrrc5OIo=",
	},
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
