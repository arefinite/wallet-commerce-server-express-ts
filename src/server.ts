import 'dotenv/config'
import { app } from "./api/app"
import { connectDB } from "./config/db"

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    connectDB()
})