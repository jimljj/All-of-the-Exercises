window.onload = function () {
	var dataset = [ "I like dog", "I like cat", "I like snake"];
	var ul = d3.select("body").select("#fruits");
	var li = ul.selectAll("#apple");

	li.data(dataset);

	li.text(function(d, i){
		return this.innerHTML + ",  " + d + "!";
	});

	li.style({ "color": "red", "font-size": "36px"});

	ul.append("li").text("Append li element");

	ul.insert("li", ":first-child").text("Insert li element");

	ul.select("#apple").remove();
}