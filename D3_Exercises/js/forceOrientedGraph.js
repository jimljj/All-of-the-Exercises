window.onload = function () {
	var width = 500;
	var height = 400;

	var nodes = [ { name: '桂林' }, { name: '广州' }, { name: '厦门' }, { name: '杭州' }, { name: '上海' }, { name: '青岛' }, { name: '天津' }, { name: '济南'}, { name: '大连'}, { name: '金华'}, { name: '宁波'}, { name: '温州'} ];

	var edges = [{ source: 0, target: 1 }, { source: 0 , target: 2 }, { source: 0 , target: 3 }, { source: 1 , target: 4 }, { source: 1 , target: 5 }, { source: 1 , target: 6 }, { source: 2, target: 7 }, { source: 7, target: 8 }, { source: 8, target: 2 }, { source: 3, target: 2 }, { source: 3, target: 9 }, { source: 3, target: 10 }, { source: 3, target: 11 }];

	// 添加画布
	var svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height);

	var force = d3.layout.force()		// 布局力导向图，转换成适合绘图的数据
    .nodes(nodes)					// 指定节点数组
    .links(edges)					// 指定连线数组
    .size([width,height]) // 指定作用域范围
    .linkDistance(80) 		// 指定连线长度
    .charge([-600]); 			// 相互之间的作用力

  force.start();			// 开始作用

 	// 添加连线
 	var svg_edges = svg.selectAll('line').data(edges).enter().append('line');

 	var color = d3.scale.category20();

 	// 添加节点
 	var svg_nodes = svg.selectAll('circle').data(nodes).enter().append('circle')
 		.attr('r', 10)			// 圆半径为20
 		.style('fill', function ( d, i ) {		// 给每个圆添加颜色
 			return color(i);
 		})
 		.call(force.drag);		// 使得节点能够拖动

 	var svg_texts = svg.selectAll('text').data(nodes).enter().append('text')
 		.attr('dx', 12)
 		.attr('dy', 8)
 		.text(function(d) {
 			return d.name;
 		});

 	force.on('tick', function(){		// 对于每一个时间间隔
 		// 更新连线坐标
 		svg_edges.attr('x1', function(d){ return d.source.x; })
 			.attr('y1', function(d){ return d.source.y; })
 			.attr('x2', function(d){ return d.target.x; })
 			.attr('y2', function(d){ return d.target.y; });

 		// 更新节点坐标
 		svg_nodes.attr('cx', function(d){ return d.x; })
 			.attr('cy', function(d){ return d.y; });

 		// 更新文字坐标
 		svg_texts.attr('x', function(d){ return d.x; })
 			.attr('y', function(d){ return d.y; });
 	})
}