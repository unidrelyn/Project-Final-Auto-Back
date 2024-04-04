const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth.routes");
const CarModel = require("./models/car.model");
const PORT = 5005;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);

const errorHandler = (err, req, res, next) => {
	console.error(err); // Log the error for debugging purposes
	res.status(500).json({ error: "Internal Server Error" }); // Send an appropriate error response to the client
};

app.use(errorHandler);

mongoose
	.connect("mongodb://127.0.0.1:27017/ProjectFinal")
	.then((x) => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch((err) => {
		console.error("Error connecting to mongo", err);
	});

app.use(
	cors({
		origin: ["http://localhost:5173", "http://www.example.com"],
	})
);

app.post("/cars", (req, res) => {
	CarModel.create(req.body)
		.then((car) => {
			res.status(201).json(car);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

app.get("/cars", (req, res) => {
	CarModel.find()
		.then((cars) => {
			console.log(cars);
			console.log("aca");
			res.status(200).json(cars);
		})
		.catch((error) => {
			console.error("Error retrieving cars:", error);
			res.status(500).json({ error: "Failed to retrieve cars" });
		});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
