import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";

export async function DialogueScene(app) {
    const dialogue = await Assets.load("assets/king-dialogue.png");
    dialogue.source.scaleMode = "nearest";

    // container for dialog and text
    const dialog = new Container();
    dialog.position.set(app.screen.width / 2, 430);

    const map = new Sprite(dialogue);
    map.anchor.set(0.5);
    map.scale.set(5);

    const speakerStyle = new TextStyle({
        fontFamily: "Pixelify Sans",
        fontSize: 22,
        fill: "#000000",
        fontWeight: "bold",
    });

    const convoStyle = new TextStyle({
        fontFamily: "Pixelify Sans",
        fontSize: 20,
        fill: "#111111",
        wordWrap: true,
        wordWrapWidth: 320,
    });

    const speaker = new Text({
        text: "King Alreum",
        style: speakerStyle,
    });

    const conversation = new Text({
        text: "",
        style: convoStyle
    })

    speaker.anchor.set(0, 0);
    speaker.position.set(-170, -75);

    conversation.anchor.set(0, 0);
    conversation.position.set(-170, 0);

    dialog.addChild(map);
    dialog.addChild(speaker);
    dialog.addChild(conversation);

    app.stage.addChild(dialog);

    const dialogueLines = [
        "Welcome to our kingdom.",
        "Darkness is spreading across the land.",
        "You must restore the balance."
    ];

    let currentLine = 0;
    conversation.text = dialogueLines[currentLine];

    dialog.eventMode = "static";
    dialog.cursor = "pointer";

    dialog.on("pointerdown", () => {
        if (currentLine < dialogueLines.length - 1) {
            currentLine++;
            conversation.text = dialogueLines[currentLine];
        } else {
            app.stage.removeChild(dialog);
        }
    });

    return dialog;
}