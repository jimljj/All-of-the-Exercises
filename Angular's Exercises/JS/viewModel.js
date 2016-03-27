/**
 * Created by Jimmy on 16/3/27.
 */
var m1 = angular.module( 'myApp', []);
m1.controller( 'List', [ '$scope', function ( $scope) {
    $scope.arrGoodsInfo = [
        { url:"IMG/1.jpg",introduce:"【成人】 2015/16 主场 长袖球衣 阿迪达斯 红色",price:129,number:0,total:0},
        { url:"IMG/2.jpg",introduce:"Nike NIKE AIR MAX 90 男子运动鞋683282",price:499,number:0,total:0},
        { url:"IMG/3.jpg",introduce:"AKG/爱科技 y50 耳机头戴式 音乐线控麦克风耳麦",price:229,number:0,total:0},
        { url:"IMG/4.jpg",introduce:"耐克足球5号英超用球正品NIKE训练比赛足球",price:146,number:0,total:0},
        { url:"IMG/offSale.jpg",introduce:"对不起,本商品已经下架.",price:0,number:0,total:0}
    ];
    $scope.decrease = function (obj) {
        if(obj.number===0){
            return alert('数量最少为0');
        } else {
            obj.number--;
            obj.total = obj.price * obj.number;
        }
        $scope.total = 0;
        for( var i=0; i<$scope.arrGoodsInfo.length; i++){
            $scope.total += $scope.arrGoodsInfo[i].total;
        }
    };
    $scope.increase = function (obj) {
        obj.number++;
        obj.total = obj.price * obj.number;
        $scope.total = 0;
        for( var i=0; i<$scope.arrGoodsInfo.length; i++){
            $scope.total += $scope.arrGoodsInfo[i].total;
        }
    };
    $scope.total = 0;
}]);