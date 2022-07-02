import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

var app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 8080);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join('build', 'index.html'));
    });
  }