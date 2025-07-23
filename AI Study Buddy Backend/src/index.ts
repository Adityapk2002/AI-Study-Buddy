import express from 'express';
import aiRoutes from './routes/aiRoutes';
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }));

app.use("/api", aiRoutes);

app.listen(3000 , () => {
    console.log("Listening on port 3000");
    
})

