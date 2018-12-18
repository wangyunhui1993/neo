const neo = {
	/* 把数组对象按照某个属性进行排序
	 *升序type=-1,降序type=1
	 * 调用方式：obj.sort(neo.objSort(Attr,-1))
	 */
	obj_sort: function(prop, type) {
		return function(obj1, obj2) {
			var val1 = obj1[prop];
			var val2 = obj2[prop];
			if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
				val1 = Number(val1);
				val2 = Number(val2);
			}
			if (val1 < val2) {
				return type;
			} else if (val1 > val2) {
				return -type;
			} else {
				return 0;
			}
		}
	},
	/* 把对象转换成JSON形式的html代码
	 * 调用方式：neo.obj_json_html(obj)
	 */
	obj_json_html: function(obj) {
		var rep = "~";
		var jsonStr = JSON.stringify(obj, null, rep)
		var str = "";
		for (var i = 0; i < jsonStr.length; i++) {
			var text2 = jsonStr.charAt(i)
			if (i > 1) {
				var text = jsonStr.charAt(i - 1)
				if (rep != text && rep == text2) {
					str += "<br/>"
				}
			}
			str += text2;
		}
		jsonStr = "";
		for (var i = 0; i < str.length; i++) {
			var text = str.charAt(i);
			if (rep == text)
				jsonStr += "        "
			else {
				jsonStr += text;
			}
			if (i == str.length - 2)
				jsonStr += "<br/>"
		}
		return jsonStr;
	},
	/* 判断一个字符串是否是数字
	 * 调用方式：neo.isNumber(str)
	 */
	is_number: function(str) {
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if (regPos.test(str) || regNeg.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	/* 判断某年某月有多少天
	 * 调用方式：neo.getCountDays(ym)
	 */
	get_count_days: function(ym) {
		var curDate = new Date(ym);
		/* 获取当前月份 */
		var curMonth = curDate.getMonth();
		/* 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
		curDate.setMonth(curMonth + 1);
		/* 将日期设置为0 */
		curDate.setDate(0);
		/* 返回当月的天数 */
		return curDate.getDate();
	},
	/* 获取url单个查询串的值
	 * 调用方式：neo.getSearchString(url,key)
	 */
	get_search_string: function(url, key) {
		// 获取URL中?之后的字符
		var searchArr = url.split('#')[0].split('?')[1];
		// 以&分隔字符串，获得类似name=xiaoli这样的元素数组
		var arr = searchArr.split("&");
		var obj = new Object();

		// 将每一个数组元素以=分隔并赋给obj对象   
		for (var i = 0; i < arr.length; i++) {
			var tmp_arr = arr[i].split("=");
			obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
		}
		return obj[key];
	},
	/* 获取url单个查询串的值
	 * 调用方式：neo.getSearchString(time, "yyyy-MM-dd hh:mm:ss")
	 */
	format_time: function(time, fmt) {
		Date.prototype.Format = function(fmt) {
			var o = {
				"M+": this.getMonth() + 1, //月份
				"d+": this.getDate(), //日
				"h+": this.getHours(), //小时
				"m+": this.getMinutes(), //分
				"s+": this.getSeconds(), //秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
					o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		return new Date(time).Format(fmt);
	},
	/* 数组元素出现次数统计
	 * 调用方式：neo.arr_statistics(arr)
	 */
	arr_statistics: function(arr) {
		var obj = {};
		arr.map(function(a) {
			if (a in obj) obj[a]++;
			else obj[a] = 1;
		});
		return obj;
	},
	/* 数组求最大值 */
	arr_max: function(arr) {
		return Math.max.apply(null, arr);
	},
	/* 数组求最小值 */
	arr_min: function(arr) {
		return Math.min.apply(null, arr);
	},
	/* 数组求最和 */
	arr_sum: function(arr) {
		return eval(arr.join("+"));
	},
	/* 数组求最平均值 */
	arr_ave: function(arr) {
		var sum = eval(arr.join("+"));
		return ~~(sum / arr.length * 100) / 100;
	},
	/* 数组去重 */
	arr_no_repeat: function(arr) {
		return [...new Set(arr)];
	},
	/* 将数组格式化成树形数据
	var test3=[
		{id:1,parentId:2,title:"123"},
		{id:2,parentId:0,title:"456"},
		{id:3,parentId:0,title:"789"}
	];
	var f={
		id: 'id',
		name: 'title',
		parentId: 'parentId',
		rootId:0
	}
	 * 调用方式：neo.format_tree_data(arr,f)
	 */
	format_tree_data: function(arr, attributes) {
		let resData = arr;
		let tree = [];
		for (let i = 0; i < resData.length; i++) {
			if (resData[i][attributes.parentId] === attributes.rootId) {
				let obj = {
					id: resData[i][attributes.id],
					name: resData[i][attributes.name],
					children: [],
				};
				tree.push(obj);
				resData.splice(i, 1);
				i--;
			}
		}
		run(tree);

		function run(chiArr) {
			if (resData.length !== 0) {
				for (let i = 0; i < chiArr.length; i++) {
					for (let j = 0; j < resData.length; j++) {
						if (chiArr[i].id == resData[j][attributes.parentId]) {
							let obj = {
								id: resData[j][attributes.id],
								name: resData[j][attributes.name],
								children: [],
							};
							chiArr[i].children.push(obj);
							resData.splice(j, 1);
							j--;
						}
					}
					run(chiArr[i].children);
				}
			}
		}
		return tree;
	},
	/* 判断是否为空 */
	empty_fun: function(obj) {
		var obj = obj;
		if (obj == "" || obj == null || obj == undefined || obj == "null" || obj == "undefined") {
			return true;
		} else {
			return false;
		}
	},
	/* 校验是否全由数字组成  */
	is_digit: function(s) {
		var patrn = /^[0-9]{1,20}$/;
		if (!patrn.exec(s)) return false
		return true
	},
	/* 校验密码：只能输入6-20个字母、数字、下划线  */
	is_passwd: function(s) {
		var patrn = /^(\w){6,20}$/;
		if (!patrn.exec(s)) return false
		return true
	},
	/* 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-” */
	is_tel: function(s) {
		//var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/; 
		var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
		if (!patrn.exec(s)) return false
		return true
	},
	/* 校验手机号码：必须以数字开头，除数字外，可含有“-”*/
	is_mobile: function(s) {
		var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
		if (!patrn.exec(s)) return false
		return true
	},
	/* 校验邮政编码 */
	is_postal_code: function(s) {
		var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
		if (!patrn.exec(s)) return false
		return true
	},
	//去除空格:默认去除前后空格
	/*type，默认为2(1~4)
	 1:所有空格
	 2:前后空格
	 3:前空格
	 4:后空格
	 * */
	trim: function(str, type) {
		type = type || 2;
		switch (type) {
			case 1:
				return str.replace(/\s+/g, "");
			case 2:
				return str.replace(/(^\s*)|(\s*$)/g, "");
			case 3:
				return str.replace(/(^\s*)/g, "");
			case 4:
				return str.replace(/(\s*$)/g, "");
			default:
				return str;
		}
	},
	//字符串大小写:默认首字母大写
	/*type，默认为1(1~5)
	 1:首字母大写
	 2:首页母小写
	 3:大小写转换
	 4:全部大写
	 5:全部小写
	 * */
	//eg:change_case('sdsdaa',1)
	//res:Sdsdaa
	change_case: function(str, type) {
		type = type || 1;

		function toggleCase(str) {
			var itemText = "";
			str.split("").forEach(
				function(item) {
					if (/^([a-z]+)/.test(item)) {
						itemText += item.toUpperCase();
					} else if (/^([A-Z]+)/.test(item)) {
						itemText += item.toLowerCase();
					} else {
						itemText += item;
					}
				});
			return itemText;
		}

		switch (type) {
			case 1:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

				});
			case 2:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
				});
			case 3:
				return toggleCase(str);
			case 4:
				return str.toUpperCase();
			case 5:
				return str.toLowerCase();
			default:
				return str;
		}
	},
	//字符串替换
	/*
	 str:原字符串
	 charReg:要替换的字符或者正则表达式（不要写g）
	 newChar:要替换成什么字符
	 eg:replace_all("sea","a","1")
	 res:("se1")
	 * */
	replace_all: function(str, charReg, newChar) {
		nRegExp = new RegExp(charReg, "g");
		return str.replace(nRegExp, newChar);
	},





}
