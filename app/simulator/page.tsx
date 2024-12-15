"use client"
import React from "react";
import {useEffect, useState, FC} from "react";
import { Suspense } from 'react'
import {Canvas, ThreeElement, useFrame, useLoader} from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei";
import { Light, Mesh, MeshBasicMaterialParameters, MeshStandardMaterial, SphereGeometry, TextureLoader  } from 'three'
import useSWR, { SWRConfig, Fetcher } from 'swr'
import { element, lightTargetDirection, string, texture } from "three/webgpu";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { url } from "inspector";
import * as THREE from 'three'
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
        <group ref={ref} rotation={[1, 1, 0]}>
            <boxGeometry args={[1, 1, 1]}  />
            <StandardMaterial assetsDirectory="ganges_river_pebbles"></StandardMaterial>
        </group>
    )
}
function DynamicLandMesh(
    {size = 1, subdivision = 50}: {size: number, subdivision: number}
) {
    const ref = React.useRef<Mesh>(null!);
    
}

function FrameChecker({sphereRef, callback}: {sphereRef: React.RefObject<THREE.Mesh>, callback: Function}) {
    useFrame(() => {
        if (sphereRef.current != null) {
            callback();
        }
    })
    return (<></>)
}
export default function SimulatorPage(
    { children } : {children: React.ReactNode}) {
        const sphereRef = React.useRef<THREE.Mesh>(null!);
        const lightRef = React.useRef<THREE.SpotLight>(null!);

        const [geometryLoaded, setGeometryLoaded] = useState(false);
        //Weirdly useEffect doesn't rerun when the sphere has finished mounting, so I added
        //a check each frame for it
        //Trigger a rerender when geometry is loaded to add geometry that is dependent on others
        useEffect(() => {
            if (geometryLoaded) {
                lightRef.current.target = sphereRef.current;
                lightRef.current.visible = true;

                console.log("spotlight enabled");
                
            }
          }, [geometryLoaded]);
        
        return( 



        <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
                <FrameChecker sphereRef={sphereRef} callback={() => {setGeometryLoaded(true)}}/>
                <ambientLight intensity={0.5} color="white" />
                
                <mesh ref={sphereRef} >
                    <sphereGeometry args={[1, 100, 100]} />
                    <StandardMaterial assetsDirectory="ganges_river_pebbles"></StandardMaterial>
                    <spotLight position={[10, 10, 10]} angle={0.1} penumbra={1} decay={0} color="purple" ref={lightRef} visible={true} intensity={3}/>

                </mesh>
                
        <OrbitControls></OrbitControls>

        </Canvas>



    )
}