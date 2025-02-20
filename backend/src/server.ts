import express from "express";
import router from "./routes/orderRoutes";
const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
