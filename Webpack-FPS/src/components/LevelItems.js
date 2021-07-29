import { Object3D, LoadingManager, BoxGeometry, MeshStandardMaterial, Mesh, TextureLoader, PointLight } from 'three';
import Lights from "./Lights";
import Animation from "./Animation"
import Map from "./Map"
import model from "./assets/tris.md2"
import Model2 from "./Model2"

export class LevelItem {
    constructor(scene, x, z, type) {
        this.cords = [x, z];
        this.type = type;
        this.scene = scene;
        //this.scene.add(this.mesh);

    }

    update() {

    }
}

export class Wall extends LevelItem {
    constructor(scene, x, z) {
        super(scene, x, z, "wall");
        const box = new BoxGeometry(100, 100, 100);
        const texture = new TextureLoader().load('https://lh3.googleusercontent.com/r5SAVefZiekVThlZzU5SkcGs7i4olpy09BqOLmtdgMkC0R6DjOKcViV0XCwIeOkoZMnCarx-eoIViM7ESlEl3A=s500');
        const material = new MeshStandardMaterial({
            //color: 0xffffff,
            map: texture,
            transparent: true,
            opacity: 1,
        })
        this.mesh = new Mesh(box, material);
        this.mesh.position.set(x * 100, 0, z * 100);
        this.scene.add(this.mesh);
        //this.mesh.material.color.setHex(0x00ff00);
        //this.controls = new CharacterController()
    }

}

export class Enemy extends LevelItem {
    constructor(scene, x, z) {
        super(scene, x, z, "enemy");
        const box = new BoxGeometry(50, 50, 50);
        const material = new MeshStandardMaterial({
            color: 0xffffff
        })
        this.mesh = new Mesh(box, material);
        this.mesh.position.set(x * 100, 0, z * 100);
        this.scene.add(this.mesh);
        this.mesh.material.color.setHex(0x00ffff);
    }
}

export class Treasure extends LevelItem {
    constructor(scene, x, z) {
        super(scene, x, z, "treasure");
        const box = new BoxGeometry(50, 50, 50);
        const material = new MeshStandardMaterial({
            color: 0xffffff
        })
        this.mesh = new Mesh(box, material);
        this.mesh.position.set(x * 100, 0, z * 100);
        this.scene.add(this.mesh);
        this.mesh.material.color.setHex(0x0000ff);
    }
}

export class Light extends LevelItem {
    constructor(scene, x, z) {
        super(scene, x, z, "light");
        new Lights(scene, x, z)
        /*this.light = new PointLight(0x430e0e, 1);
        this.light.position.set(x * 100, 100, z * 100);
        console.log(`x: ${x} z: ${z}`)
        this.scene.add(this.light);*/
    }
}
