window.onload = function(){
	// 画布大小
	var width = 400;
	var height = 400;

	// 添加画布
	var svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height);

	// 画布周围的空白
	var padding = { left: 30, right: 30, top: 20, bottom: 20};

	// 数据
	var dataset = [12, 16, 28, 37, 40, 33, 24, 9];

	var ordinalArray = d3.range(dataset.length);
	ordinalArray.shift();
	ordinalArray.push(dataset.length);

	// 定义x轴序数比例尺
	var scaleX = d3.scale.ordinal()
		.domain(ordinalArray)
		.rangeRoundBands([ 0, width - padding.left - padding.right]);

	// 定义y轴线性比例尺
	var scaleY = d3.scale.linear()
		.domain([ 0, d3.max(dataset)])
		.range([height - padding.top - padding.bottom, 0]);		// 倒序，定义域越小，值域越大

	// 定义x轴
	var axisX = d3.svg.axis().scale(scaleX).orient("bottom");

	// 定义y轴
	var axisY = d3.svg.axis().scale(scaleY).orient("left");

	// 添加x轴
	svg.append("g").attr("class", "axis")
		.attr("transform", "translate(" + padding.left + "," + (height-padding.bottom) + ")")
		.call(axisX);

	// 添加y轴
	svg.append("g").attr("class", "axis")
		.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
		.call(axisY);

	// 矩形之间的空白
	var rectPadding = 4;

	// 添加足够多的矩形
	svg.selectAll(".my-rect").data(dataset).enter().append("rect")
		.attr("class", "my-rect")		// 添加样式
		.attr("x", function( d, i){
			return padding.left + rectPadding/2 + scaleX(++i);
		})
		.attr("y", function( d, i){
			var min = scaleY.domain()[0];			// 取值域最小的点，设定初始值
			return padding.top + scaleY(min);
		})
		.attr("height", 0)
		.attr("fill", "white")
		.transition().duration(2000).ease("bounce").delay(function( d, i){		// 添加过渡
			return i*200;
		})
		.attr("y", function( d, i){
			return padding.top + scaleY(d);
		})
		.attr("height", function( d, i){
			return height - padding.top - padding.bottom - scaleY(d);
		})
		.attr("width", scaleX.rangeBand() - rectPadding)
		.attr("fill","steelblue");

	svg.selectAll(".my-rect")
		.on("mouseover", function( d, i){
			d3.select(this).transition().duration(500).ease("linear").attr("fill", "orange");
		})
		.on("mouseout", function( d, i){
			d3.select(this).transition().duration(500).ease("circle").attr("fill", "steelblue");
		});

	// 添加足够多的文字元素
	svg.selectAll(".my-text").data(dataset).enter().append("text")
		.attr("class", "my-text")		// 添加样式
		.attr("x", function( d, i){
			return padding.left + rectPadding/2 + scaleX(++i);
		})
		.attr("y", function( d, i){
			var min = scaleY.domain()[0];			// 取值域最小的点，设定初始值
			return padding.top + scaleY(min);
		})
		.attr("dy",  -400)
		.transition().duration(2000).ease("bounce").delay(function( d, i){		// 添加过渡
			return i*200;
		})
		.attr("y", function( d, i){
			return padding.top + scaleY(d);
		})
		.attr("dx", (scaleX.rangeBand()-rectPadding)/2 )		// 设置文字x方向起始位置，正方向朝右
		.attr("dy", -5)		// 设置文字y方向起始位置，正方向朝下
		.text(function(d, i){
			return d;
		});
}