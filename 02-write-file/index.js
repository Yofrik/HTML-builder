const fs = require('fs');
const path = require('node:path');
const process = require('node:process');
const filePath = path.join(process.cwd(), '02-write-file', 'text.txt');
const readline = require('readline');


function writeToFile(filePath) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const onExit = () => {
    console.log('\n Хорошего дня :-)');
    process.exit(0);
  }
  rl.on('SIGINT', onExit);

  rl.question('Введите текст для записи в файл: ', function(input) {
    rl.off('SIGINT', onExit);
    rl.close();
    
    const data = input.trim();
    if (data == 'exit'){
      onExit()
    }
    else{
      fs.writeFile(filePath, data, function(err) {
        if (err) {
          console.error('Ошибка записи файла:', err);
        } else {
          console.log('Файл успешно записан');
          writeToFile(filePath);
        }
      });
    }
    
  });
}


writeToFile(filePath);


