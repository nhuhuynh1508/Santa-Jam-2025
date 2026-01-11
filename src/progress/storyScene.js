import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";

export async function StoryScene(app, onComplete) {
    const normalDialogue = await Assets.load("assets/dialogue.png");
    normalDialogue.source.scaleMode = "nearest";

    const dialog = new Container();
    dialog.position.set(app.screen.width / 2, 430);

    const map = new Sprite(normalDialogue);
    map.anchor.set(0.5);
    map.scale.set(5);

    const convoStyle = new TextStyle({
        fontFamily: "Pixelify Sans",
        fontSize: 20,
        fill: "#111111",
        wordWrap: true,
        wordWrapWidth: 420,
    });

    const story = new Text({
        text: "",
        style: convoStyle
    })

    story.anchor.set(0, 0);
    story.position.set(-190, -30);

    dialog.addChild(map);
    dialog.addChild(story);

    app.stage.addChild(dialog);
    const storyLines = [
        "You are the King of Alreum, a ruler of a distant but once peaceful kingdom.",
        "Magic runs through all corners of your kingdom, powering its glowing crystals, towers and enchanted forests.",
        "Under your dynasty, Alreum flourished more than ever."
    ];

    let currentLine = 0;
    story.text = storyLines[currentLine];

    dialog.eventMode = "static";
    dialog.cursor = "pointer";

    dialog.on("pointerdown", () => {
        if (currentLine < storyLines.length - 1) {
            currentLine++;
            story.text = storyLines[currentLine];
        } else {
            app.stage.removeChild(dialog);

            if (onComplete) onComplete();
        }
    });

    return dialog;
}