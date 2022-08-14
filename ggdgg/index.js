

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
    constructor({position, velocity, color= 'red', offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            }, 
            offset,
            width: 100
            ,height: 50
        }
        this.color = color
        this.isAttacking

    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height )


        //attackBox
       // if (this.isAttacking) {
            c.fillStyle = 'yellow'
            c.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height      
            )      
       // }
        
            
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (
            this.position.y + this.height + this.velocity.y >= canvas.height) 
            {
            this.velocity.y = 0
            
        }else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false

        }, 25)
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
    },
    offset: {
        x: 0,
        Y: 0
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
          rectangularCollision({rectangle1:player1,
           rectangle2:player2}) && player1.isAttacking
        ) {
            player1.isAttacking = false 
            console.log('bang!')
    }

    if (
        rectangularCollision({rectangle1:player2,
         rectangle2:player1}) && player2.isAttacking
      ) {
          player2.isAttacking = false 
          console.log('pow!')
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