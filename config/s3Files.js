// The dotenv package will load our .env file
// and make our AWS credentials available BEFORE
// the aws-sdk is loaded.
require('dotenv').config();

// Load the AWS SDK after the aws credentials are available
const AWS = require('aws-sdk');
// Call the S3 constructor in the SDK
const s3 = new AWS.S3();
// Require UUID so that we can use it later
const uuid = require('uuid');

const s3Upload = (file) => {
  // Make sure we actually get a file
  if (file) {
    // Create a promise to start a promise chain
    return new Promise((resolve, reject) => {
      // Set up the params object to send to
      // S3 with the file and required information
      // Bucket is the name of the bucket to store it in
      // Key is the file name to use (must be unique so we're using uuid)
      // Body is the file itself
      // ContentType is the file's mimetype
      // ACL is the access control for the image when it's uploaded
      const params = {
        Bucket: 'blucidfiles', // <-- Add your configured bucket here
        Key: `${uuid.v4()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.type,
        ACL: 'public-read',
      };
      // Upload everything and use the callback
      // to pass the error to reject the promise
      // otherwise pass the data to resolve the promise
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } else {
    // If there wasn't a file, return null rather than error out
    return 'no file';
  }
};

module.exports = s3Upload;