import React from 'react'
import { useGLTF } from '@react-three/drei';
import { BoxGeometry } from 'three';
import { Color } from 'three';

export default function Img({ color, updateImgColor, ...props }) {
  const { nodes, materials } = useGLTF('/img.gltf');
  materials['Material238904.005'].color = new Color(color);

  return (
    <group {...props} dispose={null} scale={6}>
      
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials['Material238904.005']} position={[0, 0, -1.5]} />
        <mesh geometry={nodes.Object_3.geometry} material={materials['Material238904.005']} position={[0, 0, -1.5]}/>
        <mesh geometry={nodes.Object_4.geometry} material={materials['Material238904.005']} position={[0, 0, -1.5]}/>
        <mesh geometry={nodes.Object_5.geometry} material={materials['Material238904.005']} position={[0, 0, -1.5]}/>
        <primitive object={new BoxGeometry(1, 1, 1)} />
      </group>
    </group>
  )
}

useGLTF.preload('/img.gltf')