import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
} from "@aws-sdk/client-s3"
// Set the AWS Region.
const REGION = "il-central-1" //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION })

const params = {
  Bucket: "politai-1", // The name of the bucket. For example, 'sample-bucket-101'.
  Key: "sample_upload.txt", // The name of the object. For example, 'sample_upload.txt'.
  Body: "Hello world!", // The content of the object. For example, 'Hello world!".
}

export const runAws = async () => {
  // Create an Amazon S3 bucket.
  try {
    const data = await s3Client.send(
      new CreateBucketCommand({ Bucket: params.Bucket })
    )
    console.log(data)
    console.log("Successfully created a bucket called ", data.Location)
    return data // For unit tests.
  } catch (err) {
    console.log("Error", err)
  }
  // Create an object and upload it to the Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params))
    console.log(
      "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
    )
    return results // For unit tests.
  } catch (err) {
    console.log("Error", err)
  }
}
