"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const AWS = require('aws-sdk');
const uploadPhoto = () => __awaiter(void 0, void 0, void 0, function* () {
    const myBucket = "images-for-cfc";
    // const myKey = 'file-name.pdf'
    const signedUrlExpireSeconds = 60 * 5;
    const s3 = new AWS.S3();
    AWS.config.update({ accessKeyId: 'AKIAIGILYHR4XERGL5AQ', secretAccessKey: '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' });
    const url = yield s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        // Key: myKey,
        Expires: signedUrlExpireSeconds
    });
    console.log(url);
    return url;
});
module.exports = uploadPhoto;
