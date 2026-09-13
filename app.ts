import express from "express"
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import swaggerSpec from "./config/swagger.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());
//CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));

//Swagger
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

app.get("/api-docs", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Job Board API Docs</title>

        <link
          rel="stylesheet"
          href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
        />
      </head>

      <body>
        <div id="swagger-ui"></div>

        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>

        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: "/api-docs.json",
              dom_id: "#swagger-ui",
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              layout: "StandaloneLayout"
            });
          };
        </script>
      </body>
    </html>
  `);
});
//Helmet
app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    message: "Too many requests, please try again later",
  },
});

//Routes
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Job Board API is running",
  });
});
app.use("/api/auth", authLimiter, authRoutes)
app.use("/api/jobs",jobRoutes)
app.use("/api/profiles", profileRoutes);
app.use("/api/applications", applicationRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Job Board API is running"
  });
});
app.use(errorHandler)
export default app;