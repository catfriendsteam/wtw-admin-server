import express from "express";
import morgan from "morgan";
import router from "./api/index";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json());

//logging
app.use(morgan("common"));
//apis
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;
