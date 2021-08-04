require('dotenv').config();

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

const express = require('express');
const app = express();
// Ligne du dessous à mettre en commentaire pour le localhost
app.use(requireHTTPS);
app.use(express.static('./dist/front-course'));
app.get('/*', function (req, res) {
  res.sendFile('index.html',
    {
      root: './dist/front-course'
    }
  );
});
const appListen = app.listen(process.env.PORT || 4200);
console.log('Le serveur fonctionne sur le port ' + appListen.address().port);
