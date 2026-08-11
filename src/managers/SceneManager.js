

export class SceneManager {
    static container = null;
    static currentScene = null;

    static scenes = new Map();

    static init(container) {
        this.container = container;
    }

    static registerScene(id, factory) {
        this.scenes.set(id, factory);
    }

    static async changeScene(id) {
        const factory = this.scenes.get(id);

        if (!factory) {
            throw new Error(`Scene ${id} not registered`);
        }

        if (this.currentScene) {
            if (this.container) {
                this.container.removeChild(this.currentScene);
            }
            this.currentScene.destroy({ children: true });
        }

        const scene = await factory();

        this.currentScene = scene;
        if (this.container) {
            this.container.addChild(scene);
        }
    }
}