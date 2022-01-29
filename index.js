const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req,res) => res.send('Ready'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});