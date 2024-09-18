import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import Img from '../Img';
import Tshirt from '../Tshirt';
import '../pages/mesdesign.css';

const ThreeArticle = ({ type, color }) => {
  return (
    <div className="canvas-container">
      <Canvas>
        <ambientLight />
        <OrbitControls enableZoom={false} />
        <pointLight position-y={[0, 0, -2]} />
        <Suspense fallback={null}>
          {type === 'Hoodie' ? <Img color={color} /> : <Tshirt color={color} />}
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

export default ThreeArticle;
