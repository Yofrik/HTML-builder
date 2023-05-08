const fs = require('fs');
const path = require('node:path');
const process = require('node:process');
const directPath = path.join(process.cwd(), '04-copy-directory', 'files');
const directcopyPath = path.join(process.cwd(), '04-copy-directory', 'files-copy');
const fsPromises = require('fs/promises');


fsPromises.mkdir(directcopyPath, { recursive: true })
  .then(() => {
        fsPromises.chmod(directcopyPath, 0o777)
        .then(() => {
            fsPromises.copyFile(directPath, directcopyPath, fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE_FORCE)
            .then(() => {
                console.log('Папка успешно скопирована');
            })
            .catch((err) => {
                console.error('Ошибка копирования:', err);
            });
        })
        .catch((err) => {
            console.error('Ошибка установки прав:', err);
        });
  })
  .catch((err) => {
    console.error('Ошибка создания папки:', err);
  });


