const express =require('express');
const connectToMongo=require('./db')
const cors=require('cors')
const mongoURI ='mongodb://localhost:27017/finance_tracker';
const app=express();
const authRoutes=require('./routes/auth')
const transRoutes=require('./routes/transaction')
const port=5001;
app.use(express.json())
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hey I am here!!");
})
app.use('/api/auth',authRoutes);
app.use('/api/trans',transRoutes);

app.listen(port,()=>{
    console.log(`Server is running in the port ${port}`)
})


connectToMongo();

