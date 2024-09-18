import React, {Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import Img from '../Img';
import Tshirt from  '../Tshirt';
import './three.css';

export default function ThreeScene({ choice, color, text,logoImage }) {
    return (
      <Canvas>
      <ambientLight />
      <OrbitControls enableZoom={false} />
      <pointLight position-y={[0, 0, -2]} />
      <Suspense fallback={null}>
        {choice === "Hoodie" ? <Img color={color} text={text} logoImage={logoImage} /> : null}
        {choice === "T-shirt" ? <Tshirt color={color} text={text} logoImage={logoImage} /> : null}
        {/* {logoImage && (
        <img src={logoImage} alt="Logo" />
        )} */}
      </Suspense>
      <Environment preset="sunset" />
    </Canvas>
    );
  }


