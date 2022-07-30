const AWS = require("aws-sdk");
const { accessKeyId, secretAccessKey, bucketName } =
  require("../../config/keys").aws;
const uuidv1 = require("uuid/v1");

// upload base64 file.
exports.upload = (base64, key, folder, fileName, size) => {
  return new Promise((resolve, reject) => {
    const base64Data = new Buffer.from(
      base64.split(";")[1].replace(/^base64,/, ""),
      "base64"
    );

    const name = uuidv1() + "/" + fileName;

    const params = {
      Bucket: bucketName,
      Key: `${folder || "forms"}/` + name,
    };

    const s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      params,
    });

    s3.upload({ ACL: "public-read", Body: base64Data }, (err, data) => {
      // Whether there is an error or not, delete the temp file
      if (err) {
        return reject(err);
      }
      return resolve({
        type: key,
        url: data.Location,
        name: fileName || undefined,
        size,
      });
    });
  });
};
