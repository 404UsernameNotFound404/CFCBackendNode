import express, { Application, Request, Response, NextFunction } from "express"
import "dotenv/config"
import bodyParser from "body-parser"

const app: Application = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {

  res.send("TS App is Running")

})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})