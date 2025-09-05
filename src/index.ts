import express from "express";
import { moderateText } from "./moderation";
import { ModerationRequest } from "./types";

const app = express();
app.use(express.json());

app.post("/check", (req, res) => {
  const body = req.body as ModerationRequest;

  if (!body.text) {
    return res.status(400).json({ error: "Missing text field" });
  }

  const result = moderateText(body.text);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Moderation API running on port ${PORT}`);
});
