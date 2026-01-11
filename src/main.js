import { Application } from "pixi.js";
import { DialogueScene } from "./progress/dialogueScene";
import { StoryScene } from "./progress/storyScene";
import { MapOneScene } from "./progress/mapOneScene";
import { SceneManager } from "./sceneManager";

const app = new Application();

async function main() {
  await app.init({ background: "#333333ff", height: 540, width: 540 });
  await document.fonts.load('22px "Pixelify Sans"');
  await document.fonts.ready;

  document.getElementById("pixi-container").appendChild(app.canvas);
  document.getElementById("pixi-container").appendChild(app.canvas);
  
  SceneManager.init(app);

  // displayMapOne();
  displayStoryScene();
}

function displayStoryScene() {
  SceneManager.changeScene(
    () => StoryScene(app, displayDialogueScene)
  );
}

function displayDialogueScene() {
  SceneManager.changeScene(
    () => DialogueScene(app)
  );
}

function displayMapOne() {
  SceneManager.changeScene(
    () => MapOneScene(app)
  );
}

main();
