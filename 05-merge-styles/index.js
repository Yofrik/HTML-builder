const fs = require('fs');
const path = require('node:path');
const process = require('node:process');
const directPath = path.join(process.cwd(), '05-merge-styles', 'styles');
const directmergePath = path.join(process.cwd(), '05-merge-styles', 'project-dist');

function mergeStyles(directPath) {
    fs.readdir(directPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Ошибка чтения директории:', err);
        } else {
            const cssFiles = files.filter(file => file.isFile() && path.extname(file.name) === '.css');
            console.log(cssFiles)
            const cssContents = [];
            
            cssFiles.forEach(file => {
                const filePath = path.join(directPath, file.name);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Ошибка чтения файла:', err);
                    } else {
                        cssContents.push(data);
                        if (cssContents.length === cssFiles.length) {
                            fs.writeFile(path.join(directmergePath, 'bundle.css'), cssContents.join('\n'), err => {
                                if (err) {
                                    console.error('Ошибка записи файла:', err);
                                } else {
                                    console.log('Объединение стилей завершено');
                                }
                            });
                        }
                    }
                });
            });
        }
    });
}

mergeStyles(directPath);
