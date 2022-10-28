import express from "express";
import router from "./routes/students.js";
import bodyParser from "body-parser";
import mongoose from 'mongoose';

import { database, testDatabase } from './config/config.js';
import { sequelize } from "./db/index.js";
import path from 'path';
 import { fileURLToPath } from 'url';

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3010;

app.use(express.static('public'))
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect("mongodb://192.168.56.20:27017/students");
  console.log(`Connected to Prod DB`);
} else {
  mongoose.connect("mongodb://192.168.56.20:27017/students_test");
  console.log(`Connected to Test DB`);
}
app.use("/api/students", router);

 app.use("/cicd", (req, res ) => {
   res.sendFile('pages/index.html', {root: __dirname })
 });

app.get("/api", (req, res) => {
  res.send("Welcome to my API!");
});
app.get("*", (req, res) =>
  res.status(404).send("There is no content at this route.")
);

app.listen(port, () => console.log(`Server is listening on port ${port}`));

export default app;