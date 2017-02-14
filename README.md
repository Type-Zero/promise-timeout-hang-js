This creates a Lambda functions for testing if they will hang after initial 
invocation.

To build and deploy:

    ./deploy.sh <s3_bucket_name>
    
# Conclusions
After reading up on [container reuse in Lambda][10]. I wanted to look more into how our context callbacks were working. I googled `lambda context.fail` and one of the first hits I found was [Using the Earlier Node.js Runtime v0.10.42 - AWS Lambda][1] which mentions in the [transitioning to new nodejs runtime][2] that the latest lambda wants us to use the newer callback method instead of using context object calls. 

I created a javascript project to test a combination of function handler types. Specifically ones that use the legacy context methods in its handler, ones that use the new callback method in its handler and one that has handlers that use both callback and context methods.

The function that exclusively uses the legacy callback methods exhibit the hanging issue with a significant warm up process (loading a lot of libs or as in your example loading a ton of hex) seems to always have the problem.  Code that uses the new callbacks but otherwise is the same actually doesn't exhibit the problem.

It appears that if because during the initial runtime there seems to be at least a compilation and perhaps optimization taking place if only legacy context methods are used some new code on the callback is perhaps optimized out which would stop the hang.

[1]: http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-using-old-runtime.html
[2]: http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-using-old-runtime.html#transition-to-new-nodejs-runtime
[10]: https://aws.amazon.com/blogs/compute/container-reuse-in-lambda/
