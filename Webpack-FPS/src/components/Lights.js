import { LevelItem, Light} from "./LevelItems"
import {PointLight} from "three";
import Fireplace from "./Fireplace";

export default class Lights {
    constructor(scene, x, z) {
        this.scene = scene
        this.light = new PointLight(0x430e0e, 1);
        this.light.position.set(x * 100, 0, z * 100);
        console.log(`x: ${x} z: ${z}`)
        this.scene.add(this.light)

        this.fire = new Fireplace()
        this.fire.position.set(x * 100, 0, z * 100);
        this.scene.add(this.fire)
    }
}