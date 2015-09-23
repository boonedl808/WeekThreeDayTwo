describe('Async', function(){
	var array, call_order, callback;

	beforeEach(function() {
        array = [1,2,3,4,5,6];
        call_order = [];
        callback = function (num) {
            return new Promise (function(resolve) {
                setTimeout(function () {
                    resolve(num * num);
                    call_order.push(num);
                }, num);

            })
        };
    });

	describe('should promise', function(){
		describe('mapAsync', function(){
			it('should return a promise', function(done){
				expect(mapAsync(callback, array)).to.have.property('then');
				done();
			});
		});
		describe('mapAsyncInOrder', function(){
			it('should return a promise', function(done){

				expect(mapAsyncInOrder(callback, array)).to.have.property('then');
				done();
			});
		});
		describe('mapAsyncInDescendingOrder', function(){
			it('should return a promise', function(done){
				expect(mapAsyncInDescendingOrder(callback, array)).to.have.property('then');
				done();
			});
		});

	});

	describe('asynchronous', function(){
		describe('mapAsync', function(){
			var called, calledBefore;

			afterEach(function(){
				expect(calledBefore).to.be.lessThan(called);
			});

			it('should be asynchronous', function(done){
                mapAsync(callback, array).then(function(results) {
                    called =  Date.now();
                });

                calledBefore = Date.now();

                expect(called).to.be(undefined);

                setTimeout(function(){
                    done();
                }, 50)
			});
		});
		describe('mapAsyncInOrder', function(){
			var called, calledBefore;

			afterEach(function(){
				expect(calledBefore).to.be.lessThan(called);
			});

			it('should be asynchronous', function(done){
                mapAsyncInOrder(callback, array).then(function(results) {
                    called =  Date.now();
                });

                calledBefore = Date.now();

                expect(called).to.be(undefined);

                setTimeout(function(){
                    done();
                }, 50)
			});
		});
		describe('mapAsyncInDescendingOrder', function(){
			var called, calledBefore;

			afterEach(function(){
				expect(calledBefore).to.be.lessThan(called);
			});
			it('should be asynchronous', function(done){
                mapAsyncInDescendingOrder(callback, array).then(function(results) {
                    called =  Date.now();
                });

                calledBefore = Date.now();

                expect(called).to.be(undefined);

                setTimeout(function(){
                    done();
                }, 50)
			});
		});

	});

	describe('async iterator', function(){
		describe('mapAsync', function(){
			var res;
			afterEach(function(){
                expect(res).to.eql([1, 4, 9, 16, 25, 36]);
            });

            it('should return results of running iterator over each element', function(done) {
                mapAsync(callback, array).then(function(results) {
                        res = results;
                });

                setTimeout(function(){
                    done();

                }, 50)

            });
		});
		describe('mapAsyncInOrder', function(){
			var res;
			afterEach(function(){
                expect(res).to.eql([1, 4, 9, 16, 25, 36]);
            });

            it('should return results of running iterator over each element', function(done) {
                mapAsyncInOrder(callback, array).then(function(results) {
                        res = results;
                });

                setTimeout(function(){
                    done();

                }, 50)

            });
		});
		describe('mapAsyncInDescendingOrder', function(){
			var res;
			afterEach(function(){
                expect(res).to.eql([36, 25, 16, 9, 4, 1]);
            });

            it('should return results of running iterator over each element', function(done) {
                mapAsyncInDescendingOrder(callback, array).then(function(results) {
                        res = results;
                });

                setTimeout(function(){
                    done();

                }, 50)

            });
		});
	});



	describe('return array', function(){
		describe('mapAsyncInOrder', function(){
			var res;
			afterEach(function(){
				expect(res).to.be.empty();
				expect(res).to.be.an('array');
            });
			it('should return empty array if input is not an array', function(done){
                mapAsyncInOrder(callback, {}).then(function(results) {
                        res = results;
                });

                setTimeout(function(){
                    done();

                }, 50)
			});
		});
		describe('mapAsyncInDescendingOrder', function(){
			var res;
			afterEach(function(){
				expect(res).to.be.empty();
				expect(res).to.be.an('array');
            });
			it('should return empty array if input is not an array', function(done){
                mapAsyncInDescendingOrder(callback, {}).then(function(results) {
                        res = results;
                });

                setTimeout(function(){
                    done();

                }, 50)
			});
		});

	});


	describe('order', function(){
		describe('mapAsyncInOrder', function(){
			afterEach(function(){
				expect(call_order[0]).to.be(1);
            });
			it('should start with first item in array as default', function(done){
                mapAsyncInOrder(callback, array);

                setTimeout(function(){
                    done();

                }, 50)
			});
		});
		describe('mapAsyncInDescendingOrder', function(){
			afterEach(function(){
				expect(call_order[0]).to.be(6);
            });
			it('should start with last item in array as default', function(done){
                mapAsyncInDescendingOrder(callback, array);

                setTimeout(function(){
                    done();

                }, 50)
			});
		});

	});















});
