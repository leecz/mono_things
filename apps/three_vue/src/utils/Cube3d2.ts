import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshPhongMaterial, Mesh, DirectionalLight } from "three"

class Cube3d2 {
  // 初始属性没赋值，需要加!
  container!: HTMLElement;
  scene!: Scene;
  renderer!: WebGLRenderer;
  camera!: PerspectiveCamera;
  cubes!: Mesh[];
  resizeObserver!: ResizeObserver;

  angle = 0

  constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLElement

    this.init()
    this.animate()
  }
  init() {
    this.initScene();
    this.initCamera();
    this.addCube()
    this.initRenderer()
    // this.rotateCube()
    // window.addEventListener('resize', this._onWindowResize)
    // 这个是 dom 级别的监听resize，比window级别更细粒度更准确，相信性能也更好
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas()
    })
    this.resizeObserver.observe(this.container)
  }
  resizeCanvas() {
    const container = this.container
    this.camera.aspect = container.clientWidth / container.clientHeight
    this.camera.updateProjectionMatrix() //通知镜头更新视椎(视野)
    // 这行实际就是设置 canvas 的width 和 height，很重要，不然就是默认的 300、150
    this.renderer.setSize(container.clientWidth, container.clientHeight, false)
  }
  destroy() {
    // window.removeEventListener('resize', this._onWindowResize)
    console.log('remove obserer ')
    this.resizeObserver.disconnect()
  }

  initScene() {
    this.scene = new Scene()
  }
  initCamera() {
    this.camera = new PerspectiveCamera(
      75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000
    )
    // camera 的位置，数字越大离物体越远，范围在在上面的0.1 到200之间
    this.camera.position.z = 5
    // this.camera.position.set(-1.8, 0.6, 2.7)
  }
  rotateCube() {
    let timeId = setTimeout(() => {
      this.angle += 1
      this.rotateCube()
    }, 100)
  }
  addCube() {
    const cubes: Mesh[] = [0x44aa88, 0x229933, 0xaa4488].map(color => {
      return this.initGeometry(color)
    })
    cubes.forEach((cube, index) => {
      cube.position.x = index * 2
      this.scene.add(cube)
    })
    this.cubes = cubes
    // 创建光源
    const light = new DirectionalLight(0xFFFFFF, 1)
    light.position.set(-1, 2, 4)

    this.scene.add(light)
  }
  initGeometry(color: number): Mesh {
    // 创建几何体
    const geometry = new BoxGeometry(1, 1, 1)
    //  创建材质
    const material = new MeshPhongMaterial({ color })
    // 创建网格
    const cube = new Mesh(geometry, material)
    return cube
    // this.cube = cube

    // this.scene.add(cube)

  }

  initRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true })
    // 设置屏幕像素比
    // this.renderer.setPixelRatio(window.devicePixelRatio)
    this.resizeCanvas()

    this.container.appendChild(this.renderer.domElement)
  }


  render(time: number) {
    time = time * 0.001
    // this.cube.rotation.x = this.angle
    // this.cube.rotation.y = this.angle
    this.cubes.forEach(cube => {
      cube.rotation.x = time
      cube.rotation.y = time
    })

    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
  animate() {
    window.requestAnimationFrame(this.render.bind(this))

    // this.renderer.setAnimationLoop(this.render.bind(this))
  }


}
export default Cube3d2