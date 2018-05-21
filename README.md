# Example project demonstrating usage of Serverless framework for creating a CRUD Rest API using API gateway, Lambda with Node.js 8.10 runtime and Dynamodb for persistence

Serverless framework provides consistent packaging and deployment experience across cloud providers. It provides an abstraction on top of cloud vendor settings and configurations. This makes it easier to focus on actual functions instead of cloud specific configurations, packaging and deployments. In this example instead of using raw cloudformation template to spin up complete stack we will use an serverless framework. Under the hood serverless.yml uses cloudformation template for AWS.          

Just like raw cloudfrormation template [serverless.yml](serverless.yml) takes care of spinning up a CloudFormation stack comprising of -

   * API Gateway REST API
   * DynamoDB Table
   * Node.js 8.10 Lambda functions for CRUD operations on Account  
   * IAM Roles and Policies


This example project can be used as template to jump start Serverless API development. 

## How to run?

Prerequisite : [AWS account](https://aws.amazon.com/) and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
   
Install Serverless Framework - 

```
npm install serverless -g
```

After that create a package and cloudformation stack using following command

```
sls deploy

Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (6.31 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..................................................................................................................
Serverless: Stack update finished...
Service Information
service: serverless-api-lambda-dynamodb-example
stage: dev
region: us-west-2
stack: serverless-api-lambda-dynamodb-example-dev
api keys:
  None
endpoints:
  POST - https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts
  GET - https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts/{id+}
  GET - https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts
  PUT - https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts/{id+}
  DELETE - https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts/{id+}
  GET - https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/hello
functions:
  createAccount: serverless-api-lambda-dynamodb-example-dev-createAccount
  getAccount: serverless-api-lambda-dynamodb-example-dev-getAccount
  getAccounts: serverless-api-lambda-dynamodb-example-dev-getAccounts
  updateAccounts: serverless-api-lambda-dynamodb-example-dev-updateAccounts
  deleteAccount: serverless-api-lambda-dynamodb-example-dev-deleteAccount
  helloWorld: serverless-api-lambda-dynamodb-example-dev-helloWorld
```

## Test

Test the endpoints using following curl commands

Create Account - 

```
curl -i -X POST \                                                                            
  https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts \
  -H 'content-type: application/json' \
  -d '{
        "name":"Foo",
        "iban":"NL25ABNA0435472492"
}'

HTTP/2 201 
content-type: application/json
content-length: 128
date: Mon, 21 May 2018 19:37:38 GMT
x-amzn-requestid: 6ac40494-5d2e-11e8-8b67-718f823c1ffb
x-amz-apigw-id: HQHwPFayPHcFccQ=
x-amzn-trace-id: Root=1-5b032001-f509e6d2538974637bc5ebae
x-cache: Miss from cloudfront
via: 1.1 a459bf9dec7bba4e0a329e8ab2ebd928.cloudfront.net (CloudFront)
x-amz-cf-id: kL3IMgzi4EwmRdQOCZ7fJUyaJKv8fqF3Xju-0MaJes6UgKTwwO0YIw==

{"id":"6b480180-5d2e-11e8-9275-39f4e1e8b11f","name":"Foo","iban":"NL25ABNA0435472492","createdAt":1526931458456,"updatedAt":1526931458456}
```

Get Account -

```
curl -i -X GET \ 
  https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts/6b480180-5d2e-11e8-9275-39f4e1e8b11f
  
HTTP/2 200 
content-type: application/json
content-length: 128
date: Mon, 21 May 2018 19:42:33 GMT
x-amzn-requestid: 1a7b8a28-5d2f-11e8-ace2-3932708348fd
x-amz-apigw-id: HQIeTGmXvHcF5wg=
x-amzn-trace-id: Root=1-5b032128-bbcf64f5c4982abd6f346b31
x-cache: Miss from cloudfront
via: 1.1 9ece10f886f26459a29d505f7dc15d23.cloudfront.net (CloudFront)
x-amz-cf-id: iNDcWZXuJHr02GStW0rUpS9Qrjnq_SI_MV_pmFgWDYKGq_Ygk1J7eg==

{"id":"6b480180-5d2e-11e8-9275-39f4e1e8b11f","name":"Foo","iban":"NL25ABNA0435472492","createdAt":1526931458456,"updatedAt":1526931458456}
```

Update Account -

```
curl -i -X PUT \ 
  https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts/6b480180-5d2e-11e8-9275-39f4e1e8b11f \
  -H 'content-type: application/json' \
  -d '{
        "name":"Bar",
        "iban":"NL25ABNA0435472492"
}'

HTTP/2 200 
content-type: application/json
content-length: 0
date: Mon, 21 May 2018 19:43:20 GMT
x-amzn-requestid: 36d8e4cc-5d2f-11e8-bdd8-83a00846daaf
x-amz-apigw-id: HQIlvGWuvHcFZ0A=
x-amzn-trace-id: Root=1-5b032157-fa9d45eda83d906634f26893
x-cache: Miss from cloudfront
via: 1.1 ce2b03db99d40501c5695fce9dfbb777.cloudfront.net (CloudFront)
x-amz-cf-id: VGNK0CozL3ipCbGWxsrGZjmArmt_pF9FmOutyCPpwbEp8I0h5uYKIQ==
```

Get Accounts -

```
curl -i -X GET \
  https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts                                      

HTTP/2 200
content-type: application/json
content-length: 130
date: Mon, 21 May 2018 19:44:46 GMT
x-amzn-requestid: 69a5f4e4-5d2f-11e8-9194-b13541233785
x-amz-apigw-id: HQIzEHgCPHcFbIQ=
x-amzn-trace-id: Root=1-5b0321ad-c1cc417235030daa049d978f
x-cache: Miss from cloudfront
via: 1.1 4edcf55d6938e557aa2c6e71997d17b4.cloudfront.net (CloudFront)
x-amz-cf-id: XfB58gtI2DtRyWp2c5Qxk3bXg8ympTJyv3MaEH1BN_y8pCDOxs588Q==

[{"iban":"NL25ABNA0435472492","createdAt":1526931458456,"id":"6b480180-5d2e-11e8-9275-39f4e1e8b11f","name":"Bar","updatedAt":1526931800589}]
```

Delete Account -

```
curl -i -X DELETE \
  https://e5atxwgxtk.execute-api.us-west-2.amazonaws.com/dev/accounts/6b480180-5d2e-11e8-9275-39f4e1e8b11f
 
HTTP/2 200 
content-type: application/json
content-length: 0
date: Mon, 21 May 2018 19:45:35 GMT
x-amzn-requestid: 87718603-5d2f-11e8-8513-ffa125d6edb3
x-amz-apigw-id: HQI64FymvHcFwWw=
x-amzn-trace-id: Root=1-5b0321df-b021dddac58e20662121f796
x-cache: Miss from cloudfront
via: 1.1 c035b03e455c334ee837503784ad41c8.cloudfront.net (CloudFront)
x-amz-cf-id: KX1uEWob2gImG_KZVQzJZm1mi0lKHM5Aa0c5NvtvJi-rl9jOGxh4tg==
```


Finally you can delete the stack using following command - 

```
sls remove
         
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
......................................................................
Serverless: Stack removal finished...
``` 

Thanks to offline plugins for serverless and DynamoDB it's also possible to deploy and test API locally. For local deployment firs we need to install DynamoDB using following command -

```
sls dynamodb install
```

After that fire up local API using following command - 


```
sls offline start

Dynamodb Local Started, Visit: http://localhost:8000/shell
Serverless: DynamoDB - created table Account-dev
Serverless: Starting Offline: dev/us-west-2.

Serverless: Routes for createAccount:
Serverless: POST /accounts

Serverless: Routes for getAccount:
Serverless: GET /accounts/{id*}

Serverless: Routes for getAccounts:
Serverless: GET /accounts

Serverless: Routes for updateAccounts:
Serverless: PUT /accounts/{id*}

Serverless: Routes for deleteAccount:
Serverless: DELETE /accounts/{id*}

Serverless: Routes for helloWorld:
Serverless: GET /hello

Serverless: Offline listening on http://localhost:3000
```

As evident from console logs it spins up local DynamoDB. It is accessible via Web Shell at http://localhost:8000/shell You can test local API using above curl commands. Just swap API url with local one.   

