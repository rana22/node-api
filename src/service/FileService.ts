import IAuthService = require("./IAuthService");
import {ITokenModel} from "../model/ITokenModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import ITokenDao = require("../dao/ITokenDao");
import TYPES from "../config/Types";
import IFileService = require("./IFileService");
import AWS = require('aws-sdk');

@injectable()
class FileService implements IFileService {

    private s3: AWS.S3;
    static S3_BUCKET : string = process.env.S3_BUCKET;

    constructor () {
        this.s3 = new AWS.S3();
    }

    public sign(_fileName: string, _fileType: string) : Promise<Object> {
        let S3_BUCKET = process.env.S3_BUCKET;
        let s3Params = {
            Bucket: S3_BUCKET,
            Key: _fileName,
            Expires: 60,
            ContentType: _fileType,
            ACL: 'public-read'
        };
        return new Promise<Object>((resolve, reject) => {
            this.s3.getSignedUrl('putObject', s3Params, (error, results) => {
                if(error) {
                    reject(error);
                }else {
                    resolve({
                        signedRequest: results,
                        url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + _fileName
                    });
                }
            });
        });
    }

}

export = FileService;