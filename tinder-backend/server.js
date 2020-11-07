import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js";
import Cors from "cors";

// App config
// init express
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:v5uOjJtaWcqgzBn7@cluster0.yfpld.mongodb.net/tinderdb?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// API Endpoints
app.get('/', (req, res) => {res.status(200).send('Hello World!')});

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/card', (req, res) => {
    Cards.find((error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(data);
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
