

const canvas = document.querySelector(
    'canvas'
)
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

c.fillRect(
    0, 0, canvas.width, canvas.height
)

const gravity = 0.5


const background = new Sprite(
    {position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/example2.png'

})

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



decreeaseTimer()

function animate() { 
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(
        0, 0, canvas.width, canvas.height
    )
    background.update()
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0 


    //Player1 movement
    if (keys.a.pressed && player1.lastKey === 'a')  {
        player1.velocity.x = -5
        
    }else if(keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5
        
    }


    //Player2 movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft')  {
        player2.velocity.x = -5
        
    }else if(keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5
        
    }


    //collision detection

    if (
          rectangularCollision({rectangle1:player1,
           rectangle2:player2}) && player1.isAttacking
        ) {
            player1.isAttacking = false 
            console.log('bang')
            player2.health -=2
            document.querySelector('#player2health').style.width = player2.health + '%'
        }

    if (
        rectangularCollision({rectangle1:player2,
         rectangle2:player1}) && player2.isAttacking
      ) {
          player2.isAttacking = false 
          player1.health -=2
          document.querySelector('#player1health').style.width = player1.health + '%'
        }

        if(player1.health<=0 || player2.health<=0){
            determineWinner({player1,player2,timerId})
        }
    

    
}


animate()


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