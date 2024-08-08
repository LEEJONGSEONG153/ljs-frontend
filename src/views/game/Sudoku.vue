<template>
    <div class="sudoku">
        <h2>푸헬헬</h2>
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
        <div class="board" ref="board"></div>
        <table class="backboard" id="backboard">
            <tbody>
                <tr>
                    <td class="backboard-title">1</td>
                    <td ref="td_1"></td>
                </tr>
                <tr>
                    <td class="backboard-title">2</td>
                    <td ref="td_2"></td>
                </tr>
                <tr>
                    <td class="backboard-title">3</td>
                    <td ref="td_3"></td>
                </tr>
                <tr>
                    <td class="backboard-title">4</td>
                    <td ref="td_4"></td>
                </tr>
                <tr>
                    <td class="backboard-title">5</td>
                    <td ref="td_5"></td>
                </tr>
                <tr>
                    <td class="backboard-title">6</td>
                    <td ref="td_6"></td>
                </tr>
                <tr>
                    <td class="backboard-title">7</td>
                    <td ref="td_7"></td>
                </tr>
                <tr>
                    <td class="backboard-title">8</td>
                    <td ref="td_8"></td>
                </tr>
                <tr>
                    <td class="backboard-title">9</td>
                    <td ref="td_9"></td>
                </tr>

            </tbody>
        </table>
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

    var count = 9;  // 가로/세로 칸 수
    var sudoku;
    var sudokuAnswer;
    

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

    function fnCreateEmpty(sudoku) {
        var emptyCount = 0; 
        var emptyBoolean = true;
        while(emptyBoolean) {
            var emptyRow = Math.floor(Math.random() * 9);
            var emptyCol = Math.floor(Math.random() * 9);

            if (sudoku[emptyRow][emptyCol] != 0) {    
                sudoku[emptyRow][emptyCol] = "";
            
                emptyCount++;
            }

            if (emptyCount == 50) {
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
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
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
        //const boardDiv = document.getElementById("board");
        //board.value = "";
        //boardDiv.innerHTML = "";

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
                        target.style.color = "#444444";
                    }else {
                        target.style.color = "red";
                    }

                    fnCountValue(e.key);
                });
                
                board.value.appendChild(input);
            }
        }
    }

    function fnCheckValue() {
        console.log(sudokuAnswer);
    }

    function fnShowValue(value) {
        for (const obj of document.querySelectorAll("input")) {
            if (value == obj.value && value != "0") {
                obj.style.color = "ffffff";
                obj.style.background = "red";
            }else {
                obj.style.color = "";
                obj.style.background = "";
            }
        }

        for (const obj of document.querySelectorAll(".backboard-title")) {
            if (value == obj.innerHTML) {
                obj.style.background = "red";
            }else {
                obj.style.background = "#BDBDBD";
            }
        };
    }

    function fnCountValue(value) {
        var count = 0;
        for (const input of document.querySelectorAll("input")) {
            if (value == input.value) {
                count++;
            }
        }

        //var tdText = document.getElementById("td_" + value);
    //    td1.value.innerText = count + " / 9";

        switch(value) {
            case '1':
                td_1.value.innerText = count + " / 9";;
                break;
            case '2':
                td_2.value.innerText = count + " / 9";;
                break;
            case '3':
                td_3.value.innerText = count + " / 9";;
                break;
            case '4':
                td_4.value.innerText = count + " / 9";;
                break;
            case '5':
                td_5.value.innerText = count + " / 9";;
                break;
            case '6':
                td_6.value.innerText = count + " / 9";;
                break;
            case '7':
                td_7.value.innerText = count + " / 9";;
                break;
            case '8':
                td_8.value.innerText = count + " / 9";;
                break;
            case '9':
                td_9.value.innerText = count + " / 9";;
                break;
        }
    }

    onMounted(()=>{
        fnCreateSudoku();
    })
</script>
<style>
    .sudoku input {
        width: 40px; 
        height: 40px;
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

    .sudoku input:nth-child(9n + 1), input:nth-child(9n + 4), input:nth-child(9n + 7) {
        border-left:5px solid #444444;
    }

    .sudoku input:nth-child(9n) {
        border-right:5px solid #444444;
    }

    .sudoku .board {
        margin-top:10px;
        display: grid;
        grid-template-columns: repeat(9, 37px);
        gap: 0px;
        float:left;
    }

    .sudoku .font-orange {
        color:orange;
    }
    
    .sudoku .btnNumber {
        font-size: 1.7rem;
        font-weight: 500;
        border-radius: 0.4rem;
        border: 1px solid black;
        margin: 0px 1px;
        padding: 0 1rem;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
    }

    .sudoku .backboard {
        margin-top:10px;
        margin-left:10px;
        border:1px solid #444444;
        width:150px;
        height:360px;
        float:left;
        border-collapse: collapse;
    }

    .sudoku .backboard td {
        border:1px solid #444444;
        padding:0px 5px;
        text-align: center;
        font-weight:900;
        color:#444444;
    }

    .sudoku .backboard td:first-child {
        color:#ffffff;
        width:50px;    
    }

    .sudoku .backboard-title {
        background:#BDBDBD;
    }

    .sudoku .active {
        background:red;
    }
</style>