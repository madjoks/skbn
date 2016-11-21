import express from 'express'
import fetch from 'isomorphic-fetch'
import cors from 'cors'

import canonize from './canonize'



const app = express()
app.use(cors());

app.get('/task2a', function (req, res) {
  const a = parseInt(req.query.a) || 0;
  const b = parseInt(req.query.b) || 0;

  res.send('' + (a + b));
})

app.get('/task2b', function (req, res) {
  const fullname = req.query.fullname;
  if (!fullname)
    res.send('Invalid fullname');
  if (/\d+|_|\\|\/|\./g.exec(fullname))
    res.send('Invalid fullname');

  let fio = fullname.split(' ');
  fio = fio.filter(function(str) {
    return /\S/.test(str);
  });
  const fio_length = fio.length;
  if (fio_length>3 || fio_length<1)
    res.send('Invalid fullname');

  let result = fio[fio_length-1].toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  fio.slice(0, fio_length-1).forEach((item)=>{
    result += ' ' + item[0].toUpperCase() + '.';
  });
  res.send(result);
})

app.get('/task2c', function (req, res) {
  let user_name = canonize(req.query.username || '');
  if (!user_name)
      res.send('Invalid username')
  res.send( '@' + user_name);
})

app.get('/task2d', function (req, res) {
  let color = req.query.color || '';
  color = color.replace(/\s/g, "");
  let color_length = color.length;
  console.log(color_length);
  console.log(color);
  if (color_length==3){
      color = Array(3).join(color[0]) + Array(3).join(color[1]) + Array(3).join(color[2]);
  }
  if (color_length>3 && color_length<6){
      color = color + Array(7-color_length).join(color[color_length-1]);
  }
  console.log(color);
  var is_color = /^#?[0-9A-F]{6}$/i.test(color);
  if (is_color)
    res.send( '#' + color.toLowerCase());

  res.status(400).send('Invalid color');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
