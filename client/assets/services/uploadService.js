// This is build based on this blog post:
// http://www.ryansouthgate.com/2015/12/24/upload-amazon-s3-using-angularjs/


myApp.service('S3UploadService', ['$q', function ($q) {
    // Us standard region
    AWS.config.region = 'us-west-1';
  
//****************************************************
//  THIS IS BAD VERY VERY BAD CHANGE IT 
//  CHANGE IT NOW!!!!!!!
    AWS.config.update({ accessKeyId: 'AKIAIL464TO2SCMVRX4Q', secretAccessKey: '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' });
//  WHAT ARE YOU DOING CHANGE THE CODES ^^^^
//****************************************************
  
    var bucket = new AWS.S3({ params: { Bucket: 'liftspec', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

    this.Progress = 0;
    this.Upload = function (file) {
        var deferred = $q.defer();
        var params = { Bucket: 'liftspec', Key: file.name, ContentType: file.type, Body: file };
        var options = {
            // Part Size of 10mb
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            // Give the owner of the bucket full control
            ACL: 'bucket-owner-full-control'
        };
        var uploader = bucket.upload(params, options, function (err, data) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve();
        });
        uploader.on('httpUploadProgress', function (event) {
            deferred.notify(event);
        });

        return deferred.promise;
    };
}]);