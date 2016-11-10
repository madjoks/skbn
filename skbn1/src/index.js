import express from 'express'
import fetch from 'isomorphic-fetch'
import canonize from './canonize'



const app = express()

app.get('/task2c', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  const user_name = canonize(req.query.username || '');
  if (!user_name)
      res.send('Invalid username')
  res.send( '@' + user_name);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
