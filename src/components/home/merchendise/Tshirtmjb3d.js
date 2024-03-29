/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public\3d\tshirtmjb3d.glb 
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('./3d/tshirtmjb3d.glb');
  return (
    <group {...props} dispose={null}>
      <group position={[0.001, 0, 0.002]} scale={0.078}>
        <group position={[-0.06, 14.627, 0.27]} rotation={[0.087, 0, -0.007]}>
          <mesh
            geometry={nodes.pCube1.geometry}
            material={materials['re work_phong1_']}
            position={[0.146, 12.082, -4.257]}
            rotation={[1.96, 0, 0.02]}
            scale={[1.457, 0.031, 0.321]}
          />
          <mesh
            geometry={nodes.pCube2.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, 11.859, -4.33]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.157, 0.082, 0.157]}
          />
          <mesh
            geometry={nodes.polySurface3.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.polySurface37.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.polySurface38.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.polySurface4.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.ShirtpolySurface36.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.ShirtpolySurface38.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.ShirtpolySurface39.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.ShirtShirtpolySurface50.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
          <mesh
            geometry={nodes.ShirtShirtShirtpolySurface44.geometry}
            material={materials['re work_phong1_']}
            position={[0.144, -14.611, -0.716]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.394}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./3d/tshirtmjb3d.glb');
