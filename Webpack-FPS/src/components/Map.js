import { PlaneGeometry, MeshPhongMaterial, Mesh, TextureLoader, DoubleSide, LoadingManager } from "three";
import { Wall, Treasure, Light } from "./LevelItems.js";
import model from "./assets/tris.md2"
import Model2 from "./Model2"
import Animation from "./Animation"


export default class Map {
    constructor(scene) {
        this.scene = scene;
        this.loadData();
        this.items = [];

        const plane = new PlaneGeometry(1000, 1000);
        const plane2 = new PlaneGeometry(1000, 1000);
        const texture = new TextureLoader().load('https://images.template.net/wp-content/uploads/2016/12/26091238/Game-Design-Wood-Floor-Texture.jpg');
        const material = new MeshPhongMaterial({
            map: texture,
        })
        const material2 = new MeshPhongMaterial({
            map: texture,
            side: DoubleSide
        })
        this.floor = new Mesh(plane, material);
        this.floor.position.set(450, -50, 450);
        this.floor.rotateX(-Math.PI / 2);

        this.ceiling = new Mesh(plane2, material2);
        this.ceiling.position.set(450, 50, 450);
        this.ceiling.rotateX(-Math.PI / 2);

        this.scene.add(this.floor);
        this.scene.add(this.ceiling);

    }
    async loadData() {
        const res = await fetch("http://localhost:5000/load")
        const data = await res.json()
        console.log(data)
        this.upload(data);
    }
    async loadmodels(models, rep) {
        if (rep > models.length) return;
        else {
            //new Enemy(this.scene, models[rep - 1].x, models[rep - 1].z);
            this.isLoaded = null
            this.manager = new LoadingManager();

            this.model = new Model2(this.scene, this.manager);
            this.model.load(model, models[rep - 1].x, models[rep - 1].z)

            this.manager.onProgress = (item, loaded, total) => {
                console.log(`progress ${item}: ${loaded} ${total}`);
            };
            this.manager.onLoad = () => {
                this.isLoaded = true;
                console.log("ENEMY MODEL LOADED!!!")
                this.animation = new Animation(this.model.mesh)
                this.animation.playAnim("crwalk")
                rep++
                this.loadmodels(models, rep)
            };
        }

    }
    upload(data) {
        let models = []
        this.items = data.map(({ x, z, type }) => {
            //console.log(x, z, type);
            switch (type) {
                case "wall":
                    return new Wall(this.scene, x, z);
                    break;
                case "enemy":
                    models.push({ x: x, z: z })
                    break;
                case "treasure":
                    return new Treasure(this.scene, x, z);
                    break;
                case "light":
                    return new Light(this.scene, x, z);
                    break;
            }
        });
        console.log(models)
        this.loadmodels(models, 1)
    }
}