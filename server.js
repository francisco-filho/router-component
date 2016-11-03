var express = require('express'),
app = express(),
fs = require('fs')

app.use('/home/', express.static('build'))

app.get('/home/', (req, res)=>{
  
  res.send(fs.readFileSync('index.html', 'utf8'))
})

app.listen(3000, ()=> {
  console.log('server listening o port 3000')
})
