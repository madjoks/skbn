import express from 'express'
import fetch from 'isomorphic-fetch'
import canonize from './canonize'



const app = express()

app.get('/task2a', function (req, res) {
  const a = parseInt(req.query.a) || 0;
  const b = parseInt(req.query.b) || 0;

  res.send('' + (a + b));
})

app.get('/task2b', function (req, res) {
  const fullname = req.query.fullname;
  if (!fullname)
    res.send('Invalid fullname');
    
  let fio = fullname.split(' ');
  const fio_length = fio.length;
  if (fio_length>3 || fio_length<1)
    res.send('Invalid fullname');

  let result = fio[fio_length-1];
  fio.slice(0, fio_length-1).forEach((item)=>{
    result += ' ' + item[0] + '.';
  });
  res.send(result);
})

app.get('/task2c', function (req, res) {
  const user_name = canonize(req.query.username || '');
  if (!user_name)
      res.send('Invalid username')
  res.send( '@' + user_name);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
