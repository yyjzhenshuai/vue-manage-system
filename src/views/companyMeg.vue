<template>
	<div class="container">
		<div class="buttonBox">
			<el-row align="bottom">
				<el-col :span="9">
					<el-button type="primary" v-if="!isEdit" @click="isEdit = true">编辑</el-button>
					<el-button type="primary" v-else @click="isEdit = false">保存</el-button>
				</el-col>
			</el-row>
		</div>
		<el-form :model="form" label-width="120px">
			<el-descriptions title="公司基础信息" direction="vertical" :column="4" :size="size" border>
				<el-descriptions-item label="公司名称">
					<el-input v-if="isEdit" v-model="form.name" />
					<span v-else>{{ form.name }} </span>
				</el-descriptions-item>
				<el-descriptions-item label="联系电话">
					<el-input v-if="isEdit" v-model="form.tel" />
					<span v-else>{{ form.tel }} </span>
				</el-descriptions-item>
				<el-descriptions-item label="所在地" :span="2">
					<el-input v-if="isEdit" v-model="form.city" />
					<span v-else>{{ form.city }} </span>

				</el-descriptions-item>
				<el-descriptions-item label="标签">
					<el-tag size="small">代理商</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="详细地址">
					<el-input v-if="isEdit" v-model="form.address" />
					<span v-else>{{ form.address }} </span>
				</el-descriptions-item>
			</el-descriptions>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="companyMeg">
import { ref, reactive, watch, computed } from 'vue';

const size = ref('')
const isEdit = ref(false)
const form = ref({
	name: '',
	tel: '18100000000',
	city: '苏州',
	address: '',
})
</script>

<style scoped>
.container {
	background-color: white;
}
</style>
