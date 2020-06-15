const AWS = require('aws-sdk')

const uploadPhoto = async () => {
    const myBucket = "images-for-cfc"
    // const myKey = 'file-name.pdf'
    const signedUrlExpireSeconds = 60 * 5

    const s3 = new AWS.S3()
    AWS.config.update({ accessKeyId: 'AKIAIGILYHR4XERGL5AQ', secretAccessKey: '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' })

    const url = await s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        // Key: myKey,
        Expires: signedUrlExpireSeconds
    });

    console.log(url);
    return url;
}

module.exports = uploadPhoto;