<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" label-width="auto" :model="query" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="订单申请单">
                                <el-input v-model="query.fapiaoNo" placeholder="订单申请单" class="" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="抬头">
                                <el-input v-model="query.custName" placeholder="抬头" class="" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="query.custTaxid" placeholder="税号" class="" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="订单状态">
                                <el-select v-model="query.status" placeholder="订单状态" class=" status">
                                    <el-option v-for="(item, ind) in common.fpOrderTypes" :key="ind" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row :gutter="20">
                    <el-col :span="6" :offset="18">
                        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="padding: 10px; ">
                <h2 style="margin: 20px 0;">订单申请列表</h2>
                <el-divider />
            </div>
            <el-table :data="invoice.invoiceList" class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column show-overflow-tooltip prop="id" label="id" align="center"></el-table-column>
                <el-table-column prop="fapiaoNo" label="订单申请单号" width="200"></el-table-column>

                <el-table-column prop="amount" label="订单金额"></el-table-column>
                <el-table-column prop="fpTitle" label="订单注释"></el-table-column>
                <el-table-column prop="status" label="订单状态">
                    <template #default="scope">{{ common.getFpOrderType(scope.row.status) }}</template>
                </el-table-column>
                <el-table-column prop="nickName" label="创建者"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="small" :icon="Edit" @click="handleDetail(scope.$index, scope.row)">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total,sizes, prev, pager, next,jumper" :current-page="query.pageNum"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange" :page-sizes="[20,]"
                    @size-change="handleSizeChange"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="invoiceList">
import { ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCommonStore } from '@/store/common';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
const common = useCommonStore()
const user = <any>{}
const router = useRouter();
const route = useRoute()

const invoice = <any>{
}

