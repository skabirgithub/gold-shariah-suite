const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://github.com/oven-sh/bun/releases/latest/download/bun-windows-x64.zip';
const dest = path.join(__dirname, 'bun.zip');

function download(url, dest, redirectCount = 0) {
  if (redirectCount > 10) {
    console.error('Too many redirects');
    process.exit(1);
  }

  console.log('Fetching URL: ' + url);
  
  const req = https.get(url, (response) => {
    console.log('Status: ' + response.statusCode);
    if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
      const newUrl = response.headers.location;
      console.log('Redirecting to: ' + newUrl);
      download(newUrl, dest, redirectCount + 1);
      return;
    }
    if (response.statusCode !== 200) {
      console.error('Failed - status code: ' + response.statusCode);
      process.exit(1);
    }

    const contentLength = parseInt(response.headers['content-length'], 10);
    console.log('Content-Length: ' + contentLength);

    const file = fs.createWriteStream(dest);
    response.pipe(file);

    let aborted = false;
    response.on('aborted', () => {
      aborted = true;
      console.error('Response aborted by server!');
    });

    file.on('finish', () => {
      file.close(() => {
        const stats = fs.statSync(dest);
        console.log('Downloaded file size: ' + stats.size);
        if (aborted || (contentLength && stats.size !== contentLength)) {
          console.error('Error: Size mismatch or aborted download!');
          fs.unlink(dest, () => {});
          process.exit(1);
        } else {
          console.log('Download completed successfully!');
          process.exit(0);
        }
      });
    });

    file.on('error', (err) => {
      console.error('File write error: ' + err.message);
      fs.unlink(dest, () => {});
      process.exit(1);
    });
  });

  req.on('error', (err) => {
    console.error('Request error: ' + err.message);
    process.exit(1);
  });
}

download(url, dest);
