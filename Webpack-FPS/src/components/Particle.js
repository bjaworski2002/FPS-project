import { Sprite, Vector3 } from "three"

export default class Particle extends Sprite {
    constructor(material) {
        super()

        this.material = material.clone()
        // skala naszego sprite
        this.scale.set(
            Math.random() * 20,
            Math.random() * 20,
            Math.random() * 20
        );

    }

    update() {
        // wewnątrz tej funkcji przemieszczamy cząsteczkę do góry - y
        // a kiedy osiągnie określony punkt
        // cząsteczka wraca na y = 0
        // trzeba też zmieniać przezroczystość cząsteczki
        // tak aby u góry stała się całkiem przezroczysta
        // można tez losować jej x i z aby wywołać wrażenie drgania
        // całość wymaga trochę eksperymentów
        // aby wrażenie było poprawne
        // a moje pytajniki należy zastąpić własnymi pomysłami

        if (this.position.y > 0) {
            this.position.x = Math.random() * 20
            this.position.z = Math.random() * 20
            this.position.y = -50;
            this.material.opacity = 1;
        }


        this.material.opacity -= 0.03;
        this.position.y += Math.random() * 4

    }
}