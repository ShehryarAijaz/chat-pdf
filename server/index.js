import express from 'express'
import cors from 'cors'
import { queue } from './middlewares/bullmq.middleware.js'

const app = express()
app.use(cors({
    origin: '*',
}))

app.get('/test', (req, res) => {
    res.json({
        message: 'All good',
        success: true,
    })
})

import uploadRoutes from './routes/uploadFile.js'

app.use('/chat', uploadRoutes)

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})