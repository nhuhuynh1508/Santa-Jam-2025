import { Assets, Sprite } from "pixi.js";

export async function MapOption(app) {
    // const texture = await Assets.load("./assets/maps/map1-forest.png");
    // const texture = await Assets.load("./assets/maps/progress-map.png");
    const texture = await Assets.load("assets/maps/map1-forest.png");

    texture.source.scaleMode = "nearest"

    const map = new Sprite(texture);

    // Center the sprite's anchor point
    map.anchor.set(0.5);
    map.scale.set(5)

    // Move the map to the center of the screen
    map.position.set(app.screen.width / 2, app.screen.height / 2);

    app.stage.addChild(map);
    

    return map;
}