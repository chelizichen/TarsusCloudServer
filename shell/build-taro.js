const fs = require('fs');
const path = require('path');

const sourceDirectory = path.resolve(__dirname,'../src/taro'); // 源目录路径
const destinationDirectory = path.resolve(__dirname,'../dist/taro'); // 目标目录路径

function copyDirectorySync(source, destination) {
  // 递归创建目标目录
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // 读取源目录中的文件和子目录
  const items = fs.readdirSync(source);

  // 遍历源目录中的每个文件和子目录
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);

    // 如果是文件，则复制文件
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    }

    // 如果是子目录，则递归复制子目录
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectorySync(sourcePath, destinationPath);
    }
  }
}

copyDirectorySync(sourceDirectory, destinationDirectory);
console.log('Directory copied successfully');
