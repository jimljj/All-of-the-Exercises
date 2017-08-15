window.onload = function() {
	var width = 500;
	var height = 500;

  // 添加画布
	var svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height)
    .append('g')
    .attr('transform', 'translate(40, 0)');

	var dataJSON = {
		'name':'中国',
		'children': [
	    { 
	      'name':'浙江', 
	      'children': [
          {'name':'杭州' },
          {'name':'宁波' },
          {'name':'温州' },
          {'name':'绍兴' }
	      ] 
	    },
    	{ 
        'name':'广西', 
        'children': [
          {
          	'name':'桂林',
          	'children': [
              {'name':'秀峰区'},
              {'name':'叠彩区'},
              {'name':'象山区'},
              {'name':'七星区'}
          	]
          },
          {'name':'南宁'},
          {'name':'柳州'},
          {'name':'防城港'}
        ] 
    	},
    	{ 
        'name':'黑龙江',
        'children': [
          {'name':'哈尔滨'},
          {'name':'齐齐哈尔'},
          {'name':'牡丹江'},
          {'name':'大庆'}
        ] 
    	},
    	{ 
        'name':'新疆' , 
        'children': [
          {'name':'乌鲁木齐'},
          {'name':'克拉玛依'},
          {'name':'吐鲁番'},
          {'name':'哈密'}
        ]
    	}
		]
	};

  // 布局
	var tree = d3.layout.tree()				// 定义一个集群图布局
		.size([ width, height-100 ])		// 设定转换后的各节点的坐标在哪一个范围内使用
		.separation(function(a, b) {		// 设定节点之间的间隔，如果同一父级，间隔为1
			return (a.parent == b.parent ? 1 : 2);
		});

	var nodes = tree.nodes(dataJSON);    // 布局生成可作图的节点信息
	var links = tree.links(nodes);       // 布局生成可做图的连线信息

  // 生成器
	var diagonal = d3.svg.diagonal()   // 生成一个对角线生成器，输入两个顶点，生成一条贝塞尔曲线
		.projection(function(d) {        // 定义对角线生成器的点变换器
			return [ d.y, d.x ];           // 对任意输入的顶点坐标，都交换x和y坐标，使曲线横向发展
		});

  // 绘制连线
	var link = svg.selectAll('.link').data(links).enter().append('path')
		.attr('class', 'link')
    // 使用对角线生成器，设置path的路径值。此处为缩写，每个link都会作为参数传入diagonal
		.attr('d', diagonal);

  // 生成节点与文字的分组，并定位
  var node = svg.selectAll('.node').data(nodes).enter().append('g')
    .attr('class', 'node')
    // 布局生成的树状图是纵向生长的，先填y再填x，则能让其横向生长
    .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });

  // 绘制节点
  node.append('circle')
    .attr('r', 4.5);

  node.append('text')
    .attr('dy', function(d) {
      return d.children ? -9 : 3;   // 如果有子节点，则居于圆点上侧；否则，居于圆点右侧
    })
    .attr('dx', function(d) {
      return d.children ? -4 : 8;   // 如果有子节点，则靠左显示；否则，居于靠右显示
    })
    .style('text-anchor', function(d) {
      return d.children ? 'middle' : 'start';    // 如果有子节点，则居中显示；否则，靠右显示
    })
    .text(function(d) {
      return d.name;
    })
}