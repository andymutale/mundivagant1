

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

class Sprite { 
    constructor({position, velocity, color= 'red'}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: this.position 
            ,width: 100
            ,height: 50
        }
        this.color = color
        this.isAttacking

    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height )


        //attackBox
        c.fillStyle = 'yellow'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height )
            
    }

    update() {
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            
        }else this.velocity.y += gravity
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
            
        }, 100);
    }
}


const player1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },

    velocity: {
        x: 0,
        y: 0
    }
})




const player2 = new Sprite({
    position: {
        x: 200,
        y: 200
    },

    velocity: {
        x: 0,
        y: 0
    }
    ,color: 'skyblue'
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


function animate() { 
    window.requestAnimationFrame(animate)
    c.fillStyle = 'darkcyan'
    c.fillRect(
        0, 0, canvas.width, canvas.height
    )
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
        player1.attackBox.position.x + player1.attackBox.width >= 
        player2.position.x && player1.attackBox.position.x <= 
        player2.position.x + player2.width &&
         player1.attackBox.position.y + player1.attackBox.height 
         >= player2.position.y && player1.attackBox.position.y 
         <= player2.position.y + player2.height &&
         player1.isAttacking
        ) {
        console.log('bang!')
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
            case 's':
                player1.attack
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