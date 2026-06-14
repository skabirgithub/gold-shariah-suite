const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://registry.npmjs.org/npm/-/npm-10.8.1.tgz';
const dest = path.join(__dirname, 'npm.tgz');

function download(url, dest) {
  console.log('Fetching npm: ' + url);
  const req = https.get(url, (response) => {
    console.log('Status: ' + response.statusCode);
    if (response.statusCode !== 200) {
      console.error('Failed - status code: ' + response.statusCode);
      process.exit(1);
    }

    const contentLength = parseInt(response.headers['content-length'], 10);
    console.log('Content-Length: ' + contentLength);

    const file = fs.createWriteStream(dest);
    response.pipe(file);

    response.on('aborted', () => {
      console.error('Response aborted!');
      process.exit(1);
    });

    file.on('finish', () => {
      file.close(() => {
        const stats = fs.statSync(dest);
        console.log('Downloaded file size: ' + stats.size);
        if (contentLength && stats.size !== contentLength) {
          console.error('Error: Size mismatch!');
          fs.unlink(dest, () => {});
          process.exit(1);
        } else {
          console.log('Download completed successfully!');
          process.exit(0);
        }
      });
    });
  });

  req.on('error', (err) => {
    console.error('Request error: ' + err.message);
    process.exit(1);
  });
}

download(url, dest);
