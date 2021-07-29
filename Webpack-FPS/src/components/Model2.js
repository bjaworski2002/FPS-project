import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import { Mesh, TextureLoader, MeshPhongMaterial } from "three"
import billy from "./assets/billywork.jpg"


export default class Model {
    constructor(scene, manager) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
    }

    load(path, x, z) {
        console.log(`x=${x} z=${z}`)
        this.x = x
        this.z = z
        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(billy), // dowolny plik png, jpg
                    morphTargets: true, // animowanie materiału modelu
                }))

                this.mesh.position.set(this.x * 100, 0, this.z * 100);
                this.mesh.scale.set(2, 2, 2)
                console.log(this.mesh.position)
                this.scene.add(this.mesh);
                console.log(`Animacje: ${this.geometry.animations}`) // tu powinny być widoczne animacje

            },

        );

    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}