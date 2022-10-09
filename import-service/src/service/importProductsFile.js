import AWS from 'aws-sdk';

const importProductsFile = async (event) => {
  const { name } = event.queryStringParameters;

  if (!name) {
    return {
      statusCode: 400,
      message: "CSV name is required",
    };
  }

  const s3 = new AWS.S3({ region: "eu-west-1" });
  const bucketName = process.env.BUCKET_NAME;
  const key = `uploaded/${name}`;

  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 60,
    ContentType: "text/csv",
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise("putObject", params);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Error service",
      error: JSON.stringify(error),
    };
  }
};
export default importProductsFile;
