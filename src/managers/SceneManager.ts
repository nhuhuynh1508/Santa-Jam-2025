import { Container } from "pixi.js";
import { SceneID } from "../SceneID";

type SceneFactory = () => Promise<Container> | Container;

export class SceneManager {  
    static container: Container;
    static currentScene: Container | null = null;

    static scenes = new Map<SceneID, SceneFactory>();

    static init(container: Container) {
        this.container = container;
    }

    static registerScene(id: SceneID, factory: SceneFactory) {
        this.scenes.set(id, factory);
    }

    static async changeScene(id: SceneID) {
        const factory = this.scenes.get(id);

        if (!factory) {
            throw new Error(`Scene ${id} not registered`);
        }

        if (this.currentScene) {
            this.container.removeChild(this.currentScene);
            this.currentScene.destroy({ children: true });
        }

        const scene = await factory();

        this.currentScene = scene;
        this.container.addChild(scene);
    }
}
