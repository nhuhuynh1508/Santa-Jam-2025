import { Application } from "pixi.js";
import { DialogueScene } from "./progress/dialogueScene";
import { StoryScene } from "./progress/storyScene";
import { SceneManager } from "./sceneManager";

const app = new Application();

async function main() {
  await app.init({ background: "#333333ff", height: 540, width: 540 });
  
  document.getElementById("pixi-container").appendChild(app.canvas);
  document.getElementById("pixi-container").appendChild(app.canvas);
  
  SceneManager.init(app);
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
  SceneManager.changeScene();
}

main();
