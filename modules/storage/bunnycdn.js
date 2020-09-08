const request = require('request');


async function uploadFileToBunnyCdn(url, subPathUrl, fileName, callback) {
	url = url.trim();
	let stream = await gHelper.getStream(url);
	if(!stream){
		console.log('Stream null');
		return callback(null);
	}
	subPathUrl = subPathUrl ? subPathUrl + '/' : '';
	let fileLink = `https://storage.bunnycdn.com/${gConfig.bunnycdn.storageZoneName}/${subPathUrl}${fileName}`;
	request({
		url: fileLink,
		method: 'PUT',
		headers: {
			AccessKey: gConfig.bunnycdn.AccessKey,
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: stream
	}, function (error, response) {
		if(!error && response.statusCode === 201){
			return callback(`${gConfig.bunnycdn.pullZone}/${subPathUrl}${fileName}`);
		}
		if(error){
			console.log('Upload to bunnycdn null', error);
		}
		callback(null);
	});
}

module.exports = {
	uploadFileToBunnyCdn
};
