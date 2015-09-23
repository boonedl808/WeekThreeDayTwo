var APromise = {};

APromise.all = function(promises) {
	// var file = [];
	// for (var i = 0; i < 100; ++i);
	return Promise.all(promises);
};

APromise.race = function(promises){
	return Promise.race(promises);
};

APromise.resolve = function(value){
	return Promise.resolve(value);
};

APromise.reject = function(err){
	return Promise.reject(err);
};

module.exports.APromise = APromise;
