<template>
	<div class="container">
		<div class="buttonBox">
			<el-row align="bottom">
				<el-col :span="2">
					<el-button @click="goBack">返回</el-button>
				</el-col>
				<el-col :span="9">
					<el-button type="primary" v-if="state.formData.id && state.formData.status == 1"
						@click="submitForm(false)">保存</el-button>
					<el-button type="primary" v-if="state.formData.id && state.formData.status == 1"
						@click="deleteOrder">删除</el-button>
					<el-button type="primary" v-if="!state.formData.id" @click="clickSub">提交</el-button>

				</el-col>
			</el-row>
		</div>
		<div>
			<el-tabs v-model="state.selectTabs" type="border-card" @tab-click="handleClick">
				<el-tab-pane label="策略详情" name="form">
					<el-form ref="formData" label-width="auto" :rules="state.rules" :model="state.formData"
						class="demo-form-inline">
						<el-row :gutter="20">
							<el-col v-if="state.formData.id" :span="8">
								<el-form-item label="策略编号" prop="fapiaoNo">
									<el-input v-model.trim="state.formData.fapiaoNo" :disabled="state.disabled"
										placeholder="" readonly />
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="策略内容" prop="amount">
									<el-input v-model="state.formData.amount" readonly :disabled="state.disabled"
										placeholder="" />
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="客户名称" prop="custName">
									<el-autocomplete style="width: 100%;" v-model="state.formData.custName"
										:popper-append-to-body="false" :disabled="state.disabled"
										:fetch-suggestions="remoteNameMethod" placeholder="" @select="selOptions">
										<template #default="{ item }">
											{{ item.name }} {{ item.creditno }}
										</template>
									</el-autocomplete>

								</el-form-item>

							</el-col>
							<el-col :span="8">
								<el-form-item label="客户税号" prop="custTaxid">
									<el-autocomplete style="width: 100%;" v-model="state.formData.custTaxid"
										:popper-append-to-body="false" :disabled="state.disabled"
										:fetch-suggestions="remoteNoMethod" placeholder="" @select="selOptions">
										<template #default="{ item }">
											{{ item.name }} {{ item.creditno }}
										</template>
									</el-autocomplete>
								</el-form-item>

							</el-col>

						</el-row>
						<el-row :gutter="20">

							<el-col :span="8">
								<el-form-item label="联系人手机号" prop="custMobile">
									<el-input v-model="state.formData.custMobile" :disabled="state.disabled"
										placeholder="" />
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="联系邮箱" prop="custEmail">
									<el-input v-model="state.formData.custEmail" :disabled="state.disabled"
										placeholder="" />
								</el-form-item>
							</el-col>

							<el-col :span="24">
								<el-form-item label="备注" prop="remark">
									<el-input autosize type="textarea" :disabled="state.disabled"
										v-model="state.formData.remark" placeholder="" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane name="fpInfo" label="策略信息">
					<el-descriptions title="" :border="true">
						<el-descriptions-item label="策略编号">{{ state.fpInfo?.code || '' }}</el-descriptions-item>
						<el-descriptions-item label="客户名称">{{ state.fpInfo?.titlename || '' }}</el-descriptions-item>
						<el-descriptions-item label="策略申请号">{{ state.fpInfo?.fapiaoNo || '' }}</el-descriptions-item>
						<el-descriptions-item label="策略内容">{{ state.fpInfo?.amount || '' }}</el-descriptions-item>
					</el-descriptions>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div>
		</div>
	</div>
</template>

<script setup lang="ts" name="invoiceDetail">
import { ref, reactive, watch } from 'vue';
import { ElTable } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { formatTimestamp } from '@/utils/common';
import regex from '@/utils/regex';

const route = useRoute()
const router = useRouter();

const links = ref<any[]>([
	{ label: '代订机票款', value: '代订机票款' },
	{ label: '退票款', value: '退票款' }])
//筛选	
const querySearch = (queryString: string, cb: any) => {

}


//模糊查询客户名
const remoteNameMethod = (queryString: string, cb: any) => {
}
//模糊查询客户税号
const remoteNoMethod = (queryString: string, cb: any) => {
}
//选择后的操作
const selOptions = (item: any) => {
	state.formData.custName = item.name
	state.formData.custTaxid = item.creditno
}
// 自定义验证函数
const validateAmount = (rule: any, value: any, callback: any) => {
	if (value === null) {
		// 如果输入框的值为空，则校验通过（可根据实际需求修改）
		callback();
	} else {
		callback();
	}
};
const state = reactive({

	saleCodeSearchCode: '',
	saleCodeSearchPnr: '',
	disabled: false,//表单禁用
	selectTabs: 'form',//tab默认选择标签
	saveFormData: <any>{},//提交的保存数据
	fpInfo: <any>{
	},
	rules: {
		saleDeliveryCode: [
			{ required: true, message: '销货单号不能为空', trigger: 'change' },
			{ min: 15, max: 15, message: '请输入正确的销货单号', trigger: 'change' },
		],
		custEmail: [
			{ required: true, message: '收票邮箱不能为空', trigger: 'change' },
			{ pattern: regex.email, message: '收票邮箱格式不正确', trigger: 'change' },
		],
		fpTitle: [
			{ required: true, message: '开票内容不能为空', trigger: 'change' },
		],
		custName: [
			{ required: true, message: '客户名称不能为空', trigger: 'change' },
		], custTaxid: [
		],
		amount: [
			{ validator: validateAmount, trigger: 'blur' },
		],
	},
	formData: <any>{},
	fpOrderHistoryList: <any>[]
})
watch(
	[() => state.saleCodeSearchPnr, () => state.saleCodeSearchCode],
	([newPnr, newCode], [oldPnr, oldCode]) => {
		if (newPnr !== oldPnr && newPnr != '' || newCode !== oldCode && newCode != '') {

		}
	}
);
//获取表单实例
const formData = ref()
const isSubmitting = <any>ref(false)

//返回
const goBack = () => {
	router.push({ name: 'tacticsList', });

}



const getData = async (id: any) => {

}
const clickSub = () => {

}
const fpDownload = () => {
	window.location.href = state.fpInfo.pdf
}
const fpSendMail = () => {

}
const submitForm = async (isSubmit: any) => {

};

const deleteOrder = () => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	}).then(() => {
		goBack()
	})
		.catch(() => { });
}

const id = <any>ref('');
watch(() => route.query.id, // 监听id参数的变化
	(newId, oldId) => {
		if (!oldId && !newId) {
			state.formData = <any>{ status: 1 }
			state.selectTabs = 'form'
		}
		else if (newId && !oldId) {
			//进入开票申请
			state.saveFormData = state.formData
			getData(newId); // 获取数据
		} else if (oldId && !newId) {
			state.selectTabs = 'form'
			state.formData = <any>{ status: 1 }
			// 回填保存的输入
			state.formData = state.saveFormData;
			state.disabled = false;
		}
		else if (oldId && newId && oldId != newId) {
			getData(newId); // 获取数据
		}
	},
	{ immediate: true } // 立即执行watch回调，以便在组件初始化时获取数据
);

const searchHistory = () => {

}
const handleClick = (tab: TabsPaneContext, event: Event) => {
	if (tab.index == '1') {
		searchHistory()
	}
}

</script>

<style scoped>
.container {
	background-color: white;
}

.container .buttonBox {
	margin-bottom: 10px;
}
</style>
