var isNotIncluded = function(el, arr) {
	for (i in arr) {
		var currentEl = arr[i];
		if (el === currentEl) {
			return false;
		}
	}
	return true;
}


var getMenu = function() {
	var apiRequest = $.ajax({
	  	url: 'https://galvanize-eats-api.herokuapp.com/menu',
	  	method: "GET",
	});

	apiRequest.done(function(data) {
		var menu = data.menu;
		var itemTypes = [];
		
		for (i in menu) {
			var item = menu[i];
			var optGroup = item.type;
			if (isNotIncluded(optGroup, itemTypes)) {
				itemTypes.push(optGroup);
			}
		}

		for (i in itemTypes) {
			var type = itemTypes[i];
			var optGroup = $('<optGroup>').addClass(type).attr('label', type);
			$('select').append(optGroup);
		}

		for (i in menu) {
			var item = menu[i];
			console.log(item.price);
			var option = $('<option>').html(item.name + " " + item.price);
			var type = $('.' + item.type);
			type.append(option);
		}

	})
}

getMenu();

