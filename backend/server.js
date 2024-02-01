import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT

const app = express()

connectDB()

app.get('/', (req, res) => {
  res.send('api running .....')
})

app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
