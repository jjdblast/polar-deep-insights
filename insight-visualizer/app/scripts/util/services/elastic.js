(function(){

  angular.module("polar.util.services")

  .service("polar.util.services.$ElasticSearch", ["$q", function($q){

    function ES(){
      this.instance = new elasticsearch.Client({
        host: '104.236.190.155:9200',
      });
    };

    ES.prototype.search = function(q, agg, args){
      var deferred = $q.defer(),
          body = { };

      args = args || { };

      if(q){
        body.query = q;
      };

      if(agg){
        body.aggs = agg;
      };

      body.fields = [ ] || args.fields;

      this.instance.search({
        index : ( args.index || 'polar-deep-cpy'),
        type:   ( args.docType || 'docs'),
        body: body,
        size: ( 0 || args.size ),
        from: ( 0 || args.from ),
      }).then(function(d){
        deferred.resolve(d);
      },function(d){
        deferred.reject(d);
      });

      return deferred.promise;
    };

    ES.prototype.paginate = function(q, agg, args){
      var perPage = 100,
          resp = [ ]
          deferred = $q.defer()
          self = this;

      function getTotal(){
        var d = $q.defer();
        self.search(q, agg).then(function(r){
          d.resolve(r.hits.total || 1);
        }, function(){
          d.reject(d);
        });
        return d.promise;
      };

      function paginate(total, iterator){
        iterator = ( iterator || 0 );

        if(iterator > total){
          deferred.resolve(resp);
          return;
        };

        self.search(q, agg, { from: iterator, size: perPage }).then(function(r){
          resp.push(r);
          paginate(total, iterator + perPage);
        }, function(r){
          deferred.reject(r);
        });

        return deferred.promise;
      };

      return getTotal().then(paginate);
    };

    return ES;

  }]);

}());
