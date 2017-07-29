window.onload = function(){
	var width = 300;		// 画布的宽度
	var height = 300;		// 画布的高度

	var svg = d3.select("body")		// 选择文档中的body元素
    .append("svg")          		// 添加一个svg元素
    .attr("width", width)       // 设定宽度
    .attr("height", height);    // 设定高度

 	var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];

 	var linear = d3.scale.linear().domain([ 0, d3.max(dataset)]).range([ 0, 250]);

	var rectHeight = 25;		// 每个矩形所占的像素高度(包括空白)

	svg.selectAll("rect").data(dataset).enter().append("rect")
    .attr("x", 20)
    .attr("y", function(d,i){
      return i * rectHeight;
    })
    .attr("width", function(d){
      return linear(d);
    })
    .attr("height", rectHeight-2)
    .attr("fill", "steelblue");		// 给矩形元素设置颜色

 	var axis = d3.svg.axis()	// D3中坐标轴的组件，能够在SVG中生成组成坐标轴的元素
 		.scale(linear)					// 指定比例尺
 		.orient("bottom")				// 指定刻度的方向，bottom 表示在坐标轴的下方显示
 		.ticks(7);							// 指定刻度的数量

 	svg.append("g")						// 在svg中添加分组元素
 		.attr("class", "axis")	// 设定坐标轴组件的class
 		.attr("transform", "translate(20, 130)")		// 通过transform设定坐标轴的位置
 		.call(axis);		// 等同于 axis(svg.append("g"))
}