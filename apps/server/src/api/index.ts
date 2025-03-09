import express from "express";
import cors from "cors";
import depositRoutes from "./routes/deposits";
import balanceRoutes from "./routes/balances";
import walletRoutes from "./routes/wallets";
import ratesRoutes from "./routes/rates";
import historyRoutes from "./routes/history";
import yieldRoutes from "./routes/yield";
import orderRoutes from "./routes/orders";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use("/api", depositRoutes);
app.use("/api", balanceRoutes);
app.use("/api", walletRoutes);
app.use("/api", ratesRoutes);
app.use("/api", historyRoutes);
app.use("/api", yieldRoutes);
app.use("/api", orderRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).send({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
