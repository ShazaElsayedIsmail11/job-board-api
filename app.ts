import express from "express"
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
const app = express();

app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/jobs",jobRoutes)
app.use("/api/profiles", profileRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Job Board API is running"
  });
});
app.use(errorHandler)
export default app;