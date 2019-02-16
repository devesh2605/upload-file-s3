const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const stream = require('stream');
const config = require('./conf/config');
const s3 = require('./conf/s3.config');
const upload = require('./conf/multer.config');

/** Body Parser */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/api/upload', upload.single("file"), function (req, res) {

    const s3Client = s3.s3Client;
    const params = s3.uploadParams;

    params.Key = req.file.originalname;
    params.Body = req.file.buffer;

    s3Client.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({ 'message': 'Internal server error ',err });
        } else {
            let message = {
                'message': 'File uploaded successfully',
                'fileName': `https://s3.ap-south-1.amazonaws.com/${config.BUCKET_NAME}/${req.file.originalname}`
            }
            res.status(200).json(message);
        }
    });

});

app.listen(port, function () {
    console.log('Server is listening on port ', port);
});