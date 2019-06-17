import {Component, ViewChild, ElementRef} from '@angular/core';
import * as THREE from 'three';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('rendererContainer') rendererContainer: ElementRef;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    scene = null;
    camera = null;
    mesh = null;

    constructor() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;

        let geometry = new THREE.BoxGeometry(20, 200, 200);
        const material = new THREE.MeshDistanceMaterial({color: 0xff0000, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(this.mesh);
    }

    ngAfterViewInit() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }

    animate() {
        window.requestAnimationFrame(() => this.animate());
        this.mesh.rotation.x += 0.1;
        this.mesh.rotation.y += 0.002;
        this.renderer.render(this.scene, this.camera);
    }
}
