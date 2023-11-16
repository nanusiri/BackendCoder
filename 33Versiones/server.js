import express from "express"

const app = express()

const port = 8080

app.listen(port, () => {
    `Server is running on port ${port}`
})