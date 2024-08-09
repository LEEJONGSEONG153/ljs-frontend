<template>
    <div class="sudoku">
        <div class="container">
            <div class="container-top">
                <div class="select container-lv">
                    <input type="radio" id="sLevelL" name="sudokuLevel" value="L" checked/><label for="sLevelL">에이..</label>
                    <input type="radio" id="sLevelM" name="sudokuLevel" value="M" /><label for="sLevelM">그냥~</label>
                    <input type="radio" id="sLevelH" name="sudokuLevel" value="H" /><label for="sLevelH">오호!</label>
                    <input type="radio" id="sLevelU" name="sudokuLevel" value="U" /><label for="sLevelU">어쭈?</label>
                </div>
                <div class="container-btn">
                    <button class="s-btn btnStart" @click="fnStartTimer()">게임시작</button>
                    <button class="s-btn btnEnd" @click="fnEndTimer()">게임종료</button>
                </div>
            </div>
            <div class="container-num" >
                <button class="btnNumber" @click="fnShowValue(0)">0</button>
                <button class="btnNumber" @click="fnShowValue(1)">1</button>
                <button class="btnNumber" @click="fnShowValue(2)">2</button>
                <button class="btnNumber" @click="fnShowValue(3)">3</button>
                <button class="btnNumber" @click="fnShowValue(4)">4</button>
                <button class="btnNumber" @click="fnShowValue(5)">5</button>
                <button class="btnNumber" @click="fnShowValue(6)">6</button>
                <button class="btnNumber" @click="fnShowValue(7)">7</button>
                <button class="btnNumber" @click="fnShowValue(8)">8</button>
                <button class="btnNumber" @click="fnShowValue(9)">9</button>
            </div>
            <div class="container-board">
                <div class="board" ref="board"></div>
                <table class="backboard" id="backboard">
                    <thead>
                        <tr>
                            <th class="backboard-title">1</th>
                            <th class="backboard-title">2</th>
                            <th class="backboard-title">3</th>
                            <th class="backboard-title">4</th>
                            <th class="backboard-title">5</th>
                            <th class="backboard-title">6</th>
                            <th class="backboard-title">7</th>
                            <th class="backboard-title">8</th>
                            <th class="backboard-title">9</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="backboard-num" ref="td_1"></td>
                            <td class="backboard-num" ref="td_2"></td>
                            <td class="backboard-num" ref="td_3"></td>
                            <td class="backboard-num" ref="td_4"></td>
                            <td class="backboard-num" ref="td_5"></td>
                            <td class="backboard-num" ref="td_6"></td>
                            <td class="backboard-num" ref="td_7"></td>
                            <td class="backboard-num" ref="td_8"></td>
                            <td class="backboard-num" ref="td_9"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div ref="areaTime" style="width:100%; height:100px; float:left; text-align:center; padding:10px; font-size:30px; font-weight:bold;"></div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';

    const board = ref(null);
    const td_1 = ref(null);
    const td_2 = ref(null);
    const td_3 = ref(null);
    const td_4 = ref(null);
    const td_5 = ref(null);
    const td_6 = ref(null);
    const td_7 = ref(null);
    const td_8 = ref(null);
    const td_9 = ref(null);
    const areaTime = ref(null);

    // 표시 색상 정보
    let errorColor = "#DB0000";
    let normalColor = "#444444";
    let normalBgColor = "#444444";
    let viewBgColor = "#DB0000";

    // 수도쿠 정보
    let count = 9;  // 가로/세로 칸 수
    let sudoku = [];
    let sudokuAnswer;
    let sudokuLevel;
    let sudokuLvCount;

    // 타이머 정보
    let gameStart = false;
    let sTime = 0;
    let timerId;

    // 수도쿠 생성
    function fnCreateSudoku() {
        sudoku = [];

        // 배열 생성
        for (var ii = 0; ii < count; ii++) {
            sudoku.push(Array(count).fill(0));
        }

        // 수도쿠 배열 생성
        fnMakeSudoku(sudoku);

        // 배열이 완성되지 않았을 경우 재귀함수
        if (fnFindEmptyCell(sudoku) != null) {
            fnCreateSudoku();
        }else {
            // 정답 배열 복사
            sudokuAnswer = JSON.parse(JSON.stringify(sudoku));
            // 퍼즐의 문제를 생성합니다.
            fnCreateEmpty(sudoku);
        }
    }

    // 난수 생성
    function fnGetRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 빈Cell 생성
    function fnCreateEmpty(sudoku) {
        // 난이도
        sudokuLevel = document.querySelector("input[name='sudokuLevel']:checked").value;

        if (sudokuLevel == "L") {
            sudokuLvCount = fnGetRandom(30, 40);
        }else if (sudokuLevel == "M") {
            sudokuLvCount = fnGetRandom(40, 50);
        }else if (sudokuLevel == "H") {
            sudokuLvCount = fnGetRandom(50, 60);
        }else if (sudokuLevel == "U") {
            sudokuLvCount = fnGetRandom(60, 70);
        }

        var emptyCount = 0; 
        var emptyBoolean = true;
        while(emptyBoolean) {
            var emptyRow = Math.floor(Math.random() * 9);
            var emptyCol = Math.floor(Math.random() * 9);

            if (sudoku[emptyRow][emptyCol] != 0) {    
                sudoku[emptyRow][emptyCol] = "";
            
                emptyCount++;
            }

            if (emptyCount == sudokuLvCount) {
                emptyBoolean = false;
            }            
        }

        fnRenderBoard(sudoku);
    }

    // 수도쿠 배열 생성
    function fnMakeSudoku(sudoku) {
        var emptyCell = fnFindEmptyCell(sudoku);

        if (emptyCell == null) {
            return true;
        }

        // 숫자 배열 생성
        var nums = [];

        for (var ii = 0; ii < sudoku.length; ii++) {
            nums.push(ii + 1);
        }

        // 숫자배열 섞기
        nums = fnMixArry(nums);

        for (const num of nums) {
            if (fnValidation(sudoku, emptyCell[0], emptyCell[1], num)) {
                sudoku[emptyCell[0]][emptyCell[1]] = num;
                fnMakeSudoku(sudoku);
            }
        }
    }

    // 빈Cell 찾기
    function fnFindEmptyCell(sudoku) {
        for (var ii = 0; ii < sudoku.length; ii++) {
            for (var jj = 0; jj < sudoku[ii].length; jj++) {
                if (sudoku[ii][jj] == 0 || sudoku[ii][jj] == "") {
                    return [ii, jj];
                }
            }
        }
        return null;
    }

    // 배열 섞기
    function fnMixArry(array) {
        // Fisher-Yates shuffle 알고리즘을 사용하여 배열을 섞습니다.
        for (let ii = array.length - 1; ii > 0; ii--) {
            const jj = Math.floor(Math.random() * (ii + 1));
            [array[ii], array[jj]] = [array[jj], array[ii]];
        }
        return array;
    }

    // 배열 정합성 체크
    function fnValidation(sudoku, row, col, num) {
        // 가로
        for (var ii = 0; ii < sudoku.length; ii++) {
            if (sudoku[row][ii] == num) {
                return false;
            }
        }
        
        // 세로
        for (var ii = 0; ii < sudoku[row].length; ii++) {
            if (sudoku[ii][col] == num) {
                return false;
            }
        }

        // 그룹
        var groupRow = Math.floor(row / 3, 0) * 3
        var groupCol = Math.floor(col / 3, 0) * 3

        for (var ii = groupRow; ii < groupRow + 3; ii++) {
            for (var jj = groupCol; jj < groupCol + 3; jj++) {
                if (sudoku[ii][jj] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    // 수도쿠 html 그리기
    function fnRenderBoard(sudoku) {
        // const boardDiv = document.getElementById("board");
        // boardDiv.innerHTML = "";

        for (var ii = 0; ii < sudoku.length; ii++) {
            for (var jj = 0; jj < sudoku[ii].length; jj++) {
                const input = document.createElement("input");
                input.type = "text";

                input.value = sudoku[ii][jj];
                input.id = "input_" + ii + "_" + jj;

                if (input.value != "") {
                    input.disabled = true;

                    fnCountValue(input.value);
                }

                input.setAttribute("maxlength", "1");
                input.addEventListener("keyup", (e) => {
                    var targetId = e.target.id;
                    var splitVal = targetId.split("_");

                    var ii = splitVal[1];   // row
                    var jj = splitVal[2];   // col

                    var target = document.getElementById(targetId);

                    if (fnValidation(sudoku, ii, jj, e.key)) {
                        target.style.color = normalColor;

                        sudoku[ii][jj] = e.key;
                    }else {
                        target.style.color = errorColor;
                        sudoku[ii][jj] = "";
                    }

                    fnCountValue(e.key);

                    // 빈 cell이 없을 경우 게임 종료
                    if (fnFindEmptyCell(sudoku) == null) {
                        fnEndTimer();
                    }
                });
                
                board.value.appendChild(input);
            }
        }
    }

    // 수도쿠판 색상 표시
    function fnShowValue(value) {
        if (gameStart) {
            for (const obj of document.querySelectorAll("input")) {
                if (value == obj.value && value != "0") {
                    obj.style.color = "ffffff";
                    obj.style.background = viewBgColor;
                }else {
                    obj.style.color = "";
                    obj.style.background = "";
                }
            }

            for (const obj of document.querySelectorAll(".backboard-title")) {
                if (value == obj.innerHTML) {
                    obj.style.background = viewBgColor;
                }else {
                    obj.style.background = normalBgColor;
                }
            };
        }else {
            alert("게임이 시작되지 않았습니다.");
            return;
        }
    }

    // 수도쿠 숫자 표시
    function fnCountValue(value) {
        var count = 0;

        for (var ii = 0; ii < sudoku.length; ii++) {
            for (var jj = 0; jj < sudoku[ii].length; jj++) {
                if (sudoku[ii][jj] == value) {
                    count++;
                }
            }
        }

        // var tdText = document.getElementById("td_" + value);
        // tdText.innerText = count + " / 9";
        switch(value) {
            case '1':
                td_1.value.innerText = count;
                break;
            case '2':
                td_2.value.innerText = count;
                break;
            case '3':
                td_3.value.innerText = count;
                break;
            case '4':
                td_4.value.innerText = count;
                break;
            case '5':
                td_5.value.innerText = count;
                break;
            case '6':
                td_6.value.innerText = count;
                break;
            case '7':
                td_7.value.innerText = count;
                break;
            case '8':
                td_8.value.innerText = count;
                break;
            case '9':
                td_9.value.innerText = count;
                break;
        }
    }

    // 타이머 시작
    function fnStartTimer() {
        if (gameStart) {
            alert("게임을 진행하고 있습니다.\n종료 후 다시 시작해주세요.");
            return;
        }

        // 기존 수도쿠 삭제
        board.value.innerHTML = "";
        
        // 수도쿠 배열 생성
        fnCreateSudoku();

        sTime = 0;
        // document.querySelector("#areaTime").innerText = "00 : 00 : 00";
        areaTime.value.innerText = "00 : 00 : 00";

        // 타이머 종료
        clearInterval(timerId);

        timerId = setInterval(function() {
            sTime++;

            var sHour = 0;
            var sMin = 0;
            var sSec = 0;

            sHour = Math.floor(sTime / (60 * 60));
            var remainTime = sTime % (60 * 60);
            sMin = Math.floor(remainTime / 60);
            var sSec = remainTime % 60;
        
            // document.querySelector("#areaTime").innerText = sHour.toString().padStart(2, "0") + " : " + sMin.toString().padStart(2, "0") + " : " + sSec.toString().padStart(2, "0");    
            areaTime.value.innerText = sHour.toString().padStart(2, "0") + " : " + sMin.toString().padStart(2, "0") + " : " + sSec.toString().padStart(2, "0");    
        }, 1000);

        gameStart = true;
    }

    // 타이머 종료
    function fnEndTimer() {
        // 모든 cell disabled
        document.querySelectorAll("input[type='text']").forEach((element) => {
            element.readOnly = true;
        });

        // 타이머 종료
        clearInterval(timerId);
        
        gameStart = false;

        alert("게임을 종료했습니다.");
    }

    onMounted(() => {
        // fnCreateSudoku();
    })

</script>
<style>
    .sudoku * {
        margin:0;
        padding:0;
    }

    .sudoku .container {
        width:320px; 
        height:100%; 
        float:left;
    }

    .sudoku .container .container-top {
        width:100%; 
        /* border:1px solid blue; */
    }

    .sudoku .container .container-lv {
        /* border:1px solid orange; */
        padding:5px 0;
    }

    .sudoku .container .container-lv input[type=radio] {
        display: none;
    }

    .sudoku .container .container-lv input[type=radio] + label {
        display: inline-block;
        cursor: pointer;
        height: 25px;
        width: 80px;
        border: none;
        line-height: 25px;
        text-align: center;
        font-size:13px;
    }

    .sudoku .container .container-lv input[type=radio] + label {
        background-color: #fff;
        color: #444444;
    }

    .sudoku .container .container-lv input[type=radio]:checked + label {
        background-color: #444444;
        color: #fff;
    }

    .sudoku .container .container-btn {
        /* border:1px solid orange; */
        padding:5px 0;
    }

    .sudoku .container .container-btn .s-btn {
        padding:5px;
        width:160px;
    }

    .sudoku .container .container-num {
        float:left; 
        width:100%;
        padding:5px 0;
        /* border:1px solid orange; */
    }

    .sudoku .container .container-num button {
        width:64px;
        height:30px;
    }

    .sudoku button {
        background:#ffffff;
        border:1px solid #444444;
        color:#444444;
        cursor: pointer;
    }

    .sudoku .container .container-board {
        float:left; 
        width:100%;
        padding:5px 0;
    }

    .sudoku .container .container-board .board {
        display: grid;
        grid-template-columns: repeat(9, 35px);
        gap: 0px;
        float:left;
    }

    .sudoku input[type='text'] {
        width: 34px;
        height: 34px;
        text-align: center;
        font-size: 18px;
        border:1px solid #444444;
        margin:0;
        padding:0;
    }
    
    .sudoku input:disabled {
        border:1px solid #444444;
        background:#BDBDBD;
        color:#ffffff;
    }

    .sudoku input:nth-child(n+1):nth-child(-n+9) {
        border-top:5px solid #444444;
    }

    .sudoku input:nth-child(n+28):nth-child(-n+36) {
        border-top:5px solid #444444;
    }

    .sudoku input:nth-child(n+55):nth-child(-n+63) {
        border-top:5px solid #444444;
    }

    .sudoku input:nth-child(n+73):nth-child(-n+81) {
        border-bottom:5px solid #444444;
    }

    .sudoku input:nth-child(9n + 1), .sudoku input:nth-child(9n + 4), .sudoku input:nth-child(9n + 7) {
        border-left:5px solid #444444;
    }

    .sudoku input:nth-child(9n) {
        border-right:5px solid #444444;
    }

    .sudoku .container .container-board .backboard {
        margin-top:5px;
        border:1px solid #444444;
        width:320px;
        height:60px;
        float:left;
        border-collapse: collapse;
    }

    .sudoku .container .container-board .backboard .backboard-title {
        height:30px;
        background:#444444;
        color:#ffffff;
        font-size: 16px;
    }

    .sudoku .container .container-board .backboard .backboard-num {
        height:30px;
        color:#444444;
        border:1px solid #444444;
        font-size: 16px;
        text-align:center;
        font-weight:bold;
    }    
</style>