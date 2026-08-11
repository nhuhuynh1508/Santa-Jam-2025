import { Assets, Container, Sprite } from "pixi.js";
import { EnemyManager } from "../managers/EnemyManager";
import { SideUIManager } from "../managers/SideUIManager";

export async function MapOneScene(app) {
    // load the map asset and create a sprite
    const mapOneAsset = await Assets.load("assets/maps/map1-forest.png");

    // load the towers asset and create a sprite
    const arcaneTower = await Assets.load("assets/towers/arcane.png");
    const archerTower = await Assets.load("assets/towers/archer.png");
    const beaconTower = await Assets.load("assets/towers/beacon.png");

    [mapOneAsset, arcaneTower, archerTower, beaconTower].forEach(asset => {
        asset.source.scaleMode = "nearest";
    });

    const enemyManager = new EnemyManager();

    const mapOneSprite = new Sprite(mapOneAsset);
    mapOneSprite.anchor.set(0.5);

    const mapOneContainer = new Container();
    mapOneContainer.position.set(270, app.screen.height / 2);
    mapOneContainer.eventMode = "static";
    mapOneContainer.cursor = "pointer";
    mapOneContainer.scale.set(4.2);

    SideUIManager.show(app, mapOneContainer);

    mapOneContainer.addChild(mapOneSprite);

    const slots = [
        { x: -9, y: 23, isOccupied: false },
        { x: -31, y: -14, isOccupied: false },
        { x: 26, y: 45, isOccupied: false },
        { x: 37, y: -43, isOccupied: false },
        { x: 56, y: 28, isOccupied: false },
        { x: -45, y: 9, isOccupied: false }
    ];

    // Enemy path (adjust these points to match your road)
    const path = [
        { x: -60, y: -22 },
        { x: -50, y: -30 },
        { x: -45, y: -35 },
        { x: 21, y: -35 },
        { x: 21, y: -14 },
        { x: 12, y: -10 },
        { x: 12, y: 32 },
        { x: -25, y: 32 },
        { x: -25, y: 3 },
        { x: -4, y: -3},
        { x: 25, y: 3},
        { x: 30, y: 6 },
        { x: 36, y: 8},
        { x: 40, y: 36},
        { x: 44, y: 46},
        { x: 60, y: 45}
    ];

    // Expose path so EnemyManager can use it
    mapOneContainer.path = path;
    mapOneContainer.addChild(enemyManager.container);

    await enemyManager.spawnEnemy(path);

    app.ticker.add((ticker) => {
        enemyManager.update(ticker.deltaTime);
    });

    mapOneContainer.update = (deltaTime) => {
        console.log(mapOneContainer.x, mapOneContainer.y);
    };

    mapOneContainer.on('pointerdown', (event) => {
        const localPos = mapOneContainer.toLocal(event.global);

        console.log(
            `Clicked at: x: ${Math.round(localPos.x)}, y: ${Math.round(localPos.y)}`
        );
    });

    mapOneContainer.tryPlaceTower = (globalPos, texture) => {
        const localPos = mapOneContainer.toLocal(globalPos);

        const slot = slots.find(s => {
            const dist = Math.sqrt(
                Math.pow(localPos.x - s.x, 2) +
                Math.pow(localPos.y - s.y, 2)
            );

            return dist < 15 && !s.isOccupied;
        });

        if (slot) {
            const tower = new Sprite(texture);

            tower.anchor.set(0.5, 1);
            tower.scale.set(0.7);
            tower.x = slot.x;
            tower.y = slot.y;

            mapOneContainer.addChild(tower);

            slot.isOccupied = true;

            return true;
        }

        return false;
    };

    return mapOneContainer;
}