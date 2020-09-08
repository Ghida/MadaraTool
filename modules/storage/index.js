const { uploadFileToS3 } = require('./aws');
const { uploadFileToBunnyCdn } = require('./bunnycdn');
const download = require('./download');

module.exports = function (options, callback) {
    let { uri, filePath, fileName, subPathUrl, storage } = options;
    switch (storage) {
        case 'amazon':{
            return uploadFileToS3(uri, subPathUrl, fileName, callback);
        }
        case 'bunnycdn':{
            return uploadFileToBunnyCdn(uri, subPathUrl, fileName, callback);
        }
        default: {
            return download(uri, filePath, fileName, subPathUrl, callback);
        }
    }
};