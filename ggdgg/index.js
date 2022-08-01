

const canvas = document.querySelector(
    'canvas'
)
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

c.fillRect(
    0, 0, canvas.width, canvas.height
)

const gravity = 0.2

class Sprite { 
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey

    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height )
            
    }

    update() {
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            
        }else this.velocity.y += gravity
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

let lastKey

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
    if (keys.a.pressed && lastKey === 'a')  {
        player1.velocity.x = -1
        
    }else if(keys.d.pressed && lastKey === 'd') {
        player1.velocity.x = 1
        
    }


    //Player2 movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft')  {
        player2.velocity.x = -1
        
    }else if(keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 1
        
    }

    
}


animate()


window.addEventListener(
    'keydown', (event) =>  {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                lastKey = 'd'
            break
            case 'a':
                keys.a.pressed = true
                lastKey = 'a'
            break
            case 'w':
                player1.velocity.y = -10
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
                player2.velocity.y = -10
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