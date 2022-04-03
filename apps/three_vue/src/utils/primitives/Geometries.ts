import { BoxBufferGeometry, CircleBufferGeometry, WireframeGeometry } from "three";

const width = 8
const height = 8
const depth = 8

export const tBox = new BoxBufferGeometry(width, height, depth)

const radius = 7
const segments = 24
export const tCircle = new CircleBufferGeometry(radius, segments)

export const tWireframe = new WireframeGeometry(new BoxBufferGeometry(width, height, depth))