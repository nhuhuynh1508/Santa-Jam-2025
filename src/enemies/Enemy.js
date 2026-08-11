import { Sprite } from "pixi.js";

export class Enemy extends Sprite {
    constructor(texture, path) {
        super(texture);

        this.path = path;
        this.pathIndex = 0;

        this.speed = 0.1;
        this.hp = 100;

        this.anchor.set(0.5);
                
        this.x = path[0].x;
        this.y = path[0].y;

        console.log("Enemy created at:", this.position);
    }

    update(deltaTime) {
        this.x += this.speed * deltaTime;
    }
}