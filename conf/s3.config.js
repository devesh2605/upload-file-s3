const AWS = require('aws-sdk');
const config = require('./config');

const s3Client = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.REGION,
    ACL: 'public-read'
});

const uploadParams = {
    Bucket: config.BUCKET_NAME,
    Key: '',
    Body: null,
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;