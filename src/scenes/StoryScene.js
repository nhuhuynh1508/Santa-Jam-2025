import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";

import { SceneManager } from "../managers/SceneManager";
import { SceneID } from "../SceneID";

export async function StoryScene(app) {
    const scene = new Container();

    const normalDialogue = await Assets.load(
        "assets/dialogue.png"
    );

    normalDialogue.source.scaleMode = "nearest";

    await document.fonts.load(
        '20px "Pixelify Sans"'
    );

    await document.fonts.ready;

    const dialog = new Container();

    dialog.position.set(
        app.screen.width / 2,
        430
    );

    const background = new Sprite(normalDialogue);

    background.anchor.set(0.5);
    background.scale.set(5);

    const storyStyle = new TextStyle({
        fontFamily: "Pixelify Sans",
        fontSize: 20,
        fill: "#111111",
        wordWrap: true,
        wordWrapWidth: 420,
    });

    const storyLines = [
        "You are the King of Alreum, a ruler of a distant but once peaceful kingdom.",
        "Magic runs through all corners of your kingdom, powering its glowing crystals, towers and enchanted forests.",
        "Under your dynasty, Alreum flourished more than ever.",
    ];

    let currentLine = 0;
    let isChangingScene = false;

    const storyText = new Text({
        text: storyLines[currentLine],
        style: storyStyle,
    });

    storyText.position.set(-190, -35);

    dialog.addChild(
        background,
        storyText
    );

    scene.addChild(dialog);

    dialog.eventMode = "static";
    dialog.cursor = "pointer";

    dialog.on("pointerdown", async () => {
        if (isChangingScene) {
            return;
        }

        if (currentLine < storyLines.length - 1) {
            currentLine++;
            storyText.text = storyLines[currentLine];
            return;
        }

        isChangingScene = true;
        dialog.eventMode = "none";

        await SceneManager.loadScene(
            SceneID.DIALOGUE_SCENE
        );
    });

    return scene;
}