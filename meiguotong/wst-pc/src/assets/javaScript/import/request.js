function requestGet(baseUrl, params, callback) {

	localStorage.setItem("login_type",2);

	params["uid"] = window.localStorage.getItem("login_uid") || 1;
	params["key"] = window.localStorage.getItem("login_key") || "b71f91200c87bd1a61706b3751c30a58";
	params["time"] = window.localStorage.getItem("login_time") || "20180921125124";
	params["type"] = window.localStorage.getItem("login_type") || 2;
	params["languageid"] = window.localStorage.getItem("languageid") || 1;
	params["currencyid"] = window.localStorage.getItem("currencyid") || 1;

	$.ajax(baseUrl, {
		data: params,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 15000, //超时时间设置为10秒；
		success: function(dataInfo) {
	//		layer.close(index);
			let success = dataInfo.success;
			let message = dataInfo.msg;
			if(success) {
				console.log(JSON.stringify(dataInfo));
				callback(dataInfo);
			} else {
				layerMsg(message);
			}
		},
		error: function(xhr, type, errorThrown) {
	/*		layer.close(index);*/
				layerMsg(type);
		}
	});
}

function requestPost(baseUrl, params, callback) {

	localStorage.setItem("login_type",2);

	params["uid"] = window.localStorage.getItem("login_uid") || 1;
	params["key"] = window.localStorage.getItem("login_key") || "b71f91200c87bd1a61706b3751c30a58";
	params["time"] = window.localStorage.getItem("login_time") || "20180921125124";
	params["type"] = window.localStorage.getItem("login_type") || 2;
	params["languageid"] = window.localStorage.getItem("languageid") || 1;
	params["currencyid"] = window.localStorage.getItem("currencyid") || 1;

	$.ajax(baseUrl, {
		data: params,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 15000, //超时时间设置为10秒；
		success: function(dataInfo) {
	//		layer.close(index);
			let success = dataInfo.success;
			let message = dataInfo.msg;
			if(success) {
	//			console.log(JSON.stringify(dataInfo));
				callback(dataInfo);
			} else {
				layerMsg(message);
			}
		},
		error: function(xhr, type, errorThrown) {
//			layer.close(index);
				layerMsg(type);
		}
	});
}


