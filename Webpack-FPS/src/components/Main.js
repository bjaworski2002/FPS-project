import { Scene, AmbientLight, Clock, LoadingManager } from 'three';
import Model from "./Model"
import Renderer from './Renderer';
import Camera from './Camera';
import Map from "./Map"
import model from "./assets/tris.md2"
import Config from './Config';
import Keyboard from "./Keyboard"
import Animation from "./Animation"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default class Main {
    constructor(container) {
        // właściwości klasy
        this.container = container;
        this.scene = new Scene();

        this.light = new AmbientLight(0x430e0e, 0.5);
        this.scene.add(this.light);
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.controls = new OrbitControls(this.camera.threeCamera, this.renderer.threeRenderer.domElement);
        this.map = new Map(this.scene);
        this.clock = new Clock()

        this.manager = new LoadingManager();

        this.model = new Model(this.scene, this.manager);
        this.model.load(model);



        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };
        this.manager.onLoad = () => {
            this.isLoaded = true;
            console.log("MODEL LOADED!!!")
            this.animation = new Animation(this.model.mesh)
            this.animation.playAnim("crwalk")
            this.keyboard = new Keyboard(window, this.animation, this.model.mesh);
            this.model.mesh.position.set(400, 0, 400)
            console.log(this.model.mesh.position)

        };

        this.stats = new Stats();
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom);

        this.render();
    }

    render() {

        console.log("render leci")
        this.stats.begin()
        let delta = this.clock.getDelta();
        if (this.animation) this.animation.update(delta)

        this.renderer.render(this.scene, this.camera.threeCamera);

        if (this.model.mesh) {
            //
            if (Config.rotateLeft) {
                this.model.mesh.rotation.y += 0.05
            }
            if (Config.rotateRight) {
                this.model.mesh.rotation.y -= 0.05
            }
            if (Config.moveForward) {
                this.model.mesh.translateX(3)
            }
        }

        requestAnimationFrame(this.render.bind(this));
    }
}