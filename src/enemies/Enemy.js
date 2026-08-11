import { Sprite } from "pixi.js";


export class Enemy extends Sprite {
    constructor(texture, path) {
        super(texture);

        this.path = path;
        
        this.pathIndex = 1;

        this.speed = 0.5;
        this.hp = 100;

        this.anchor.set(0.5);

        // Spawn at the first coordinate
        this.x = path[0].x;
        this.y = path[0].y;

        console.log("Enemy created at:", this.position);
    }

    update(deltaTime) {
        // Prevent errors by stopping if the enemy has reached the last coordinate
        if (this.pathIndex >= this.path.length) {
            return;
        }

        const target = this.path[this.pathIndex];

        // Calculate the distance between current position and the target
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate how far the enemy should move this specific frame
        const moveDistance = this.speed * deltaTime;
        
        if (distance <= moveDistance) {
            // Snap to the target and queue up the next waypoint
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
        } else {
            // Calculate the direction vector and move the enemy
            const vx = (dx / distance) * moveDistance;
            const vy = (dy / distance) * moveDistance;
            
            this.x += vx;
            this.y += vy;
        }
    }
}