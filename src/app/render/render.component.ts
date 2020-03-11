import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {Engine, FreeCamera, HemisphericLight, Mesh, Scene, Vector3} from '@babylonjs/core';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.scss']
})
export class RenderComponent implements OnInit {

  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;

  @Output() engine: Engine;
  @Output() scene: Scene;
  @Output() camera: FreeCamera;

  constructor() { }

  ngOnInit(): void {
    this.engine = new Engine(this.canvas.nativeElement, true);
    this.scene = new Scene(this.engine);

    // creating camera
    this.camera = this.createCamera(this.scene);

    // allow mouse deplacement
    this.camera.attachControl(this.canvas.nativeElement, true);

    // creating minimal scean
    this.createScene(this.scene, this.canvas.nativeElement);

    // running babylonJS
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createCamera(scene: Scene) {
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

    camera.setTarget(Vector3.Zero());

    return camera;
  }

  createScene(scene: Scene, canvas: HTMLCanvasElement) {
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const sphere = Mesh.CreateSphere('sphere', 16, 2, scene);
    sphere.position.y = 1;

    Mesh.CreateGround('ground', 6, 6, 2, scene);
  }

}
