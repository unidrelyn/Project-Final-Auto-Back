const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth.routes");
const CarModel = require("./models/car.model");
const OrderModel = require("./models/order.model");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173", "https://autoexchange.netlify.app"],
	})
);
app.use(auth);

const errorHandler = (err, req, res, next) => {
	console.error(err); // Log the error for debugging purposes
	res.status(500).json({ error: "Internal Server Error" }); // Send an appropriate error response to the client
};

app.use(errorHandler);

const connectionString =
	process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

mongoose
	.connect(connectionString)
	.then((x) => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch((err) => {
		console.error("Error connecting to mongo", err);
	});

//Routes
app.post("/api/cars", (req, res) => {
	CarModel.create(req.body)
		.then((car) => {
			res.status(201).json(car);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

app.get("/api/cars", (req, res) => {
	CarModel.find()
		.then((cars) => {
			res.status(200).json(cars);
		})
		.catch((error) => {
			console.log("Error retrieving cars:", error);
			res.status(500).json(error);
		});
});

app.get("/api/cars/:carId", (req, res) => {
	const { carId } = req.params;
	CarModel.findById(carId)
		.then((car) => {
			if (!car) {
				return res.status(404).json({ message: "car not found!" });
			}
			res.status(200).json(car);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ err: "Failed to retrieve the car" });
		});
});

app.put("/api/cars/:carsId", (req, res) => {
	const carId = req.params.carsId;
	CarModel.findByIdAndUpdate(carId, req.body, { new: true })
		.then((updatedCar) => {
			if (!updatedCar) {
				return res.status(500).json({ error: "Car not found" });
			}
			res.status(200).json(updatedCar);
		})
		.catch((err) => {
			console.log("Error updating car", err);
			res.status(500).json({ error: "Failed to update car" });
		});
});

app.delete("/api/cars/:carsId", (req, res) => {
	const { carsId } = req.params;
	console.log(carsId);
	CarModel.findByIdAndDelete(carsId)
		.then((deletedCar) => {
			if (!deletedCar) {
				return res.status(404).json({ error: "Car does not exist!" });
			}
			console.log("Car deleteed");
			res.status(204).end();
		})
		.catch((err) => {
			console.error("Error whil deleting a car", err);
			res.status(500).json({ error: "Deleted car failed" });
		});
});

app.post("/api/orders", (req, res) => {
	OrderModel.create(req.body)
		.then((order) => res.status(201).json(order))
		.catch((err) => {
			console.error("Error creating order:", err);
			res.status(500).json({ error: "Failed to create order" });
		});
});

app.get("/api/orders", async (req, res) => {
	try {
		const orders = await OrderModel.find(); // Fetch all orders from the database
		res.status(200).json(orders); // Send the orders back to the client
	} catch (error) {
		console.error("Failed to retrieve orders:", error);
		res.status(500).json({ error: "Failed to retrieve orders" });
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
	/*if (!process.env.TOKEN_SECRET) {
		throw new Error("TOKEN_SECRET no está configurado");
	}*/
});
