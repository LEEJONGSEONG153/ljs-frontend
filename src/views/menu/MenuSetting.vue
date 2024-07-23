<template>
  <section class="card">
    <h3 class="page-title f-bold mb-30">메뉴 설정</h3>
    <!-- 필터 영역 -->
    <div class="filter-area mb-60">
      <div class="select-group">
        <div class="input-wrap">
          <el-input placeholder="아이디 또는 메뉴명 입력" v-model="searchText" clearable @keydown="handleEnter"></el-input>
        </div>
      </div>
      <button type="button" class="btn filled medium ghost" @click="handleSearch">
        <span class="icon search-wh size18">조회</span>조회
      </button>
    </div>
    <!-- 필터 영역 끝 -->

    <!-- 검색결과 영역 / 그리드 바로 위에 붙는 내용들 영역입니다 -->
    <div class="table-area">
      <div class="flex-eb mb-20">
        <div class="flex-ce gap-14 ml-auto">
          <el-radio-group v-model="searchIsUse" @change="handleSearch">
            <el-radio-button label="전체" value=""/>
            <el-radio-button label="사용" :value="true"/>
          </el-radio-group>
          <button type="button" class="btn medium outlined" @click="handleDelete">삭제</button>
          <button type="button" class="btn medium filled" @click="handleAddBtn">추가</button>
          <button type="button" class="btn medium filled" @click="handleSave">저장</button>
        </div>
      </div>

      <!-- ag그리드 영역 -->
      <div class="grid-wrap" style="height: 450px;">
        <ag-grid-vue
            style="width: 100%; height: 100%"
            :columnDefs="columnInfo"
            :rowData="rowData"
            class="ag-theme-quartz ag-theme-mycustom"
            @grid-ready="onGridReady"
            :rowSelection="'multiple'"
            :rowMultiSelectWithClick="true"
            :gridOptions="gridOptions"
            :headerHeight="`54px`"
            :rowHeight="`64px`"
            >
        </ag-grid-vue>

      </div>
    </div>
  </section>

</template>

<script setup>
import {ref, nextTick} from "vue";
import {AgGridVue} from "ag-grid-vue3";
import alertMsg from "@/utils/toastUtils";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {generateUUID, PROJECT_CODE} from "@/utils/commonUtils";
import { GRID_DEFAULT_OPTION , GRID_CACHE_BLOCK_SIZE} from "@/utils/gridUtils"
import siteMenuApi from "@/apis/siteMenuApi";
import { menuCodeValidation } from "@/utils/validationUtils";
import menuApi from '@/apis/menuApi'

const store = useStore();
const router = useRouter();
const query = router.currentRoute.value.query;
const userInfo = ref(null);
const searchText = ref(query.search || "");
const searchIsUse = ref(query.isUse || "");
let searchParam = {
  search: searchText.value,
  isUse: searchIsUse.value,
};

/** 추가버튼을 클릭했을때 */
function handleAddBtn() {
  const newEntry = {authType: null, groupName: "", idx: generateUUID(), isUse: false};
  const transaction = {
    addIndex: 0,
    add: [newEntry],
  };

  gridApi.value.applyTransaction (transaction);
  gridApi.value.ensureIndexVisible(0, 'top')  // 첫번째 행 보여주기
  gridApi.value.setFocusedCell(0, 'menuCd'); // 첫번째 행의 menuCd cell 포커싱
}

// 조회 버튼시 검색조건으로 데이터조회
const handleSearch = () => {
  searchParam = {
    search: searchText.value,
    isUse: searchIsUse.value,
  };
  router.push({name: "menuSetting", query: searchParam});
  resetGrid();
};

// 검색 input box에서 엔터키시 조회
const handleEnter = (e) => {
  if (13 === e.keyCode) {
    handleSearch();
  }
};

const menuList = ref([]);

/*********************************************  AG-GRID 관련  START ****************************************** */

const cacheBlockSize = ref(20);
const maxBlocksInCache = ref(5);
const gridApi = ref();
const columnInfo = ref([
  {checkboxSelection: true, headerCheckboxSelection: true, flex: 0.1, minWidth: 60},
  {headerName: "아이디", field: "menuCd", editable: true},
  {headerName: "메뉴명", field: "menuNm", editable: true},
  {
    headerName: "사용",
    field: "isUse",
    minWidth: 60,
    width: 60,
    checkboxSelection: false,
    sortable: false,
    flex: 0.1,
    // suppressMenu: true,
    suppressHeaderMenuButton : true,
    editable: true,
    cellRenderer: "agCheckboxCellRenderer",
    cellEditor: "agCheckboxCellEditor",
  },
  {headerName: "주소", field: "menuPath",editable: true},
  {headerName: "비고", field: "remark", editable: true},
  {headerName: "아이콘", field: "",editable: true},
  {headerName: "등록자", field: "insertName"},
  {headerName: "등록일", field: "insertDate"},
  {headerName: "수정자", field: "updateName"},
  {headerName: "수정일", field: "updateDate"},
]);



