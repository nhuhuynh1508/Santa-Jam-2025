import { Assets, Container, Sprite, Graphics } from "pixi.js";

export const SideUIManager = {
    uiLayer: null,
    sideUISprite: null,
    towerIcons: new Container(),

    init(uiLayer) {
        this.uiLayer = uiLayer;
    },

    async show(app, mapContainer) {
        // Only load and create if it doesn't exist yet
        if (!this.sideUISprite) {
            const texture = await Assets.load("assets/sideUI.png");
            texture.source.scaleMode = "nearest";
            this.sideUISprite = new Sprite(texture);
            this.sideUISprite.scale.set(4.3);
            this.sideUISprite.x = 585;
        }

        this.uiLayer.addChild(this.sideUISprite);
        this.uiLayer.addChild(this.towerIcons);
        
        // Create tower icons
        const towerTypes = [
            { id: 'arcane', asset: "assets/towers/arcane.png", x: 590, y: 350 },
            { id: 'archer', asset: "assets/towers/archer.png", x: 650, y: 350 },
            { id: 'beacon', asset: "assets/towers/beacon.png", x: 710, y: 350 }
        ];

        for (const tower of towerTypes) {
            // // Background square
            // const bg = new Graphics();

            // bg.rect(0, 0, 60, 70);
            // bg.fill('grey');
            // bg.stroke({
            //     width: 4,
            //     color: 'black'
            // });

            // bg.position.set(tower.x + 12, tower.y + 20);

            // this.towerIcons.addChild(bg);   

            await this.createDraggableIcon(
                tower,
                app,
                mapContainer
            );
        }
    },

    async createDraggableIcon(tower, app, mapContainer) {
        const texture = await Assets.load(tower.asset);
        const icon = new Sprite(texture);
        
        icon.anchor.set(0.5);
        icon.position.set(tower.x + 42, tower.y + 55);

        icon.width = 70;
        icon.height = 70;
        icon.eventMode = 'static';
        icon.cursor = 'pointer';

        let dragSprite = null;

        icon.on('pointerdown', (e) => {
            // Create a temporary "ghost" sprite for dragging
            dragSprite = new Sprite(texture);
            dragSprite.anchor.set(0.5, 1);
            dragSprite.alpha = 0.7;
            dragSprite.scale.set(0.7 * 4.2); // Matching map scale
            
            this.uiLayer.addChild(dragSprite);
            
            const moveGhost = (event) => {
                dragSprite.position.copyFrom(event.global);
            };

            const dropGhost = (event) => {
                app.stage.off('pointermove', moveGhost);
                
                // Try to place the tower using the map's logic
                const success = mapContainer.tryPlaceTower(event.global, texture);
                
                this.uiLayer.removeChild(dragSprite);
                dragSprite.destroy();
                dragSprite = null;
            };

            app.stage.on('pointermove', moveGhost);
            app.stage.once('pointerup', dropGhost);
            app.stage.once('pointerupoutside', dropGhost);
        });

        this.towerIcons.addChild(icon);
    },

    hide() {
        if (this.sideUISprite && this.sideUISprite.parent) {
            this.uiLayer.removeChild(this.sideUISprite);
        }
    }
};