
import {MOBILE_SIZE ,TABLET_SIZE} from "@/utils/commonUtils"

export const GRID_CACHE_BLOCK_SIZE = 100;  // 그리드 페이징 개수
// ag-grid 기본 옵션   -> 기본옵션중에 변경해야되는 컬럼이있다면 ...으로 객체 복사하던지, 해당컬럼 에 직접 선언하면 덮어씌우기 됩니다.
export const GRID_DEFAULT_OPTION = {
    defaultColDef: {
        flex: 1,                          // default column 비율
        minWidth: 100,                    // 컬럼 최소사이즈  -> 해당옵션넣어야 화면줄어들대 가로스크롤자동으로생김
        filter : false,                   // 필터 옵션 false
        suppressHeaderMenuButton : true , // 헤더에 햄버거메뉴 삭제옵션
        cellClass: 'cell-center ',        // 행 가운데정렬 class 추가
        sortable : false,                 // 소트기능
    },
    suppressRowClickSelection:true,     // 체크박스 컬럼말고 다른 컬럼누를시 체크박스 안되도록
    headerHeight : "54px",              // 헤더 세로 크기
    rowHeight : "64px",                 // 한행당 세로크기
    detailRowAutoHeight: true,          // 디테일페이지 자동 height Auto로설정
    suppressDragLeaveHidesColumns: true // 컬럼 드래그 누락 방지 옵션
} 

/**
 *  2024.06.20 - saylee
 *  화면 리사이즈시 Ag-grid column 셋팅
 * @param {*} gridApi       //필수
 * @param {*} mobileColumn  //필수
 * @param {*} tabletColumn  //필수
 * @param {*} pcColumn      //필수
 */
export const handleColumnResize = (gridApi , mobileColumn  , pcColumn ) => {

    if(gridApi){
        gridApi.setGridOption('columnDefs', [])
        if (window.innerWidth <= MOBILE_SIZE) {
          // 모바일용 컬럼설정
          gridApi.setGridOption('columnDefs', mobileColumn)  
        } else {
            gridApi.setGridOption('columnDefs', pcColumn)  
            //전체화면일경우엔, 열려있는 디테일 닫아주기
            closeAllDetails(gridApi);
        }
    }
        
};

/**
 *  2024.06.20 - saylee
 *  열려있는 디테일 닫아주기
 * @param {*} gridApi   //필수
 */
export const closeAllDetails = (gridApi) => {
  if(gridApi){
      gridApi.forEachNode((node) => {
        if (node.master && node.expanded) {
          node.setExpanded(false);
        }
    });
  }
};

/**
 * 2024.06.27 - saylee
 * 디테일 페이지에서 보여줄항목 셋팅하기
 */
export const sizeToFitColumnDataList = (data , mobileColumnList ) => {
    let columnDataList = []
    if (window.innerWidth <= MOBILE_SIZE) {
        // 모바일용 컬럼설정
        let dataList = mobileColumnList.map(column => {
        return { ...column, columnText : data[column.field] };
        })
        columnDataList = dataList

    } else {
          columnDataList = []
    }
    return columnDataList;
}

/**
 * 2024.06.27 - saylee
 * 디테일페이지 열고닫기 -> 만약 페이지별로다르다면 해당페이지에서 별도로 선언해서사용하세요
 * 해당함수는 단순 컬럼 정보만 표시할떄 디테일 열고닫기용입니다.
 * @param {*} event 
 * @returns 
 */
export const  onRowSelected = (event , isTableDetail) =>{

  if(window.innerWidth > MOBILE_SIZE){
    return;
  } 
  if(event.node.expanded){
    event.node.setExpanded(false);
  }else{
    event.node.setExpanded(true);
  }

}



