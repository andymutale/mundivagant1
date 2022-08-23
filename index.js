
const canvas = document.querySelector(
    'canvas'
)
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5



//const background = new Sprite({
    //position: {
        //x: 0,
        //y: 0
    //},
    //imageSrc: './img/Flat Night 2 BG.png'

//})



const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },

    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        Y: 0
    }
})




const player2 = new Fighter({
    position: {
        x: 200,
        y: 200
    },

    velocity: {
        x: 0,
        y: 0
    }
    ,color: 'skyblue'

    ,offset: {
        x: 50,
        y: 0
    }
})



console.log(
    player1
)
console.log(
    player2
)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },


}

function rectangularCollision({rectangle1,rectangle2}) {
    return(
        
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x  && 
        
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&       
        
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}


function determineWinner({player1,player2,timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display ='flex'
    if (player1.health ===player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    }
    else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'player1 Wins!'
    }
    else if (player1.health < player2.health) {
        document.querySelector('#displayText').innerHTML = 'player2 Wins!'
    }
    
}

let timer = 60
let timerId
function decreeaseTimer() {
    
    if (timer > 0) {
        timerId =setTimeout(decreeaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({player1,player2,timerId})
    }
} animate()


window.addEventListener(
    'keydown', (event) =>  {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player1.lastKey = 'd'
            break
            case 'a':
                keys.a.pressed = true
                player1.lastKey = 'a'
            break
            case 'w':
                player1.velocity.y = -20
            break
            case ' ':
                player1.attack()
                
            break

            
        

            

            //player2
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                player2.lastKey = 'ArrowRight'
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                player2.lastKey = 'ArrowLeft'
            break
            case 'ArrowUp':
                player2.velocity.y = -20
            break
            case 'ArrowDown':
                player2.attack()
                
            break
        }
        console.log(event.key);

    }
)

window.addEventListener(
    'keyup', (event) =>  {
        switch (event.key) {
            case 'd':
                keys.d.pressed = false
            break
            case 'a':
                keys.a.pressed = false
            break
            case 'w':
                keys.w.pressed = false
            break




            //player2
            case 'ArrowRight':
                keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
            break
            case 'ArrowUp':
                keys.ArrowUp.pressed = false
            break
        }
        console.log(event.key);

    }
)