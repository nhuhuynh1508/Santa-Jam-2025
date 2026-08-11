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
        { x: -9, y: 12, isOccupied: false },
        { x: -31, y: -24, isOccupied: false },
        { x: 26, y: 35, isOccupied: false },
        { x: 37, y: -53, isOccupied: false },
        { x: 56, y: 18, isOccupied: false },
        { x: -45, y: 0, isOccupied: false }
    ];

    // Enemy path (adjust these points to match your road)
    const path = [
    { x: -59, y: -23 },
    { x: 20, y: 0 },
    { x: 40, y: 20 }
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
            tower.y = slot.y + 10;

            mapOneContainer.addChild(tower);

            slot.isOccupied = true;

            return true;
        }

        return false;
    };

    return mapOneContainer;
}