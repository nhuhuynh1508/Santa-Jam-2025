
export class SceneManager {
    static container;
    static currentScene = null;

    static init(container) {
        this.container = container;
    }

    static async changeScene(sceneFactory) {
        // Remove old scene
        if (this.currentScene) {
            this.currentScene.destroy({ children: true });
            this.container.removeChild(this.currentScene);
        }

        // Create new scene
        const scene = await sceneFactory();
        this.currentScene = scene;

        // Add to container
        this.container.addChild(scene);
    }
}
