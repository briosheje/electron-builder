type NullOrUndefinedOrString = null | undefined | string;

/**
 * Computes the virtual hosted site url following the AWS standard specified in
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html
 * 
 * @param bucketName Bucket name created on AWS (without arn::)
 * @param [regionCode] Targeted region (ex: us-east-1)
 * @returns 
 */
 function toVirtualHostedSiteUrl(bucketName: string, regionCode?: NullOrUndefinedOrString) {
  if (!bucketName) {
    throw new Error(`bucketName is mandatory to calculate the AWS virtual hosted style access url.`);
  }

  if (regionCode && (regionCode.length < 2 || regionCode.length > 25)) {
    // Check region length.
    throw new Error(`Region ${regionCode} does not satisfy the AWS region length constraints. Please check https://docs.aws.amazon.com/health/latest/APIReference/API_OrganizationEvent.html`);
  }
  const regionUrlContent = regionCode ? `.${regionCode}` : '';

  return `https://${bucketName}.s3${regionUrlContent}.amazonaws.com`;
}