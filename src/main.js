import { Application, Container } from "pixi.js";
import { SceneManager } from "./managers/SceneManager";
import { SideUIManager } from "./managers/SideUIManager";
import { MapOneScene } from "./maps/Map1";
import { SceneID } from "./SceneID";
import { DialogueScene } from "./scenes/dialogueScene";
import { StoryScene } from "./scenes/storyScene";

const app = new Application();

async function main() {
  await app.init({ background: "#333333ff", height: 540, width: 800 });
  await document.fonts.load('22px "Pixelify Sans"');
  await document.fonts.ready;

  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  document.getElementById("pixi-container").appendChild(app.canvas);
  
  const gameLayer = new Container();
  const uiLayer = new Container(); 

  app.stage.addChild(gameLayer);
  app.stage.addChild(uiLayer);

  SideUIManager.init(uiLayer);
  SceneManager.init(gameLayer);

  SceneManager.registerScene(SceneID.STORY_SCENE, () => StoryScene(app));
  SceneManager.registerScene(SceneID.DIALOGUE_SCENE, () => DialogueScene(app));
  SceneManager.registerScene(SceneID.MAP_ONE, () => MapOneScene(app));

  console.log("Scenes registered, starting game...");

  await SceneManager.changeScene(SceneID.MAP_ONE);
}

main();
