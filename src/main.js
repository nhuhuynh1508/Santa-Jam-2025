import { Application, Assets, Container, Sprite } from "pixi.js";
import { DialogueScene } from "./progress/dialogueScene";
import { MapOneScene } from "./progress/mapOneScene";
import { StoryScene } from "./progress/storyScene";
import { SceneManager } from "./sceneManager";

const app = new Application();

async function main() {
  await app.init({ background: "#333333ff", height: 540, width: 800 });
  await document.fonts.load('22px "Pixelify Sans"');
  await document.fonts.ready;

  document.getElementById("pixi-container").appendChild(app.canvas);
  
  const gameLayer = new Container();
  const uiLayer = new Container(); 

  app.stage.addChild(gameLayer);
  app.stage.addChild(uiLayer);

  const sideUI = await Assets.load("assets/sideUI.png");
  sideUI.source.scaleMode = "nearest";

  const sideUISprite = new Sprite(sideUI);
  sideUISprite.scale.set(4.3);
  sideUISprite.x = 585;
  uiLayer.addChild(sideUISprite);

  

  // const arcaneTower = await Assets.load("assets/towers/arcane.png");
  // const archerTower = await Assets.load("assets/towers/archer.png");
  // const beaconTower = await Assets.load("assets/towers/beacon.png");

  // [mapOneAsset, arcaneTower, archerTower, beaconTower].forEach(asset => {
  //       asset.source.scaleMode = "nearest";
  // });

  
  SceneManager.init(gameLayer);

  displayStoryScene();
}

function displayStoryScene() {
  SceneManager.changeScene(
    () => StoryScene(app, displayDialogueScene)
  );
}

function displayDialogueScene() {
  SceneManager.changeScene(
    () => DialogueScene(app, displayMapOne)
  );
}

function displayMapOne() {
  SceneManager.changeScene(
    () => MapOneScene(app)
  );
}

main();
