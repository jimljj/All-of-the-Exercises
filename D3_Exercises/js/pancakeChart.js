window.onload = function(){
	// 画布大小
	var width = 300;
	var height = 300;

	// 添加画布
	var svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height);

	// 数据
	var dataset = [ 30 , 10 , 43 , 55 , 13 ];
	dataset.sort(function(a,b){		// 按升序排列
		return a-b;
	});

	// 定义一个饼状图的布局
	var pie = d3.layout.pie();

	// 生成绘制饼状图所需要的数据
	var piedata = pie(dataset);

	// 生成弧生成器
	var arc = d3.svg.arc()				// 弧生成器
		.innerRadius(75)		// 设置内半径，为0则中间没有空白
		.outerRadius(150)		// 设置外半径

	var arcs = svg.selectAll("g").data(piedata).enter().append("g")		// 添加足够数量的分组元素
		.attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");	// 移到圆心位置

	var color = d3.scale.category10();		// 有十种颜色的颜色比例尺

	arcs.append("path")			// 给每个分组元素添加路径元素
		.attr("fill", "white")
		.attr("d", function(item){
			item = {
				data: item.data,
				endAngle: item.endAngle,
				padAngle: 0,
				startAngle: item.endAngle,
				value: item.value
			}
			return arc(item)
		})
		.transition().duration(500).ease("linear").delay(function(d, i){		// 添加过渡
			return i*500;
		})
		.attr("fill", function(d, i){		// 给不同的饼状赋予不同的颜色
			return color(i);
		})
		.attr("d", function(item){			// 调用弧生成器，为路径的路径值d赋值
			return arc(item);
		});

	arcs.append("text")			// 给每个分组元素添加文字元素
		.attr("fill", "lightgrey")
		.attr("transform", "translate(0,0)")
		.transition().duration(500).ease("linear").delay(function(d, i){		// 添加过渡
			return i*500;
		})
		.attr("fill", "white")
		.attr("transform", function(d){
			// 利用centroid计算出质心的x、y，即弧线中心
			return "translate(" + arc.centroid(d) + ")";
		})
		.text(function(d){
			return d.data;
		})
}