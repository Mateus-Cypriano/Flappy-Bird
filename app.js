document.addEventListener('DOMContentLoaded' , () => {
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  let score = document.querySelector('.score')

  let birdLeft = 200
  let birdBottom = 250
  let gravity = 2
  let isGameOver = false;
  let gap = 400;
  

  function startGame() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'

  }
  let gameTimerId = setInterval(startGame, 15);
  let scoreTimerId = setInterval(addScore, 2900);

  // matando função control para pular com qualquer tecla - assim utilizar via mobile também. 
  function control(event) {
    if (event.keyCode === 32) {
        jump();
    }
  }

  function jump() {
    if (birdBottom < 500) birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
    // console.log(birdBottom)
  }
  document.addEventListener('keyup', jump)

  function generateObstacle() {
    let obstacleLeft = 550
    let randomHeight = Math.random() * 60
    let obstacleBottom = randomHeight
   const obstacle = document.createElement('div')
   const topObstacle = document.createElement('div')
  if(!isGameOver) {
    obstacle.classList.add('obstacle')
    topObstacle.classList.add('topObstacle')
  } 
    
   gameDisplay.appendChild(obstacle)
   gameDisplay.appendChild(topObstacle)
   obstacle.style.left = obstacleLeft + 'px'
   topObstacle.style.left = obstacleLeft + 'px'
   obstacle.style.bottom = obstacleBottom + 'px'
   topObstacle.style.bottom = obstacleBottom + gap + 'px'

   function moveObstacle() {
    obstacleLeft -= 2
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'


    if (obstacleLeft === -60) {
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
    }
    if (
        obstacleLeft > 160 && obstacleLeft < 250 && birdLeft === 200 &&
        (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 150) ||
        birdBottom === 0
     ) {
        gameOver()
        clearInterval(timerId)
    }
    console.log(birdLeft)

   }
   let timerId = setInterval(moveObstacle, 12)
   if(!isGameOver) setTimeout(generateObstacle, 3000)


  }
  generateObstacle()

  function addScore() {
    score.textContent = parseInt(score.textContent) +5;
  }

  function gameOver() {
    clearInterval(gameTimerId)
    clearInterval(scoreTimerId)
    isGameOver = true;
    document.removeEventListener('keyup', control)
  }

//   clearInterval(timerId);

})
