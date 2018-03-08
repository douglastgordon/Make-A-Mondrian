const canvas = document.getElementById("canvas")
const [canvasWidth, canvasHeight] = [canvas.width, canvas.height]
const context = canvas.getContext("2d")
const directions = {
  horizontal: "horizontal",
  vertical: "vertical"
}
const MAJOR_LINES = 6
const MINOR_LINES = 5
let lines = []

const makeVerticalLine = () => {
  const randomLine = pickRandomLine()
  const xLine = randomLine * (canvasWidth / MAJOR_LINES)
  makeLine(xLine, 0, xLine, canvasHeight)
}

const makeHorizontalLine = () => {
  const randomLine = pickRandomLine()
  const yLine = randomLine * (canvasHeight / MAJOR_LINES)
  makeLine(0, yLine, canvasWidth, yLine)
}

const makeLine = (x1, y1, x2, y2) => {
  lines.push([[x1, y1], [x2, y2]])
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.lineWidth=7
  context.stroke()
}

const chooseHorizontalOrVertical = () => {
  // two times more likely to pick vertical
  const { vertical, horizontal } = directions
  return randomNumber(4) < 2 ? vertical : horizontal
}

const pickRandomLine = () => {
  return randomNumber(MAJOR_LINES - 1, 1)
}

const randomNumber = (max, min=0) => {
  // inclusive
  return Math.floor(Math.random() * (max)) + min
}

const drawMajorLines = () => {
  for (let i = 0; i < MAJOR_LINES; i += 1) {
    const horizontalOrVertical = chooseHorizontalOrVertical()
    if (horizontalOrVertical === directions.vertical) {
      makeVerticalLine()
    } else {
      makeHorizontalLine()
    }
  }
}

const drawMinorLines = () => {
  for (let i = 0; i < MINOR_LINES; i += 1) {
    drawMinorLine()
  }
}

const randomExistingLine = () => {
  return lines[randomNumber(lines.length - 1)]
}

const drawMinorLine = () => {
  const randomLine = randomExistingLine()
  const isHorizontal = isHorizontalLine(line)
  const randomPointOnLine = pickRandomPointOnLine(line)
}

// const pickRandomPointOnLine = (line) => {
//   const [[x1, y1], [x2, y2]] = line
//   x1 - x2
// }

const isHorizontalLine = (line) => {
  const [[x1, y1], [x2, y2]] = line
  return y1 === y2
}

const colorSquares = () => {
  const xPairs = getPairs(getXValues())
  const yPairs = getPairs(getYValues())
  console.log(getXValues(), getYValues())
  xPairs.forEach((xPair) => {
    yPairs.forEach((yPair) => {
      const [x1, x2] = xPair
      const [y1, y2] = yPair
      drawSquare(x1, y1, x2-x1, y2-y1)
    })
  })
}

const drawSquare = (x, y, width, height) => {
  context.beginPath()
  context.lineWidth=7
  context.rect(x, y, width, height)
  context.fillStyle = randomColor()
  context.fill()
  context.stroke()
}

const randomColor = () => {
  const colors = ["#fac901", "#ffffff", "#225095", "#dd0100"]
  return colors[randomNumber(4)]
}


const getPairs = (arr) => {
  let pairs = []
  for (let i = 0; i < arr.length - 1; i += 1) {
    pairs.push([arr[i], arr[i + 1]])
  }
  return pairs
}

const getXValues = () => {
  let values = [0, canvasWidth]
  lines.forEach((line) => {
    const [[x1, _], [x2, __]] = line
    values.push(x1)
    values.push(x2)
  })
  return uniqueSorted(values)
}

const getYValues = () => {
  let values = [0, canvasHeight]
  lines.forEach((line) => {
    const [[_, y1], [__, y2]] = line
    values.push(y1)
    values.push(y2)
  })
  return uniqueSorted(values)
}

const uniqueSorted = (arr) => {
  return [...new Set(arr)].sort()
}

const run = () => {
  drawMajorLines()
  // drawMinorLines()
  colorSquares()
}

run()
