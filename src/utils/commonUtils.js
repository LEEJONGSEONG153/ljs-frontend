//========================== 상수 =================

// project code 변할일이 없다 -> 1 : CRK IoT  
export const PROJECT_CODE = 1;
export const MOBILE_SIZE = 600;  //모바일사이즈 
export const TABLET_SIZE = 1280;  //테블릿가로사이즈
// export const TABLET_HEIGHT_SIZE = 980 // 테블릿 세로사이즈

//============================함수 ================

/**
 * Null 체크
 * 2024.02.28 - Saylee
 * @param {*} value Null 체크값
 * @returns 
 */
export const nullCheck = (value) => {
  return value === "" || value === null || value === undefined || (typeof value === "object" && !Object.keys(value).length);
};


/**
 * 숫자 3자리씩 표기
 * 2024.02.28 - Saylee
 * @param {*} value 숫자
 * @returns 
 */
export const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}
  


export const isUseText  = (isUse) => {
  let isUseText = "미사용"
  if(isUse){
    isUseText = "사용"
  }
  return isUseText;
}

/**
 * 현재날짜 String 으로 return 
 */
export const currentDateString = (date) => {
  // Date 객체 생성

  let dateObject = new Date();

  // 원하는 형식으로 날짜 형식화
  let formattedDate =
    dateObject.getFullYear() +
    '-' +
    ('0' + (dateObject.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + dateObject.getDate()).slice(-2) +
    ' ' +
    ('0' + dateObject.getHours()).slice(-2) +
    ':' +
    ('0' + dateObject.getMinutes()).slice(-2) +
    ':' +
    ('0' + dateObject.getSeconds()).slice(-2);
  return formattedDate;
};

/**
 * 특정 날짜(date)를 String 으로 return 
 * @param {*} date  //필수
 * @returns 
 */
export const specificDateString = (date) => {
  
  let dateObject = date;

  // 원하는 형식으로 날짜 형식화
  let formattedDate = dateObject.getFullYear() + "-" + 
                      ("0" + (dateObject.getMonth() + 1)).slice(-2) + "-" + 
                      ("0" + dateObject.getDate()).slice(-2) + " " +
                      ("0" + dateObject.getHours()).slice(-2) + ":" + 
                      ("0" + dateObject.getMinutes()).slice(-2) + ":" + 
                      ("0" + dateObject.getSeconds()).slice(-2);
  return formattedDate   
};

/**
 * 셀렉트박스에 필요한 list로 바꾸기
 * @param {*} selectList 
 * @returns 
 */
export const convertSelectListToMap = (selectList) => {
  const result = {};
  if (selectList) {
    selectList.forEach((item) => {
      result[item.value] = item.label;
    });
  }
  return result;
};

/**
 * 2024.06.14 -- Saylee 
 * 고유한 UUID 생성  -> 하이푼 없이  (하이푼 빼야함 파일업로드처리정책시 하이푼없이사용중임)
 * @returns
 */
export const generateUUID = () => {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};


/**
 * 월데이터를 년월 데이터로 변환
 * @param {*} month 숫자
 * @returns ${year}년 ${month}개월
 */
export const convertMonthToYearMonth = (month) => {
  let str = ''
  if(month < 12){
    str = `${month}개월`
  }else{
    const years = Math.floor(month/12)
    const months = month%12
    str = `${years}년 ${months}개월`
  }
  return str;
}


export const isUseYearText = (year) => {
  if (year > 0) {
    return `${year}년 이상`;
  }
  return '1년 이내';
};

/**
 * 절대값 생성
 * @param {*} value number
 * @returns number
 */
export const absNum = (value) => {
  let num = value;
  if(value){
    num = Math.abs(value)
  }
  return num
}

/**
 * 
 * @returns YYYYMM리턴
 */
export const getCurrentYYYYMM = () => {
  const date = new Date(); // 현재 날짜와 시간을 나타내는 Date 객체 생성

  const year = date.getFullYear(); // 연도 가져오기
  let month = date.getMonth() + 1; // 월 가져오기 (0부터 시작하므로 1을 더해야 함)

  // 월이 1자리 숫자인 경우 앞에 0을 추가하여 두 자리 숫자로 만듦
  month = month < 10 ? '0' + month : month;

  const yyyymm = `${year}${month}`; // 연도와 월을 결합하여 YYYYMM 형식의 문자열 생성

  return yyyymm; // YYYYMM 문자열 반환
}


export const getCurrentTime = (isNotHypun) => {

  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
  const date = String(now.getDate()).padStart(2, '0');
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  if(isNotHypun){
    return `${year}${month}${date}${hours}${minutes}${seconds}`;
  }else{
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`; 
  }
}

/**
 * 2024.07.17 saylee
 * 파일저장시 파일이름은 uuid(-제거) + HHMMSS
 */
export const getFileName = () =>{
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const uuid = generateUUID() 
  return `${uuid}${hours}${minutes}${seconds}`
}

/**
 * 2024.07.17 saylee
 * 파일 확장자로 s3에 올릴 경로 추출  (펌웨어 ,제품의 모델 이미지 부품이미지 는 해당 함수 쓰지말고  별도로 지정해서 쓰세요.)
 */
export const getFileDir = (fileExt) =>{

  let destination;

  // 확장자에 따라 경로 설정
  if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExt.toLowerCase())) {
      destination = 'images';
  } else if (['mp4', 'avi', 'mov', 'wmv'].includes(fileExt.toLowerCase())) {
      destination = 'videos';
  } else {
      destination = 'files';
  }

  return destination
}
/**
 * 2024.07.17 saylee
 * fileurl(Objectkey) 생성  
 * //(펌웨어 ,제품의 모델 이미지 부품이미지 는 해당 함수 쓰지말고  별도로 지정해서 쓰세요.)
 * @param {*} fileExt 
 * @returns 
 */
export const getFileUrl = (fileExt) =>{
  if(!fileExt) return ""

  let fileDir = getFileDir(fileExt);
  let yyyymm = getCurrentYYYYMM();
  let fileName = getFileName();
  
  return `files/${fileDir}/${yyyymm}/${fileName}.${fileExt}`  //objectkey
}

/**
 * 2024.07.18  - saylee
 * Select Box Option이 닫히면   포커스 blur처리
 * 모바일시 키패드 닫히도록 하기위함
 */
export const handleActiveBlur = (isClose) => {
  // settimeout 을 0.0001초 두어서 브라우저에상관없이 작동하도록..
  if(!isClose){
    setTimeout(function() {
      var focusedElement = document.activeElement;
      if (focusedElement) {
          focusedElement.blur();
      }
    }, 1);
  }

}



/**
 * 2024-07-22 saylee
 * 웹뷰로 접근했는지 아닌지 (모바일 기기에서도 , 브라우저로 들어왔는지, 웹뷰로들어왔는지 체크할경우사용하시오.)
 * return ( 브라우저로 접근했으면 browser  , 안드로이드 웹뷰면 androidWebView , IOS 웹뷰면 iosWebView    ) 
 */
export const getCheckWebView = () => {

	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	let result = "browser";

	// Check if the user agent indicates Android WebView
	const isAndroid = /Android/.test(userAgent);
	const isAndroidWebView = /wv/.test(userAgent) || /; wv\)/.test(userAgent) || /\) Version\//.test(userAgent);

	// Check if the user agent indicates iOS WebView
	let isIOS = /iPhone|iPad|iPod/.test(userAgent);
	
	//최근 아이패드는 os가 mac으로 찍혀서 maxTouchPoints 로 구분한다.
	if(navigator.maxTouchPoints > 0){
		isIOS = true;
	}

	const isIOSWebView = /AppleWebKit/.test(userAgent) && !/Safari/.test(userAgent);

	if (isAndroid && isAndroidWebView) {
		result = "androidWebView";
	} else if (isIOS && isIOSWebView) {
		result = "iosWebView";
	}

	return result;
}

/**
 * 2024-07-22 leejingyeong
 * OS 판별 (android/ios)
 */
export const getCheckDeviceOS = () => {
  const value = navigator.userAgent.toLocaleLowerCase()
  let result = ''
  if(value.indexOf("iphone") > -1||value.indexOf("ipad") > -1||value.indexOf("ipod") > -1){
    result = "ios";
  } else {
    result = 'android'
  } 
  return result
}

/**
 * 2024-07-22 leejingyeong
 * 모바일/태블릿 판별 (ios/android mobile/tablet)
 */
export const getCheckMobileTablet = () => {
  const value = navigator.userAgent.toLocaleLowerCase()
  let result = ''
  if(value.indexOf("iphone") > -1 || value.indexOf("ipod") > -1){
    result = "iosMobile";
  }else if (value.indexOf("ipad") > -1) {
    result = "iosTablet";
  }else{
    if (value.includes('mobile')) {
      // 모바일인 경우
      result = 'androidMobile'
    }else{
      result = 'androidTablet'
    }
  }
  return result
}