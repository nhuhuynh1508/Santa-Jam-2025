import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";

export async function MapOneScene(app) {
    const mapOneAsset = await Assets.load("assets/maps/map1-forest.png");
    mapOneAsset.source.scaleMode = "nearest";

    const mapOneSprite = new Sprite(mapOneAsset);
    mapOneSprite.anchor.set(0.5);
    mapOneSprite.scale.set(4.2);

    const mapOneContainer = new Container();
    mapOneContainer.position.set(
        app.screen.width / 2,
        app.screen.height / 2);
    mapOneContainer.eventMode = "static";
    mapOneContainer.cursor = "pointer";

    mapOneContainer.addChild(mapOneSprite);

    app.stage.addChild(mapOneContainer);

    // mapOneContainer.on("pointerdown", () => {
    //     if (currentLine < mapOneAssetLines.length - 1) {
    //         currentLine++;
    //         conversation.text = mapOneAssetLines[currentLine];
    //     } else {
    //         app.stage.removeChild(mapOneContainer);
    //     }
    // });

    return mapOneContainer;
}