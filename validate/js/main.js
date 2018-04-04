$(function(){
	/*选中页面中的所有的input[data-rule]*/
	/*解析每一个input的验证地址*/
	/*验证*/
	'use strict';

	var $inputs = $('[data-rule]'),
		signup = $("#signup"),
		inputs = [];

	$inputs.each(function(index,node){
		var tmp = new Input(node);
		inputs.push(tmp);
	});

	signup.on("submit",function(e){
		e.preventDefault();

		$inputs.trigger('blur');

		for(var i = 0; i < inputs.length; i++){
			var item = inputs[i];
			var validFlag = item.validator.is_valid();

			if(!validFlag){
				alert("填写信息有误，请重新填写");
				return;
			}
		}
		alert("注册成功！");
	})

	function signup(){
		// 向服务器发送数据
		// $.post()
	}
})