const fs = require('fs');
const path = require('node:path');
const process = require('node:process');
const directPath = path.join(process.cwd(), '03-files-in-folder', 'secret-folder');

function readToDirect(directPath) {
    fs.readdir(directPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error('Ошибка чтения директории:', err);
        } 
        else {
            files.forEach((file) => {
            if (file.isFile()) {
                const filePath = path.join(directPath, file.name);
                fs.stat(filePath, (err, stats) =>{
                    if (err) {
                        console.error('Ошибка чтения параметров файла:', err);
                      } 
                    else{
                        console.log(`${path.parse(filePath).name} - ${path.extname(file.name)} - ${stats.size} bytes`)
                    };
                }
            )};
            });
        }
      });
}

readToDirect(directPath);