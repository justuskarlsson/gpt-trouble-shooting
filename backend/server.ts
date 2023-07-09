import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import { api } from "./api";

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', api);
// app.set('views', path.join(__dirname, "..", "client"));

// app.use(express.static(path.join("src", "client")));
// app.use('/js', express.static(path.join("dist", "js"))); // Add this line

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});