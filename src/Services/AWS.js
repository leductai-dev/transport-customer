import * as AWS from "aws-sdk";

const configuration = {
  // secretAccessKey: "j7uacGWvcCsri9w9QspywqEGSAxCHLjbyFu7HA5D",
  // accessKeyId: "AKIAVXBBB54RSF2RUKC4"
  // read-only access
  region: process.env.REACT_APP_AWS_REGION,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID.

  // set setRegion(reg) {
  //   this.region = reg;
  // },
  // set setSecretAccessKey(accessKey) {
  //   this.secretAccessKey = accessKey;
  // },
  // set setAccessKeyId(keyId) {
  //   this.accessKeyId = keyId;
  // }
  // firebase - encoded/dupicate format data
  // decode
  // set region, acces, id
};

AWS.config.update(configuration);

export default AWS;
