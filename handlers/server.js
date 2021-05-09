const express = require('express')
const app = express()
module.exports=async (bot) => {
    app.listen(process.env.PORT)
    app.get('/', function (req, res) {
      res.send('机器人在线！')
  })
}