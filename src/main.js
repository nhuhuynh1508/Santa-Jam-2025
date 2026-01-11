import { Application } from "pixi.js";
import { DialogueScreen } from "./progress/dialogueScreen";
import { StoryScreen } from "./progress/storyScreen";
import { SceneManager } from "./screenManager";

async function main() {
  const app = new Application();
  await app.init({ background: "#333333ff", height: 540, width: 540 });
  
  document.getElementById("pixi-container").appendChild(app.canvas);
  document.getElementById("pixi-container").appendChild(app.canvas);
  
  SceneManager.init(app);
  
  SceneManager.changeScene(() => StoryScreen(app, () => {
    SceneManager.changeScene(() => DialogueScreen(app));
  }));
}

main();
