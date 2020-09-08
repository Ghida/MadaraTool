const AWS = require('aws-sdk'), fs = require('fs'), request = require('request');
AWS.config.update({
    accessKeyId: gConfig.s3.accessKeyId,
    secretAccessKey: gConfig.s3.secretAccessKey
});

const s3 = new AWS.S3();

async function uploadFileToS3(url, subPath, fileName, callback){
    let stream  = await gHelper.getStream(url);
    if(!stream){
        return callback(null);
    }

    const params = {
        Bucket: gConfig.s3.bucketName,
        Body : stream,
        Key : subPath + fileName,
        ACL: 'public-read'
    };
    s3.upload(params, function (err, data) {
        if (err || !data) {
            console.log("Error", err);
            return callback(null);
        }
        callback(data.Location);
    });
}


module.exports = {
    uploadFileToS3
};