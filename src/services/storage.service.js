const {ImageKit} = require('@imagekit/nodejs');
const { createPrivateKey } = require('node:crypto');
require('dotenv').config();


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName: 'image.jpg',
    });
    return result.url;


}
module.exports = uploadFile;

