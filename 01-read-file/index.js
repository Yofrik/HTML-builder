const fs = require('fs');
const path = require('node:path');
const filePath = path.join(process.cwd(), '01-read-file', 'text.txt');
const readStream = fs.createReadStream(filePath);

readStream.on('data', function(chunk) {
  console.log(chunk.toString());
});
