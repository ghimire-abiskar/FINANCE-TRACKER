const express = require('express');
const connectToMongo = require('./db')
const cors = require('cors')
const app = express();
const authRoutes = require('./routes/auth')
const transRoutes = require('./routes/transaction')
const rateLimit = require('express-rate-limit');
const port = 5001;
app.use(express.json())
app.use(cors({
    credentials: true,
}));

const limiter = rateLimit({
    max: 3,
    windowMs: 20 * 1000,
    message: "Too many requests!!!"
})

app.get('/', (req, res) => {
    res.send("Hey I am here!!");
})

app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/trans', transRoutes);

app.listen(port, () => {
    console.log(`Server is running in the port ${port}`)
})


connectToMongo();

