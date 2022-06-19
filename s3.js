require('dotenv').config
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY
const bucket_name = process.env.S3_BUCKET_NAME
const bucket_region = process.env.S3_REGION

const s3 = new S3({
   bucket_region, aws_access_key_id, aws_secret_access_key
})

function uploadFile(file) {
   const fileStream = fs.createReadStream(file.path)

   const uploadParams = {
      Bucket: bucket_name,
      Body: fileStream,
      Key: file.filename
   }

   return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

function getFileStream(fileKey) {
   const downloadParams = {
      Key: fileKey,
      Bucket: bucket_name
   }

   return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream