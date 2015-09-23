function mapAsync(iterator, obj, context) {
	var result = obj.map(iterator);
	return Promise.all(result);
}

function mapAsyncWithOrder(iterator, array, context, descending) {
	var initalValue = Promise.resolve([]);
	if(!Array.isArray (array)) {
		return initalValue;
	}
	iterator = iterator.bind(context);
	var inOrder = function(prevValue, nextValue, nextIndex, array) {
		return prevValue.then(function(items) {
			return iterator (nextValue, nextIndex, array).then(function(moreItems) {
				return items.concat(moreItems);			
			});
		});
	}
	if (descending) {
		return array.reduceRight(inOrder, initalValue);
	}
	return array.reduce(inOrder, initalValue)
};	
	
function mapAsyncInOrder(iterator, array, context) {
	return mapAsyncWithOrder(iterator, array, context, false);
};

function mapAsyncInDescendingOrder(iterator, array, context) {
	return mapAsyncWithOrder(iterator, array, context, true);
};