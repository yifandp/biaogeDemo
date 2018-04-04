$(function(){
	'use strict';

	window.Validator = function(val, rule){

		this.is_valid = function(newVal){
			var key;
			// 不是必填项且用户未填写任何内容
			if(newVal !== undefined){
				val = newVal;
			}
			if(!rule.required && !val){
				return true;
			}

			for(key in rule){
				// 防止重复调用
				if(key == "required"){
					continue;
				}
				// 调用validator中对应的方法
				var r = this['validate_'+ key]();
				if(!r){
					return false;
				}
			}

			return true;
		}

		this.validate_max = function(){
			pre_max_min();
			return val <= rule.max;
		},
		this.validate_min = function(){
			pre_max_min();
			return val >= rule.min;
		},
		this.validate_maxlength = function(){
			pre_length();
			return val.length <= rule.maxlength;
		},
		this.validate_minlength = function(){
			pre_length();
			return val.length >= rule.minlength;
		},
		this.validate_numeric = function(){
			return $.isNumeric(val);
		},
		this.validate_required = function(){
			var real = $.trim(val);
			if(!real && real !== 0)
				return false;
			return true;
		},
		this.validate_pattern = function(){
			var reg = new RegExp(rule.pattern);
			return reg.test(val);
		}

		/* 用于完成max和min的前置工作 */
		function pre_max_min(){
			val = parseFloat(val);
		}
		/* 用于完成maxlength和minlength的前置工作 */
		function pre_length(){
			val = val.toString();
		}
	}
})