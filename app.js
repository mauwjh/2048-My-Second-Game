let rows = []
const numOfSquares = 25
const rowSquares = Math.sqrt(numOfSquares)
let score = 0

const buildBoard = () => {
    for(let i =0; i < numOfSquares; i++){
        $('.board').append($('<div>').addClass('square').text(''))
    }
}

const generateSquares = () => {
    let random = Math.floor(Math.random()*numOfSquares)
    if($('.square').eq(random).text() == '') {
        $('.square').eq(random).text('2')
    } else {
        generateSquares()
    }
}

const arrOfRows = () => {
    for(let i = 0; i < numOfSquares; i += rowSquares) {
        let singleRow = []
        for(let j = 0; j < rowSquares; j++){
            singleRow.push(parseInt($('.square').eq(i + j).text()))
        }
        rows.push(singleRow)
    }
}

const arrOfColumns = () => {
    for(let j = 0; j < rowSquares; j++) {
        let singleRow = []
        for(let i = 0; i < numOfSquares; i+= rowSquares) {
            singleRow.push(parseInt($('.square').eq(i + j).text()))
        }
        rows.push(singleRow)
    }
}

const reverse = () => {
    for(const i of rows) {
        i.reverse()
    }
}

const removeZero = () => {
    for(let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].filter(x => x) 
        let zeroesNum = rowSquares - rows[i].length
        let zeroesFill = Array(zeroesNum).fill('')
        rows[i] = rows[i].concat(zeroesFill)
    }
}

const combineRow = () => {
    for(let i = 0; i < rows.length; i++) {
        for(let j = 0; j < rowSquares - 1; j++) {
            if(rows[i][j] === rows[i][j+1] && rows[i][j] > 0) {
                rows[i][j] = rows[i][j] + rows[i][j+1]
                score += rows[i][j]
                rows[i][j+1] = ''
            }
        }
    }
}

const updateBoardRow = () => {
    for(let i = 0, j=0; i < numOfSquares, j<rows.length; i += rowSquares, j++) {
        for(let k = 0; k < rows[j].length; k++) {
            $('.square').eq(i+k).text(rows[j][k])
        }
    }
}

const updateBoardColumn = () => {
    for(let j = 0; j < rows.length; j++) {
        for(let k = 0, i = 0; k < rows[j].length, i < numOfSquares; k++, i += rowSquares) {
            $('.square').eq(i + j).text(rows[j][k])
        }
    }
}

const changeColors = () => {
    for(const nums in $('.square')) {
        if($('.square').eq(nums).text() == 2) {
            $('.square').eq(nums).css('background-color', '#E4EBF1')
        } else if($('.square').eq(nums).text() == 4) {
            $('.square').eq(nums).css('background-color', '#C9D6E3')
        } else if($('.square').eq(nums).text() == 8) {
            $('.square').eq(nums).css('background-color', '#AEC2D5')
        } else if($('.square').eq(nums).text() == 16) {
            $('.square').eq(nums).css('background-color', '#93ADC8')
        } else if($('.square').eq(nums).text() == 32) {
            $('.square').eq(nums).css('background-color', '#7899BA')
        } else if($('.square').eq(nums).text() == 64) {
            $('.square').eq(nums).css('background-color', '#5D85AC')
        } else if($('.square').eq(nums).text() == 128) {
            $('.square').eq(nums).css('background-color', '#4C7094')
        } else if($('.square').eq(nums).text() == 256) {
            $('.square').eq(nums).css('background-color', '#B2A9C6')
        } else if($('.square').eq(nums).text() == 512) {
            $('.square').eq(nums).css('background-color', '#9C91B6')
        } else if($('.square').eq(nums).text() == 1028) {
            $('.square').eq(nums).css('background-color', '#8678A5')
        } else if($('.square').eq(nums).text() == 2048) {
            $('.square').eq(nums).css('background-color', '#716293')
        } else if($('.square').eq(nums).text() == 0) {
            $('.square').eq(nums).css('background-color', '#ADD7C5')
        }
    }
}

const updateScore = () => {
    $('.score').text(`Score: ${score}`)
}


const left = () => {
    rows = []
    arrOfRows()
    removeZero()
    combineRow()
    removeZero()
    updateBoardRow()
    generateSquares()
    changeColors()
    updateScore()
}

const right = () => {
    rows = []
    arrOfRows()
    reverse()
    removeZero()
    combineRow()
    removeZero()
    reverse()
    updateBoardRow()
    generateSquares()
    changeColors()
    updateScore()
}

const up = () => {
    rows = []
    arrOfColumns()
    removeZero()
    combineRow()
    removeZero()
    updateBoardColumn()
    generateSquares()
    changeColors()
    updateScore()
}

const down = () => {
    rows = []
    arrOfColumns()
    reverse()
    removeZero()
    combineRow()
    removeZero()
    reverse()   
    updateBoardColumn()
    generateSquares()
    changeColors()
    updateScore()
}

const main = () => {
    buildBoard()
    $('body').prepend($('<div>').text(`Score: ${score}`).addClass('score'))
    generateSquares()
    generateSquares()
    changeColors()
    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            up()
        }
        else if (e.keyCode == '40') {
            down()
        }
        else if (e.keyCode == '37') {
        left()
        }
        else if (e.keyCode == '39') {
        right()
        }

    }

    document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            left()
        } else {
            right()
        }                       
    } else {
        if ( yDiff > 0 ) {
            up()
        } else { 
            down()
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
}

$(main)

