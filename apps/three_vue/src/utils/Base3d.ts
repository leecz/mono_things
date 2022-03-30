import * as THREE from "three"
import { Camera, Object3D } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
// 控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// 模型
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

class Base3d {
  // 初始属性没赋值，需要加!
  container!: HTMLElement;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;

  controls!: OrbitControls;
  model!: Object3D;

  constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLElement
    this.init()
    this.animate()
  }
  init() {
    this.initScene();
    this.initCamera();

    this.initRenderer()

    //使用控制器
    this.initControls()

    // 添加物体
    this.addMesh()

    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.render()

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
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // 设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // 设置映射, 电影级别
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1
    this.container.appendChild(this.renderer.domElement)
  }
  setEnvMap() {
    new RGBELoader().setPath('/hdr/').load('001.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularRefractionMapping
      this.scene!.background = texture
      this.scene!.environment = texture
    })
  }
  render() {
    this.renderer.render(this.scene as Object3D, this.camera as Camera)
  }
  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }
  addMesh() {
    this.setModel('/models/girl/', 'girl.gltf')
    // this.setModel('/models/cathedral/', 'scene.gltf')
  }
  setModel(path: string, modelName: string) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader().setPath(path)
      loader.load(modelName, (gltf) => {
        this.model = gltf.scene
        this.scene.add(gltf.scene)
        resolve('ok')
      })
    })
  }


}
export default Base3d