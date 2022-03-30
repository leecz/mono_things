import * as THREE from "three"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"


class Base3d {
  constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLElement
    // this.camera;
    // this.scene;
    // this.renderer;
    this.init()
    this.animate()
  }
  init() {
    this.initScene();
    this.initCamera();
    this.initRenderer()
  }
  initScene() {
    this.scene = new THREE.Scene()
    this.setEnvMap()

  }
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 0.5, 200
    )
    this.camera.position.set(-1.8, 0.6, 2.7)
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)
  }
  setEnvMap() {
    new RGBELoader().setPath('/hdr/').load('001.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularRefractionMapping
      this.scene.background = texture
      this.scene.environment = texture
    })
  }
  render() {
    this.renderer.render(this.scene, this.camera)
  }
  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }


}
export default Base3d