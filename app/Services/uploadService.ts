const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
})
export const upload = async (img) => {
  let stream = fs.createReadStream(img.tmpPath)
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: new Date().getTime() + img.clientName, // File name you want to save as in S3
    Body: stream,
  }
  const upload = await new Promise(function(resolve, reject) {
    s3.upload(params, function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(data.Location)
    })
  })
  return upload
}
