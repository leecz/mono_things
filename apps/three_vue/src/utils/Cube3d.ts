import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshPhongMaterial, Mesh, DirectionalLight } from "three"

class Base3d {
  // 初始属性没赋值，需要加!
  container!: HTMLElement;
  scene!: Scene;
  renderer!: WebGLRenderer;
  camera!: PerspectiveCamera;
  cube!: Mesh;

  angle = 0

  constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLElement
    this.init()
    this.animate()
  }
  init() {
    this.initScene();
    this.initCamera();
    this.initGeometry()
    this.initRenderer()
    // this.rotateCube()
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  initScene() {
    this.scene = new Scene()
  }
  initCamera() {
    this.camera = new PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    )
    this.camera.position.z = 2
    // this.camera.position.set(-1.8, 0.6, 2.7)
  }
  rotateCube() {
    let timeId = setTimeout(() => {
      this.angle += 1
      this.rotateCube()
    }, 100)
  }
  initGeometry() {
    // 创建几何体
    const geometry = new BoxGeometry(1, 1, 1)
    //  创建材质
    const material = new MeshPhongMaterial({ color: 0x44aa88 })
    // 创建网格
    const cube = new Mesh(geometry, material)
    this.cube = cube

    this.scene.add(cube)

    // 创建光源
    const light = new DirectionalLight(0xFFFFFF, 1)
    light.position.set(-1, 2, 4)

    this.scene.add(light)
  }

  initRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true })
    // 设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)
  }


  render(time: number) {
    console.log(time)
    time = time * 0.001
    // this.cube.rotation.x = this.angle
    // this.cube.rotation.y = this.angle
    this.cube.rotation.x = time
    this.cube.rotation.y = time
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
  animate() {
    window.requestAnimationFrame(this.render.bind(this))

    // this.renderer.setAnimationLoop(this.render.bind(this))
  }


}
export default Base3d