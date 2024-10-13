import express from "express";
import cors from "cors";

import shirtsRouter from "./routes/shirts.js";
import optionsRouter from "./routes/options.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shirts", shirtsRouter);
app.use("/api/options", optionsRouter);

app.get("/", (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">DIY Delight API</h1>');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
