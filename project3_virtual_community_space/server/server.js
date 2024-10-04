import express from "express";
import router from "./routes/events.js";

const app = express();

app.use("/events", router);

app.get("/", (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Community Events API</h1>');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
