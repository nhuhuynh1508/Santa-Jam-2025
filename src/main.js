import { Application } from "pixi.js";

import { DialogueScreen } from "./progress/dialogueScreen";
import { StoryScreen } from "./progress/storyScreen";
import { SceneManager } from "./screenManager";

  (async () => {
    // Create a new application
    const app = new Application();
  (async () => {
    // Create a new application
    const app = new Application();

  // Initialize the application
  await app.init({ background: "#333333ff", height: 540, width: 540 });

    // Append the application canvas to the document body
    document.getElementById("pixi-container").appendChild(app.canvas);
    // Append the application canvas to the document body
    document.getElementById("pixi-container").appendChild(app.canvas);

  SceneManager.init(app);

  SceneManager.changeScene(() => StoryScreen(app, () => {
      // after story scene ends, load dialogue scene
      SceneManager.changeScene(() => DialogueScreen(app));
  }));
})();
