// var test1 = [{
// 		a: 1
// 	},
// 	{
// 		a: 3
// 	},
// 	{
// 		a: 2
// 	}
// ];

// var test2 = {
// 	a: 1,
// 	b: 2,
// 	c: 3
// }
// // 把数组对象按照某个属性进行排序
// console.log(test1.sort(neo.objSort("a",-1)));    //升序
// console.log(test1.sort(neo.objSort("a",1)));    //降序
// // 把对象转换成JSON形式的html代码
// console.log(neo.obj_json_html(test2));
// // 判断一个字符串是否是数字
// console.log(neo.isNumber('123'));
// console.log(neo.isNumber('123.1'));
// console.log(neo.isNumber('123.1ja'));
// //判断某年某月有多少天
// console.log(neo.getCountDays('2018/02'));
// //获取单个查询串的值
// console.log(neo.getSearchString('https://www.baidu.com/s?wd=js&rsv_sug7=100','wd'));
// //时间格式化
// console.log(neo.formatTime(new Date(),"yyyy-MM-dd (q) hh:mm:ss-S"));




// var test3=[
// 	{id:1,parentId:2,title:"123"},
// 	{id:2,parentId:0,title:"456"},
// 	{id:3,parentId:0,title:"789"}
// ];
// var f={
// 	id: 'id',
// 	name: 'title',
// 	parentId: 'parentId',
// 	rootId:0
// }
// console.log(neo.format_tree_data(test3,f));


var test4 = neo.UTFTranslate.Change('你好');
console.log(test4);

var test5 = neo.UTFTranslate.ReChange('&#x4F60;&#x597D;');
console.log(test5);

