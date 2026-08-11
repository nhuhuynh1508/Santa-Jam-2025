import { Assets, Container } from "pixi.js";
import { Enemy } from "../enemies/Enemy";

export class EnemyManager {
    constructor() {
        this.container = new Container();
        this.enemies = [];
    }

    async spawnEnemy(path) {
        const texture = await Assets.load("assets/enemies/bunny.png");
        console.log("Enemy texture loaded:", texture);
        texture.source.scaleMode = "nearest";

        const enemy = new Enemy(texture, path);
        enemy.scale.set(0.3);

        this.enemies.push(enemy);
        this.container.addChild(enemy);
    }

    update(deltaTime) {
        for (const enemy of this.enemies) {
            enemy.update(deltaTime);
        }
    }
}