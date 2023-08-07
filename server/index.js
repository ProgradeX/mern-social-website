import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // THIS NEEDS FIXING COZ ITS NOT TAKING IN THE ENV IN SERVER DIRECTORY
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" , extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// FILE STORAGE

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function ( req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage })

// MONGOOSE

const PORT = process.env.PORT || 6001;
const URL = process.env.MONGO_URL;
console.log(URL, PORT);
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`server port: ${PORT}`));
}).catch( (error) => console.log(`${error} did not connect`));
