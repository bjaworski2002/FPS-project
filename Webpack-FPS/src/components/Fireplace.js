import { Object3D, SpriteMaterial, TextureLoader, AdditiveBlending, PointLight } from "three"
import fireTex from "./assets/fire.png"
import Particle from "./Particle"

export default class Fireplace extends Object3D {

    constructor() {
        super()
        //tablica na cząsteczki
        this.particles = []
        // przewidywana ilość cząsteczek
        this.count = 100
        // materiał cząsteczki, rzecz najważniejsza
        // jego właściwość blending decyduje o tym, że cząsteczki mieszają się
        // ze sobą

        this.particleMaterial = new SpriteMaterial({
            color: 0xff5513,
            map: new TextureLoader().load(fireTex),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: AdditiveBlending
        });
        // dodajemy światło, aby ognisko emitowało oświetlenie na scenie
        this.point = new PointLight(0xff5513, 20, 20)


        this.init()
        setInterval(()=>{
            this.update()
        }, 30)
    }

    init() {

        // w pętli tworzymy odpowiednią ilość cząsteczek klasy Particle
        // dodajemy do this (kontener3D) i tablicy
        for (let i = 0; i < this.count; i++) {
            this.particle = new Particle(this.particleMaterial)
            this.add(this.particle)
            this.particles.push(this.particle);
        }



    }



    update() {
        // tutaj w pętli wykonujemy funkcję upfate każdej cząsteczki,
        // którą mamy w tablicy
        // particle.update()
        for (let i = 0; i < this.count; i++) {
            this.particles[i].update();
        }
    }
}
