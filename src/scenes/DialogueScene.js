import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";

import { SceneManager } from "../managers/SceneManager.ts";
import { SceneID } from "../SceneID";

export async function DialogueScene(app){
    const scene = new Container();

    const kingDialogueTexture = await Assets.load(
        "assets/king-dialogue.png"
    );

    kingDialogueTexture.source.scaleMode = "nearest";

    const dialog = new Container();

    dialog.position.set(
        app.screen.width / 2,
        450
    );

    const background = new Sprite(
        kingDialogueTexture
    );

    background.anchor.set(0.5);
    background.scale.set(5);

    const nameStyle = new TextStyle({
        fontFamily: "Pixelify Sans",
        fontSize: 24,
        fill: "#ffd700",
        fontWeight: "bold",
        dropShadow: {
            color: "#000000",
            distance: 2,
            blur: 2,
        },
    });

    const bodyStyle = new TextStyle({
        fontFamily: "Pixelify Sans",
        fontSize: 20,
        fill: "#000000",
        wordWrap: true,
        wordWrapWidth: 400,
    });

    const nameTag = new Text({
        text: "King Alreum",
        style: nameStyle,
    });

    nameTag.position.set(-173, -78);

    const dialogueLines = [
        "Welcome to our kingdom.",
        "Darkness is spreading across the land.",
        "You must restore the balance.",
    ];

    let currentLine = 0;
    let isChangingScene = false;

    const bodyText = new Text({
        text: dialogueLines[currentLine],
        style: bodyStyle,
    });

    bodyText.position.set(-180, 10);

    dialog.addChild(
        background,
        nameTag,
        bodyText
    );

    scene.addChild(dialog);

    dialog.eventMode = "static";
    dialog.cursor = "pointer";

    dialog.on("pointerdown", async () => {
        if (isChangingScene) {
            return;
        }

        if (currentLine < dialogueLines.length - 1) {
            currentLine++;
            bodyText.text = dialogueLines[currentLine];
            return;
        }

        isChangingScene = true;
        dialog.eventMode = "none";

        await SceneManager.loadScene(
            SceneID.MAP_ONE
        );
    });

    return scene;
}