import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch'
import getPCItmes from './pcitems';

const app = express();
app.use(cors());

app.get('/task3a', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items);
});

app.get('/task3a/volumes', async (req, res) => {

  var items =  await getPCItmes();
  var result = {}
  items.hdd.forEach(function (item){
      var old_value = result[item.volume] || 0;
      result[item.volume] = old_value+item.size;
  });

  for(var index in result) {
    result[index] = result[index]+'B'; 
  }
  return res.json(result);
});

app.get('/task3a/ram', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.ram);
});

app.get('/task3a/os', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.os);
});

app.get('/task3a/floppy', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.floppy);
});

app.get('/task3a/hdd', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.hdd);
});

app.get('/task3a/board/vendor', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board.vendor);
});

app.get('/task3a/board/model', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board.model);
});


app.get('/task3a/board/cpu', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board.cpu);
});

app.get('/task3a/board/cpu/model', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board.cpu.model);
});

app.get('/task3a/board/cpu/hz', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board.cpu.hz);
});

app.get('/task3a/board/image', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board.image);
});

app.get('/task3a/board/video', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board.video);
});

app.get('/task3a/board', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.board);
});

app.get('/task3a/ram/vendor', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.ram.vendor);
});

app.get('/task3a/ram/volume', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.ram.volume);
});

app.get('/task3a/ram/pins', async (req, res) => {

  var items =  await getPCItmes();
  return res.json(items.ram.pins);
});

app.get('/task3a/ram/someField', async (req, res) => {

  var items =  await getPCItmes();
  return res.status(404).send('Not Found');
});

app.get('/task3a/monitor', async (req, res) => {

  var items =  await getPCItmes();
  return res.send(''+items.monitor);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
