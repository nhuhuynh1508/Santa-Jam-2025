import { Assets, Container, Sprite } from "pixi.js";
import { SideUIManager } from "../sideUIManager";

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

    const mapOneSprite = new Sprite(mapOneAsset);
    mapOneSprite.anchor.set(0.5);

    const mapOneContainer = new Container();
    mapOneContainer.position.set(270, app.screen.height / 2);
    mapOneContainer.eventMode = "static";
    mapOneContainer.cursor = "pointer";
    mapOneContainer.scale.set(4.2);

     // show the sideUI
    SideUIManager.show(app, mapOneContainer);

    mapOneContainer.addChild(mapOneSprite);
    const slots = [
        { x: -8, y: 13, isOccupied: false },
        { x: -30,  y: -25, isOccupied: false },
        { x: 26,  y: 35, isOccupied: false },
        { x: 38,  y: -54, isOccupied: false },
        { x: 55, y: 19, isOccupied: false },
        { x: -45, y: 0, isOccupied: false }
    ];

    mapOneContainer.on('pointerdown', (event) => {
        const localPos = mapOneContainer.toLocal(event.global);
        console.log(`Clicked at: x: ${Math.round(localPos.x)}, y: ${Math.round(localPos.y)}`);
    });

    mapOneContainer.tryPlaceTower = (globalPos, texture) => {
        const localPos = mapOneContainer.toLocal(globalPos);
        
        // Find closest unoccupied slot (radius of 15-20 pixels)
        const slot = slots.find(s => {
            const dist = Math.sqrt(Math.pow(localPos.x - s.x, 2) + Math.pow(localPos.y - s.y, 2));
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
            return true; // Success
        }
        return false; // Failed to place
    };

    app.stage.addChild(mapOneContainer);
    return mapOneContainer;
}

    // loop through the slots and create tower sprites at the specified positions
    // slots.forEach(slot => {
    //     const tower = new Sprite(slot.type);
    //     tower.anchor.set(0.5, 1); 
    //     tower.scale.set(0.7);    
    //     tower.x = slot.x;
    //     tower.y = slot.y + 10;
        
    //     mapOneContainer.addChild(tower);
    // });

    // app.stage.addChild(mapOneContainer);
    // return mapOneContainer;