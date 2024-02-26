<template>
	<div class="container">
		<el-tabs v-model="message">
			<el-tab-pane :label="`未读消息(${state.unread.length})`" name="first">
				<el-table :data="state.unread" :show-header="false" style="width: 100%">
					<el-table-column>
						<template #default="scope">
							<span class="message-title">{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="date" width="180"></el-table-column>
					<el-table-column width="120">
						<template #default="scope">
							<el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="handle-row">
					<el-button type="primary" @click="allRead()">全部标为已读</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane :label="`已读消息(${state.read.length})`" name="second">
				<template v-if="message === 'second'">
					<el-table :data="state.read" :show-header="false" style="width: 100%">
						<el-table-column>
							<template #default="scope">
								<span class="message-title">{{ scope.row.title }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="date" width="150"></el-table-column>
						<el-table-column width="120">
							<template #default="scope">
								<el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="handle-row">
						<el-button type="danger" @click="delAll()">删除全部</el-button>
					</div>
				</template>
			</el-tab-pane>
			<el-tab-pane :label="`回收站(${state.recycle.length})`" name="third">
				<template v-if="message === 'third'">
					<el-table :data="state.recycle" :show-header="false" style="width: 100%">
						<el-table-column>
							<template #default="scope">
								<span class="message-title">{{ scope.row.title }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="date" width="150"></el-table-column>
						<el-table-column width="120">
							<template #default="scope">
								<el-button @click="handleRestore(scope.$index)">还原</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="handle-row">
						<el-button type="danger" @click="clearAll()">清空回收站</el-button>
					</div>
				</template>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts" name="tabs">
import { ref, reactive } from 'vue';

const message = ref('first');
const state = reactive({
	unread: [
		{
			date: '2024-02-19 20:00:00',
			title: '【系统通知】该系统将于今晚18点到凌晨9点进行升级维护'
		},
		{
			date: '2024-02-19 21:00:00',
			title: '有新的订单更新需要查看'
		}
	],
	read: [
		{
			date: '2024-02-19 20:00:00',
			title: '有新的待处理订单'
		}
	],
	recycle: [
		{
			date: '2024-02-19 20:00:00',
			title: '订单*********已通过'
		}
	]
});

const handleRead = (index: number) => {
	const item = state.unread.splice(index, 1);
	state.read = item.concat(state.read);
};
const allRead = () => {
	state.read = state.unread.concat(state.read);
	state.unread = []
};

const handleDel = (index: number) => {
	const item = state.read.splice(index, 1);
	state.recycle = item.concat(state.recycle);
};
const delAll = () => {
	state.recycle = state.read.concat(state.recycle);
	state.read = []
};

const handleRestore = (index: number) => {
	const item = state.recycle.splice(index, 1);
	state.read = item.concat(state.read);
};
const clearAll = () => {
	state.recycle = []
};

</script>

<style>
.message-title {
	cursor: pointer;
}

.handle-row {
	margin-top: 30px;
}
</style>
