import { BufferGeometry, Color, DirectionalLight, DoubleSide, LineSegments, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { tBox, tCircle, tWireframe } from "./primitives/Geometries"

class Geo3d {
  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;
  container!: HTMLDivElement;
  meshList: (Mesh | LineSegments)[] = []
  resizeObserver!: ResizeObserver

  constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLDivElement
    this.init()
  }

  init() {
    this.scene = new Scene()
    this.scene.background = new Color(0xAAAAAA);
    this.camera = new PerspectiveCamera(
      75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000
    )
    this.camera.position.z = 80

    this.renderer = new WebGLRenderer({ antialias: true })
    this.container.appendChild(this.renderer.domElement)

    this.initLight()
    this.addGeometries()

    this.resizeCanvas()
    window.requestAnimationFrame(this.render.bind(this))

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas()
    })
    this.resizeObserver.observe(this.container)
  }

  initLight() {
    const light0 = new DirectionalLight(0xFFFFFF, 1)
    light0.position.set(-1, 2, 4)
    this.scene.add(light0)

    const light1 = new DirectionalLight(0xFFFFFF, 1)
    light0.position.set(1, -2, -4)
    this.scene.add(light1)
  }
  addGeometries() {
    const primitivesList: BufferGeometry[] = [tBox, tCircle, tWireframe]
    this.meshList = primitivesList.map(item => {
      const material = this.createMaterial()
      return new Mesh(item, material)
    })

    //定义物体在画面中显示的网格布局
    const eachRow = 5 //每一行显示 5 个
    const spread = 15 //行高 和 列宽

    //配置每一个图元实例，转化为网格，并位置和材质后，将其添加到场景中
    this.meshList.forEach((mesh, index) => {
      //我们设定的排列是每行显示 eachRow，即 5 个物体、行高 和 列宽 均为 spread 即 15
      //因此每个物体根据顺序，计算出自己所在的位置
      const row = Math.floor(index / eachRow) //计算出所在行
      const column = index % eachRow //计算出所在列

      mesh.position.x = (column - 2) * spread //为什么要 -2 ？
      //因为我们希望将每一行物体摆放的单元格，依次是：-2、-1、0、1、2，这样可以使每一整行物体处于居中显示
      mesh.position.y = (2 - row) * spread

      this.scene.add(mesh) //将网格添加到场景中
    })

  }
  createMaterial() {
    const material = new MeshPhongMaterial({ side: DoubleSide })

    const hue = Math.floor(Math.random() * 100) / 100 //随机获得一个色相
    const saturation = 1 //饱和度
    const luminance = 0.5 //亮度

    material.color.setHSL(hue, saturation, luminance)

    return material
  }

  resizeCanvas() {
    const container = this.container
    this.camera.aspect = container.clientWidth / container.clientHeight
    this.camera.updateProjectionMatrix() //通知镜头更新视椎(视野)
    // 这行实际就是设置 canvas 的width 和 height，很重要，不然就是默认的 300、150
    this.renderer.setSize(container.clientWidth, container.clientHeight, false)
  }

  render(time: number) {
    time = time * 0.001
    // this.cube.rotation.x = this.angle
    // this.cube.rotation.y = this.angle
    const speed = 0.1 + 10 * 0.05;
    const rot = time * speed;
    this.meshList.forEach(item => {
      item.rotation.x = rot
      item.rotation.y = rot
    })

    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
  destroy() {
    // window.removeEventListener('resize', this._onWindowResize)
    console.log('remove obserer ')
    this.resizeObserver.disconnect()
  }

}

export default Geo3d