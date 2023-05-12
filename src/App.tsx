import {
  editable as e,
  RefreshSnapshot,
  SheetProvider,
  PerspectiveCamera,
} from "@theatre/r3f"
import {getProject} from "@theatre/core"
import {Suspense, useRef} from "react"
import {Canvas} from "@react-three/fiber"
import type {Mesh} from "three"

function App() {
  const cameraTargetRef = useRef<Mesh>(null!)

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Canvas
        dpr={[1.5, 2]}
        linear
        shadows
        gl={{preserveDrawingBuffer: true}}
        frameloop="demand"
      >
        <SheetProvider sheet={getProject("Space").sheet("Scene")}>
          <ambientLight intensity={0.75} />

          <PerspectiveCamera
            theatreKey="Camera / Camera"
            makeDefault
            position={[8, 8, 8]}
            fov={75}
            lookAt={cameraTargetRef}
          ></PerspectiveCamera>
          <e.mesh
            ref={cameraTargetRef}
            theatreKey="Camera / Target"
            position={[0, 0, 0]}
            visible="editor"
          >
            <boxBufferGeometry attach="geometry" />
            <meshPhongMaterial attach="material" color="red" />
          </e.mesh>

          <e.mesh theatreKey="The Box" scale={1} position={[0, 1, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </e.mesh>
          <e.mesh
            theatreKey="Plane"
            scale={1}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeBufferGeometry args={[10, 10]} />
            <meshBasicMaterial color={"white"} />
          </e.mesh>
          <e.directionalLight theatreKey="Lighting / Directional" />

          <Suspense fallback={null}>
            <RefreshSnapshot />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default App
