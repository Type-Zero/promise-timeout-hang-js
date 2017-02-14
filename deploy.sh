#!/usr/bin/env bash
if [ -z $1 ]; then
    echo "need an S3 bucket"
    exit 1
fi
S3_BUCKET=$1

function deploy (){
# $1 template-file without extension
    TMP_FILE=$(mktemp)
    aws cloudformation package --template-file $1.yml --output-template-file ${TMP_FILE} --s3-bucket ${S3_BUCKET}
    aws cloudformation deploy --template-file ${TMP_FILE} --stack-name $1 --capabilities CAPABILITY_IAM
    rm ${TMP_FILE}
}

# Deploy function handlers that are using v0.10.42 context methods
deploy promise-hang &
deploy promise-hang-cb &

for job in $(jobs -p); do
  wait $job
done
