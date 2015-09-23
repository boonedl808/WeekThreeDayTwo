describe('APromise', function(){
	describe('function', function(){
		describe('resolve', function(){
			it('should be a function', function(done){
				expect(APromise.resolve).to.be.an('function');
				done();
			});
		});
		describe('reject', function(){
			it('should be a function', function(done){
				expect(APromise.reject).to.be.an('function');
				done();
			});
		});
		describe('race', function(){
			it('should be a function', function(done){
				expect(APromise.race).to.be.an('function');
				done();
			});
		});
		describe('all', function(){
			it('should be a function', function(done){
				expect(APromise.all).to.be.an('function');
				done();
			});
		});
	});

	describe('resolve', function(){
		it('should return a promise', function(done){
			var promise = APromise.resolve();
			expect(promise).to.have.property('then');
			done();
		});
		describe('response', function(){
			var reason;
			afterEach(function(){
				expect(reason).to.be("Testing");
            });

			it('should return value', function(done){
				Promise.resolve("Testing").then(function(res) {
						reason = res
					}, function(err) {
					  reason = err;
					});
				done();
			});
		});
	});
	describe('reject', function(){
		it('should return a promise', function(done){
			var promise = APromise.reject();
			expect(promise).to.be.property('then');
			done();
		});
		describe('error', function(){
			var reason;
			afterEach(function(){
				expect(reason).to.be("Testing Error");
            });

			it('should return errors', function(done){
				Promise.reject("Testing").then(function(res) {
					// not called
					reason = res;
					}, function(err) {
					  reason = err + " Error"; // "Testing static reject"
					});
				done();
			});
		});
	});
	describe('race', function(){
		it('should return a promise', function(done){
			var promise = APromise.race();
			expect(promise).to.have.property('then');
			done();
		});

		describe('finish race(resolve vs. reject)', function(){
			var reason;
			afterEach(function(){
				expect(reason).to.be("six was faster");
            });
			it('should resolve value or reject with a reason', function(done){
				var p5 = new Promise(function(resolve, reject) {
					setTimeout(resolve, 500, "five was faster");
				});
				var p6 = new Promise(function(resolve, reject) {
					setTimeout(reject, 100, "six was faster");
				});

				APromise.race([p5, p6]).then(function(value) {
				// Not called
					reason = value;
				}, function(err) {
					reason = err;
				});
				setTimeout(done, 100);

			});

		});

	});
	describe('all', function(){
		it('should return a promise', function(done){
			var promise = APromise.all();
			expect(promise).to.have.property('then');
			done();
		});
		describe('resolve empty', function(){
			var reason;
			afterEach(function(){
				expect(reason).to.be.an('array');
            });
			it('should resolve empty array', function(done){
				APromise.all([]).then(function(value) {
					reason = value;
				}, function(err) {
					reason = err;
				});
				setTimeout(function(){
					done();
				}, 100);

			});
		});
		describe('resolve all', function(){
			var reason;
			afterEach(function(){
				expect(reason).to.eql([2, 3, 4]);
            });
			it('should resolve empty array', function(done){
				var promises = [2, Promise.resolve(3), 4];
				APromise.all(promises).then(function(success){
					reason = success;
				}, function(err) {
					console.log('err');
				});
				setTimeout(function(){
					done();
				}, 100);

			});
		});

		describe('reject all', function(){
			var reason;
			afterEach(function(){
                expect(reason).to.eql(3);
            });
			it('should reject immediately if any of the passed in promises rejects, even if some promises have alreay resolved', function(done){
			var promises = [2, APromise.reject(3), 4];

            APromise.all(promises).then(function(success){

            }, function(err) {
				reason = err;
			});


				setTimeout(function(){
					done();
				}, 100);
			});
		});
	});



});