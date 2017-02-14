This creates a Lambda function that will hang after initial invokation.

To build and deploy:

    npm install
    aws cloudformation package --template-file promise-hang.yml --output-template-file hanger.yml --s3-bucket <target-bucket>
    aws cloudformation deploy --template-file hanger.yml --stack-name hanger --capabilities CAPABILITY_IAM
