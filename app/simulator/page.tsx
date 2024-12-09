"use client"
import React from "react";
import { Suspense } from 'react'
import {Canvas, useFrame} from "@react-three/fiber"
import { Mesh } from 'three'
function RotatingBox() {
    const ref = React.useRef<Mesh>(null!)
    const xRotation = 0;
    useFrame((state, dt) => {
        ref.current.rotation.x = Math.sin(state.clock.getElapsedTime());
        ref.current.rotation.y = -Math.sin(state.clock.getElapsedTime());
    })

    return(
        <mesh ref={ref} rotation={[1, 1, 0]}>
            <boxGeometry args={[1, 1, 1]}  />
            <meshPhongMaterial />
        </mesh>
    )
}

export default function SimulatorPage(
    { children } : {children: React.ReactNode}) {
        
        return(
        <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
                <RotatingBox></RotatingBox>
                <ambientLight intensity={0.3} color="blue" />
                <directionalLight position={[0, 0, 10]} color="yellow" />

        </Canvas>
    )
}