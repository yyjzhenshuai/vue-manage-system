import { defineStore } from 'pinia';
export const useCommonStore = defineStore('common', {
	state: () => {
		return {
			orderTypes:[{
				value:null,
				label:"全部"
			},{
				value:1,
				label:"待付款"
			},
			{
				value:2,
				label:"已支付"
			},
			{
				value:3,
				label:"已出票"
			},
			{
				value:4,
				label:"已退票"
			},
			{
				value:5,
				label:"已取消"
			},
			{
				value:6,
				label:"退票申请中"
			},
			{
				value:7,
				label:"退票确认中"
			},
			{
				value:8,
				label:"退票处理中"
			},
			{
				value:9,
				label:"改期申请中"
			},
			{
				value:10,
				label:"改期待支付"
			},
			{
				value:11,
				label:"改期已确认"
			},
			{
				value:12,
				label:"已改期"
			},
			{
				value:13,
				label:"部分退票"
			}],
			fpOrderTypes:[{
				value:1,
				label:"申请中"
			},
			{
				value:2,
				label:"开票中"
			},
			{
				value:3,
				label:"已开票"
			},{
				value:4,
				label:"草稿"
			},{
				value:5,
				label:"已删除"
			}]
		};
	},
	getters: {
		show: state => {
			return ;
		},
		nameList: state => {
			return ;
		},
	},
	actions: {
		getOrderType(data:any){
			for (let i = 0; i < this.orderTypes.length; i++){
				if(this.orderTypes[i].value == data){
					return this.orderTypes[i].label;
				}
			}
		},
		getFpOrderType(data:any){
			for (let i = 0; i < this.fpOrderTypes.length; i++){
				if(this.fpOrderTypes[i].value == data){
					return this.fpOrderTypes[i].label;
				}
			}
		}
	},
	persist: {
		key: 'orderTypes', // 本地存储key名称
		storage: sessionStorage, // 不设置默认存储localStorage
		paths: ['orderTypes','fpOrderTypes'] // 指定持久化的值
	  }
});
