import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const port = process.env.ACCESS_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
