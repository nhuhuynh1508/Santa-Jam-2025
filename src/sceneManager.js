
export class SceneManager {
    static app = null;
    static currentScene = null;

    static init(app) {
        this.app = app;
    }

    static async changeScene(sceneFactory) {
        // Remove old scene
        if (this.currentScene) {
            this.currentScene.destroy({ children: true });
            this.app.stage.removeChild(this.currentScene);
        }

        // Create new scene
        const scene = await sceneFactory();
        this.currentScene = scene;

        // Add to stage
        this.app.stage.addChild(scene);
    }
}
