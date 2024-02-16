import express from "express";
import cors from "cors";
import api from "./src/api/api.js";

const app = express();

app.use(cors());

app.use('/api', api);

app.listen(5001, () => {
  console.log('Server listening on port 5001...');
});