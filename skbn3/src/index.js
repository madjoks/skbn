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

app.get('/task3a/*', async (req, res) => {

  var items =  await getPCItmes();
  var result = items;
  var path_steps = req.params[0].split('/');
  
  path_steps.forEach(function (item)
  {
      if(item=='' || result==undefined)
        return;

      if(typeof result =='string'){
        result = undefined;
        return;
      };
      if (result!=undefined){
          if (Array.isArray(result) && isNaN(item)){
              result=undefined;
          }
          else {
              result = result[item];
          }
      }
  })
  if (typeof result == "undefined") res.status(404).send('Not Found');
  if (result == null) return res.send(result+'');
  if (typeof result !== "object") return res.json(result);
  if (Object.keys(result).length>0) return res.json(result);
  res.status(404).send('Not Found');
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
