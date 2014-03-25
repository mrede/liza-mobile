angular.module('starter.services', [])
.factory('BucketService', function () {
    return {
        BucketList: [],
        GetAllBuckets: function () {
            if (this.BucketList.length == 0) {
              //see if any in storage ready to go
              var buckets = window.localStorage.getItem('buckets');
              console.log("BUCKET: ", buckets);
              if (buckets.length> 0) {
                this.BucketList = JSON.parse(buckets);
              }
            }
            return this.BucketList;
        },
        GetBucketById: function (id) {
            //iterate MoviesList and return proper movie
            console.log("Getting buckets", id)
            var i, bucket;
            for (i=0; i<this.GetAllBuckets().length; i++) {
              bucket = this.BucketList[i];
              console.log("Bucket: ", bucket)
              if (bucket.friendly_name_key == id) {
                return bucket;
              }
            }
        },
        SetBuckets: function(buckets) {
          console.log("Setting buckets")
          this.BucketList = buckets;
        }

    }
})
;