// grid Default Option 설정하기
const gridOptions = ref(Object.assign({}, GRID_DEFAULT_OPTION, {
  onCellValueChanged: (params) => {
    let isPassed = true

    const field = params.column.colId

    if (field === "menuCd") {
      // 1. 중복 검증
      //수정건
      if(params.data.id){
        if(menuList.value.filter((item) => item.menuCd === params.newValue).length > 1){
          alertMsg("아이디가 중복됩니다.", "", "warning");
          isPassed = false
        }
      }else{
        //신규
        if(menuList.value.filter((item) => item.menuCd === params.newValue).length === 1){
          alertMsg("아이디가 중복됩니다.", "", "warning");
          isPassed = false
        }
      }
      // 2. 값 유효성 검증
      if(!menuCodeValidation(params.newValue)){
          alertMsg("메뉴 코드는 최대 6자리까지의 영문 혹은 숫자만 입력하실 수 있습니다.", "", "warning");
          isPassed = false
          
      }

      //검증에 실패한 경우 기존 값 세팅 
      if(!isPassed){
        if(params.data.id){
          params.node.setDataValue(field, params.oldValue)
        }else{
          params.node.setDataValue(field, null)
        }

        nextTick(() => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: "menuCd",
          });
        });
      }
    }
    const selectedNode = gridApi.value.getDisplayedRowAtIndex(params.rowIndex);

    if (selectedNode) {
      selectedNode.setSelected(true);
    }
    
  }
}));
const rowData = ref();
// Ag-grid 서버사이드 데이터 조회
const getClientSideData = async (params) => {
  try {

    const response = await menuApi.getMenuList();
    //menuList2 = menuList2.data;
    //const response = await siteMenuApi.getMenuList({...searchParam});
    console.log(response);
  
    let rows = response.data;
    rowData.value = rows;

    

 
    
    menuList.value = response.data
    const filterRows = rows.filter(
        (row) =>
            row.menuCd.includes(searchParam.search) || row.menuNm.includes(searchParam.search)
    );
    //params.success({
     // rowData: filterRows
    //});
  } catch (error) {
    //params.fail();
  }
};

const onGridReady = (params) => {
    gridApi.value = params.api;
    //getServerSideData();
    getClientSideData();
};

const getRowId = (params) => {
  return params.data.id;
};

// Ag-grid 리프레시
const resetGrid = () => {
    //refreshClientSideRowModel
    getClientSideData();
  //gridApi.value.refreshClientSideRowModel("sort");
};

// 저장
const handleSave = async () => {
  const selectedRows = [];
  let hasEmptyFields = false;

  let isDuplicated = false; //중복 여부 확인
  gridApi.value.forEachNode((rowNode) => {
    if (rowNode.isSelected()) {
      
      //기존 메뉴
      if(menuList.value.filter((item) => item.menuCd === rowNode.data.menuCd).length > 1){
        isDuplicated = true
      }

      if (!rowNode.data.menuCd || !rowNode.data.menuNm) {
        hasEmptyFields = true;
      }
      selectedRows.push(rowNode.data);
    }
  });

  
  if(isDuplicated){
    alertMsg("아이디가 중복됩니다.", "", "warning");
    return;
  }

  if (hasEmptyFields) {
    alertMsg("메뉴명과 아이디는 필수입니다.", "", "warning");
    return;
  }

  if (selectedRows.length > 0) {
    try {
      const payload = {
        insertId: "admin",
        Menus: selectedRows.map((row) => ({
          //id: row.id || null,
          //projectCode: row.id ? row.projectCode : PROJECT_CODE, // 수정 시 기존 projectCode 유지, 신규 추가 시 1로 설정
          menuCd: row.menuCd || "", // 값이 없으면 빈 문자열로 설정
          menuNm: row.menuNm || "", // 값이 없으면 빈 문자열로 설정
          menuPath: row.menuPath || "", // 값이 없으면 빈 문자열로 설정
          //imageUrl: row.imageUrl || "", // 값이 없으면 빈 문자열로 설정
          remark: row.remark || "", // 값이 없으면 빈 문자열로 설정
          //icon: row.icon || "", // 값이 없으면 빈 문자열로 설정
          isUse: row.isUse,
        })),
      };
      const result = await menuApi.updateMenu(payload); // saveSiteMenu API 호출
        console.log(result);
      if (result.code === "00") {
        alertMsg("저장되었습니다.", "", "success");
        resetGrid();
        gridApi.value.deselectAll(); // 저장 후 체크박스 비활성화
      } else {
        alertMsg("저장에 실패했습니다.", "", "error");
      }
    } catch (error) {
        console.log(error);
      alertMsg("저장 중 오류가 발생했습니다.", "", "error");
    }
  } else {
    alertMsg("선택된 데이터가 없습니다.", "", "warning");
  }
};

// 삭제
const handleDelete = async () => {
  const deleteRows = [];

// 가져온 데이터 중 선택된 데이터만 가져오기
  gridApi.value.forEachNode((rowNode) => {
    if (rowNode.selected) {
        deleteRows.push(rowNode.data.id);
    }
  });

  if (deleteRows.length > 0) {
    store.dispatch("confirm/open", {
      title: "메뉴 삭제",
      message: "삭제 하시겠습니까?",
      callback: async () => {
        try {
          const deleteResult = await siteMenuApi.deleteMenu(deleteRows);
          if (deleteResult.code !== "00") {
            throw new Error("메뉴 삭제 실패");
          }
          alertMsg("삭제되었습니다.", "", "success");
          resetGrid();
        } catch (error) {
          alertMsg("삭제 중 오류가 발생했습니다.", "", "error");
        }
      },
    });
  } else {
    alertMsg("삭제할 메뉴를 선택해 주세요.", "", "warning");
  }
};
/****************************  AG-GRID 관련  END ****************************************************************** */
</script>
