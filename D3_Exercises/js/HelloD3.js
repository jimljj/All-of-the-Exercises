window.onload = function () {
	var dataset = [ "I like dog", "I like cat", "I like snake"];
	var li = d3.select("body").select("#fruits").selectAll("#apple");

	li.data(dataset);

	li.text(function(d, i){
		return this.innerHTML + ",  " + d + "!";
	});

	li.style({ "color": "red", "font-size": "36px"});
}