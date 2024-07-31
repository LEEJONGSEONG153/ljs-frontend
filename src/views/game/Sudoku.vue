<template>
    

    <button class="btnNumber" onclick="fnShowValue(0)">0</button>
    <button class="btnNumber" onclick="fnShowValue(1)">1</button>
    <button class="btnNumber" onclick="fnShowValue(2)">2</button>
    <button class="btnNumber" onclick="fnShowValue(3)">3</button>
    <button class="btnNumber" onclick="fnShowValue(4)">4</button>
    <button class="btnNumber" onclick="fnShowValue(5)">5</button>
    <button class="btnNumber" onclick="fnShowValue(6)">6</button>
    <button class="btnNumber" onclick="fnShowValue(7)">7</button>
    <button class="btnNumber" onclick="fnShowValue(8)">8</button>
    <button class="btnNumber" onclick="fnShowValue(9)">9</button>
    <div class="board" id="board"></div>
    <table class="backboard" id="backboard">
        <tbody>
            <tr>
                <td class="backboard-title">1</td>
                <td id="td_1"></td>
            </tr>
            <tr>
                <td class="backboard-title">2</td>
                <td id="td_2"></td>
            </tr>
            <tr>
                <td class="backboard-title">3</td>
                <td id="td_3"></td>
            </tr>
            <tr>
                <td class="backboard-title">4</td>
                <td id="td_4"></td>
            </tr>
            <tr>
                <td class="backboard-title">5</td>
                <td id="td_5"></td>
            </tr>
            <tr>
                <td class="backboard-title">6</td>
                <td id="td_6"></td>
            </tr>
            <tr>
                <td class="backboard-title">7</td>
                <td id="td_7"></td>
            </tr>
            <tr>
                <td class="backboard-title">8</td>
                <td id="td_8"></td>
            </tr>
            <tr>
                <td class="backboard-title">9</td>
                <td id="td_9"></td>
            </tr>

        </tbody>
    </table>
</template>
<script setup>
    var count = 9;  // 가로/세로 칸 수
    var sudoku;
    var sudokuAnswer;
    fnCreateSudoku();

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

        for (num of nums) {
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
        const boardDiv = document.getElementById("board");
        boardDiv.innerHTML = "";

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
                
                boardDiv.appendChild(input);
            }
        }
    }

    function fnCheckValue() {
        console.log(sudokuAnswer);
    }

    function fnShowValue(value) {
        for (obj of document.querySelectorAll("input")) {
            if (value == obj.value && value != "0") {
                obj.style.color = "ffffff";
                obj.style.background = "red";
            }else {
                obj.style.color = "";
                obj.style.background = "";
            }
        }

        for (obj of document.querySelectorAll(".backboard-title")) {
            if (value == obj.innerHTML) {
                obj.style.background = "red";
            }else {
                obj.style.background = "#BDBDBD";
            }
        };
    }

    function fnCountValue(value) {
        var count = 0;
        for (input of document.querySelectorAll("input")) {
            if (value == input.value) {
                count++;
            }
        }

        var tdText = document.getElementById("td_" + value);
        tdText.innerText = count + " / 9";
    }
</script>
<style scoped>
        input {
            width: 40px;
            height: 40px;
            text-align: center;
            font-size: 18px;
			border:1px solid #444444;
			margin:0;
			padding:0;
        }
        
        input:disabled {
            border:1px solid #444444;
            background:#BDBDBD;
            color:#ffffff;
        }

        input:nth-child(n+1):nth-child(-n+9) {
            border-top:5px solid #444444;
        }

        input:nth-child(n+28):nth-child(-n+36) {
            border-top:5px solid #444444;
        }

        input:nth-child(n+55):nth-child(-n+63) {
            border-top:5px solid #444444;
        }

        input:nth-child(n+73):nth-child(-n+81) {
            border-bottom:5px solid #444444;
        }

        input:nth-child(9n + 1), input:nth-child(9n + 4), input:nth-child(9n + 7) {
            border-left:5px solid #444444;
        }

        input:nth-child(9n) {
            border-right:5px solid #444444;
        }

        .board {
            margin-top:10px;
            display: grid;
            grid-template-columns: repeat(9, 40px);
            gap: 0px;
            float:left;
        }

        .font-orange {
            color:orange;
        }
        
        .btnNumber {
            width:30px;
            height:30px;
            font-size:14px;
        }

        .backboard {
            margin-top:10px;
            margin-left:10px;
            border:1px solid #444444;
            width:150px;
            height:360px;
            float:left;
            border-collapse: collapse;
        }

        .backboard td {
            border:1px solid #444444;
            padding:0px 5px;
            text-align: center;
            font-weight:900;
            color:#444444;
        }

        .backboard td:first-child {
            color:#ffffff;
            width:50px;    
        }

        .backboard-title {
            background:#BDBDBD;
        }

        .active {
            background:red;
        }
</style>