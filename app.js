const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth.routes");
const cars = require("./db.json");

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
	.connect("mongodb://127.0.0.1:27017")
	.then((x) =>
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	)
	.catch((err) => {
		console.error("Error connecting to mongo", err);
	});

app.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:5005"],
	})
);

app.get("/api/cars", (req, res) => res.json(cars));
