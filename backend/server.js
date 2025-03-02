import express from "express"; // Express module import
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware
import path from "path"
import { ENV_VARS } from "./config/envVars.js"; // Constant variable import
import { connectDB } from "./config/db.js"; // MongoDB connection import

import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";

import linkTree from "./routes/linkTree.route.js";
import analytics from "./routes/analytics.route.js";
import appearance from "./routes/appearance.route.js";




const app = express(); // Creating Express instance
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/analytics", analytics);
app.use("/api/linktree", linkTree);
app.use("/api/appearance", appearance);


if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}




app.listen(PORT,() => {
  console.log("Server started at" + PORT );
  connectDB();
  
});