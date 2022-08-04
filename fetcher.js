`use strict`;
let input = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

const download = (url, localPath, callback) => {
  request(url, (error, statusCode, body) => {
    afterDownload(localPath, body);
  });
}

const afterDownload = (path, content) => {
  console.log()

  fs.writeFile(path, content, { flag: 'r+' }, err => {
    if (err) {
      console.error(err);
    }
  });

  fs.stat('./index.html', (err, stats) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(stats);
      console.log(`Downloaded and saved ${stats.size} bytes to ${path}`)
    }
  });
}

// takes URL and a localPath
download(input[0], input[1], afterDownload);
// download('http://www.example.edu/', './index.html', afterDownload);




// const request = require('request');
// request('http://www.google.com', (error, response, body) => {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
