const express = require("express");
const cors = require("cors"); 
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const materialsRouter = require("./routes/materials");
const lostFoundRouter = require("./routes/lostFound");
const app = express();
const port = process.env.PORT || 5010;

app.use(cors());  
app.use(express.json()); 
app.use("/users", usersRoutes);
app.use("/materials", materialsRouter);
app.use("/lostFound", lostFoundRouter);
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});