const state = reactive({
})
const query = reactive({
    pageNum: 1,
    pageSize: 20,
    status: null,
    fapiaoNo: null,
    saleDeliveryCode: null,
    custName: null,
    custTaxid: null,
});
const pageTotal = ref(0);
// 获取表格数据
const getData = async () => {
    invoice.invoiceList = [
        {
            "id": 13198,
            "fapiaoNo": "FP202311221542129611",
            "custName": "上海春秋旅行社有限公司",
            "custTaxid": "91310105132730312Q",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 0,
            "fpTitle": "退票款",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638932000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13197,
            "fapiaoNo": "FP202311221541098174",
            "custName": "上海春秋旅行社有限公司",
            "custTaxid": "91310105132730312Q",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 0,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638870000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13196,
            "fapiaoNo": "FP202311221540344789",
            "custName": "上海春秋旅行社有限公司",
            "custTaxid": "91310105132730312Q",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 0,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638834000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13195,
            "fapiaoNo": "FP202311221538577262",
            "custName": "北京引领假日国际旅行社有限公司",
            "custTaxid": "91110105679629998B",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 6,
            "fpTitle": "退票款",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638737000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13194,
            "fapiaoNo": "FP202311221536569121",
            "custName": "上海春秋旅行社有限公司",
            "custTaxid": "91310105132730312Q",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": -111,
            "fpTitle": "多对多",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638616000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13193,
            "fapiaoNo": "FP202311221534475571",
            "custName": "北京引领假日国际旅行社有限公司",
            "custTaxid": "91110105679629998B",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 1000,
            "fpTitle": "多对一",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638488000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13192,
            "fapiaoNo": "FP202311221533119585",
            "custName": "上海春秋旅行社有限公司",
            "custTaxid": "91310105132730312Q",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 8,
            "fpTitle": "一对多",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638392000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13191,
            "fapiaoNo": "FP202311221530516570",
            "custName": "杭州信效煌进出口有限公司",
            "custTaxid": "913301100793318645",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 0,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638252000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13190,
            "fapiaoNo": "FP202311221528416479",
            "custName": "杭州信效煌进出口有限公司",
            "custTaxid": "913301100793318645",
            "custEmail": "123@qq.com",
            "custMobile": null,
            "amount": 5,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "3c48d09b-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700638121000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "Nick"
        },
        {
            "id": 13189,
            "fapiaoNo": "FP202311221524166795",
            "custName": "杭州福斯达深冷装备股份有限公司",
            "custTaxid": "91330100723604713X",
            "custEmail": "3@qq.com",
            "custMobile": null,
            "amount": 50,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "3c48d09b-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700637857000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "Nick"
        },
        {
            "id": 13188,
            "fapiaoNo": "FP202311221522271265",
            "custName": "上海航空国际旅游（集团）有限公司",
            "custTaxid": "91310000132213155N",
            "custEmail": "3@qq.com",
            "custMobile": null,
            "amount": 500,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "3c48d09b-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700637747000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "Nick"
        },
        {
            "id": 13187,
            "fapiaoNo": "FP202311221521276691",
            "custName": "上海航空国际旅游（集团）有限公司",
            "custTaxid": "91310000132213155N",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 50,
            "fpTitle": "退票款",
            "remark": null,
            "status": "1",
            "createBy": "3c48d09b-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700637687000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "Nick"
        },
        {
            "id": 13186,
            "fapiaoNo": "FP202311221519363180",
            "custName": "珠海科兴电子科技有限公司",
            "custTaxid": "91440400MA4UP6N43W",
            "custEmail": "2@qq.com",
            "custMobile": null,
            "amount": 200,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "3c48d09b-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1700637577000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "Nick"
        },
        {
            "id": 13185,
            "fapiaoNo": "FP202310171627552306",
            "custName": "上海春秋旅行社有限公司",
            "custTaxid": "91310105132730312Q",
            "custEmail": "1@qq.com",
            "custMobile": "11",
            "amount": 210,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1697531276000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13183,
            "fapiaoNo": "FP202310171624467054",
            "custName": "上海航空国际旅游（集团）有限公司",
            "custTaxid": "91310000132213155N",
            "custEmail": "1@qq.com",
            "custMobile": "11",
            "amount": 0,
            "fpTitle": "yiduiyi",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1697531086000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13182,
            "fapiaoNo": "FP202310171615065139",
            "custName": "珠海科兴电子科技有限公司",
            "custTaxid": "91440400MA4UP6N43W",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 20,
            "fpTitle": "代订机票款",
            "remark": null,
            "status": "1",
            "createBy": "3c48d09b-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1697530506000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "Nick"
        },
        {
            "id": 13180,
            "fapiaoNo": "FP202310171510152341",
            "custName": "杭州信效煌进出口有限公司",
            "custTaxid": "913301100793318645",
            "custEmail": "1@qq.com",
            "custMobile": null,
            "amount": 9.77,
            "fpTitle": " ",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1697526615000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13178,
            "fapiaoNo": "FP202310171508292367",
            "custName": "杭州信效煌进出口有限公司",
            "custTaxid": "913301100793318645",
            "custEmail": "1@qq.coom",
            "custMobile": null,
            "amount": 290.23,
            "fpTitle": "一对多",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1697526510000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13177,
            "fapiaoNo": "FP202310171508035708",
            "custName": "上海春秋旅行社有限公司",
            "custTaxid": "91310105132730312Q",
            "custEmail": "1@qq.com",
            "custMobile": "11111",
            "amount": 77700,
            "fpTitle": "多对一",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1697526483000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        },
        {
            "id": 13176,
            "fapiaoNo": "FP202310171502489992",
            "custName": "杭州信效煌进出口有限公司",
            "custTaxid": "913301100793318645",
            "custEmail": "1@qq.com",
            "custMobile": "1",
            "amount": 42000,
            "fpTitle": "一对一",
            "remark": null,
            "status": "1",
            "createBy": "1af52779-1fac-11ee-bdc7-00163e0152d5",
            "createByTeam": "6af52779-1fac-11ee-bdc7-00163e0152d6",
            "createDate": 1697526169000,
            "deleteBy": null,
            "deleteDate": null,
            "saleDeliveryCode": null,
            "nickName": "代理"
        }
    ]
    pageTotal.value = invoice.total || 0;
};
getData();

// 查询操作
const handleSearch = () => {
    query.pageNum = 1;
    getData();
};
// 分页导航
const handlePageChange = (val: number) => {
    query.pageNum = val;
    getData();
};
// 分页导航
const handleSizeChange = (val: number) => {
    query.pageNum = val;
    getData();
};

// 删除操作
const handleDelete = (index: number, val: any) => {
    // 二次确认删除
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        type: 'warning'
    }).then(() => {
        for (let i = 0; i < invoice.invoiceList.length; i++) {
            const element = invoice.invoiceList[i];
            if (element.id == val.id) {
                invoice.invoiceList.splice(i, 1)
            }

        }
        ElMessage.success('删除成功');
    })
        .catch(() => { });
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
    name: '',
    address: ''
});
let idx: number = -1;
const handleDetail = (index: number, row: any) => {
    idx = index;
    if (index % 2 == 0) {
        router.push({ name: 'seriesDetail', query: { id: row.id } });

    } else {
        router.push({ name: 'invoiceDetail', query: { id: row.id } });

    }
};
const applyBtn = () => {
    router.push({ name: 'invoiceDetail', query: { id: '' } });
};
watch(() => route.query.id, // 监听id参数的变化
    (newId, oldId) => {
        getData(); // 获取数据
    },
    { immediate: true } // 立即执行watch回调，以便在组件初始化时获取数据
);
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
}

.table {
    width: 100%;
    font-size: 14px;
    padding: 6px;
}

.red {
    color: #F56C6C;
}

.mr10 {
    margin-right: 10px;
}

.mb10 {
    margin-bottom: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
