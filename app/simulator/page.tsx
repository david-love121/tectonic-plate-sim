"use client"
import React from "react";
import {useEffect, useState, FC} from "react";
import { Suspense } from 'react'
import {Canvas, useFrame, useLoader} from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei";
import { Mesh, MeshBasicMaterialParameters, MeshStandardMaterial, SphereGeometry, TextureLoader  } from 'three'
import useSWR, { SWRConfig, Fetcher } from 'swr'
import { element, string, texture } from "three/webgpu";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { url } from "inspector";

 const ErrorMaterial: FC<MeshBasicMaterialParameters> = () => {
    return(
        <meshBasicMaterial color="hotpink" ></meshBasicMaterial>
    )
 }

function GetTextureMaps(assetsDirectory: string) {
    const [downloadedJSON, setJSONData] = useState(null);
    useEffect(() => {
        async function downloadContentList() {
           
            const res = await fetch("/assets/" + assetsDirectory + "/" + assetsDirectory + ".json");
            const jsonData = await res.json();
            setJSONData(jsonData);
        }
        downloadContentList()
    }, [])
    if (downloadedJSON != undefined) {

        return downloadedJSON;
    }
    console.log("waiting for textures...");
    return undefined;
    
}

function StandardMaterial({assetsDirectory}: {assetsDirectory: string}) {
    const textureList = GetTextureMaps(assetsDirectory);

    if (textureList == undefined) {
        return <ErrorMaterial />
    }
    
    let availableMaps: string[] = [];
    let mapUrls: string[] = [];
    let texturesMap: Map<string, any> = new Map();
    for (const [key, value] of Object.entries(textureList)) {
       availableMaps.push(key); 
       mapUrls.push(value as string);
    }
    const textureObjects = useLoader(TextureLoader, mapUrls);
    let i: number = 0;
    for (let s of availableMaps) {
        texturesMap.set(s, textureObjects.at(i))
        i++;
    }
    const toPass = Object.fromEntries(texturesMap);
    return <meshStandardMaterial {...toPass} displacementScale={0.2}/>
    
    
}

function RotatingBox() : React.ReactNode {
    const ref = React.useRef<Mesh>(null!);
    const xRotation = 0;
    useFrame((state, dt) => {
        //ref.current.rotation.x = Math.sin(state.clock.getElapsedTime());
       //ref.current.rotation.y = -Math.sin(state.clock.getElapsedTime());
    })
    return(
        <mesh ref={ref} rotation={[1, 1, 0]}>
            <boxGeometry args={[1, 1, 1]}  />
            <StandardMaterial assetsDirectory="ganges_river_pebbles"></StandardMaterial>
        </mesh>
    )
}
function DynamicLandMesh(
    {size = 1, subdivision = 50}: {size: number, subdivision: number}
) {
    const ref = React.useRef<Mesh>(null!);
    
}

export default function SimulatorPage(
    { children } : {children: React.ReactNode}) {
  
        return(



        <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
                <ambientLight intensity={0.2} color="red" />
                <directionalLight position={[0, 0, 10]} color="white" />
                <mesh>
                <sphereGeometry args={[1, 100, 100]} />
                <StandardMaterial assetsDirectory="ganges_river_pebbles"></StandardMaterial>
                </mesh>
        <OrbitControls></OrbitControls>
        </Canvas>


    )
}