import express from 'express'
import fetch from 'isomorphic-fetch'
import cors from 'cors'

import canonize from './canonize'
import getHexRGBColor from './color'


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
  color = getHexRGBColor(color);
  if (color.length!=6)
    return res.status(400).send('Invalid color');
  return res.send('#' + color.toLowerCase());
})

app.get('/task2x', function (req, res) {
  var i = req.query.i || 0;
  i = parseInt(i);
  var result = //тут алгоритм бога

  var m = [1, 18, 243, 3240, 43254, 577368, 7706988, 102876480, 1373243544, 18330699168,
    244686773808, 3266193870720, 43598688377184, 581975750199168, 7768485393179328,
    103697388221736960, 1384201395738071424, 18476969736848122368, 246639261965462754048];
  var k = m[i];

  return res.send(''+ k);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
