require("dotenv").config({ path: "../.env" });
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACESSKEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACESS,
  region: process.env.AWS_DEFAULT_REGION,
});

var s3 = new AWS.S3();

module.exports = {
    uploadS3({filename, bucket, data}){
        return new Promise((resolve, reject) => {
          s3.putObject({
            Key: filename,
            Bucket: bucket,
            Body: data,
            ACL: 'public-read'
          }, (err, data) => {
            if (err){
              reject(err)
            } else {
              resolve(data)
            }
          });
        })
    }    
}
