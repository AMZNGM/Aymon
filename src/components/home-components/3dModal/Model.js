import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/3dmodel/retro-office.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KeyBoard_002001.geometry}
        material={materials['Keyboard Black.001']}
        position={[4.276, 0.755, 3.504]}
      />
      <group position={[4.487, 0.783, 3.904]}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder001_1.geometry} material={materials['Mug 4']} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder001_2.geometry} material={materials['Mug 4 Logo']} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Minute_Arm002.geometry}
        material={materials.Black}
        position={[4.999, 1.137, 5.153]}
        rotation={[0, 1.558, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Filing_Cainet_Base005.geometry}
        material={materials['Note.001']}
        position={[5.178, 0.926, 3.511]}
        rotation={[-Math.PI / 2, 1.426, Math.PI]}
      />
      <group position={[5.359, 0.806, 4.096]} rotation={[Math.PI / 2, 0, 0]} scale={0.011}>
        <mesh castShadow receiveShadow geometry={nodes.PC_004006.geometry} material={materials['PC White']} />
        <mesh castShadow receiveShadow geometry={nodes.PC_004006_1.geometry} material={materials['Pc Feet']} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PC_004002.geometry}
        material={materials['Ucupaint PC White Front new']}
        position={[5.356, 0.806, 4.096]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.011}
      />
      <group position={[5.304, 1.009, 4.109]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Monitor_002003.geometry} material={materials['Monitor White']} />
        <mesh castShadow receiveShadow geometry={nodes.Monitor_002003_1.geometry} material={materials['Monitor_Glass.001']} />
      </group>
      <group position={[4.573, 1.012, 3.52]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube049.geometry} material={materials['Monitor Plastic']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube049_1.geometry} material={materials['Monitor Glass']} />
      </group>
      <group position={[4.646, 0.869, 3.534]} rotation={[Math.PI, 0, Math.PI]} scale={1.1}>
        <mesh castShadow receiveShadow geometry={nodes.PC002_1.geometry} material={materials['PC.001']} />
        <mesh castShadow receiveShadow geometry={nodes.PC002_2.geometry} material={materials['Pc Feet']} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PC_004003.geometry}
        material={materials['Ucupaint PC Black Front']}
        position={[4.556, 0.807, 3.543]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.011}
      />
      <group position={[4.926, 0, 3.588]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Cubicle_Wall003.geometry} material={materials.DefaultMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.Cubicle_Wall003_1.geometry} material={materials['Generic Glass']} />
      </group>
      <group position={[3.992, 0, 3.109]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Cubicle_Wall004_1.geometry} material={materials.DefaultMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.Cubicle_Wall004_2.geometry} material={materials['Generic Glass']} />
      </group>
      <group position={[5.922, 0, 4.088]} rotation={[Math.PI / 2, 0, -2.853]} scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Chair005.geometry} material={materials['Office_Chair_Leather.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Chair005_1.geometry} material={materials['Office_Chair_Plastic.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Chair005_2.geometry} material={materials['Office_Chair_Metal.001']} />
      </group>
      <group position={[3.936, 0, 3.602]} rotation={[Math.PI / 2, 0, 0.289]} scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Chair006.geometry} material={materials['Office_Chair_Leather.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Chair006_1.geometry} material={materials['Office_Chair_Plastic.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Chair006_2.geometry} material={materials['Office_Chair_Metal.001']} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottom_Drawer001.geometry}
        material={materials.Table}
        position={[4.051, 0.43, 4.129]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottom_Drawer002.geometry}
        material={materials.Table}
        position={[5.637, 0.43, 3.491]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk001.geometry}
        material={materials.Table}
        position={[5.377, 0.459, 3.728]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk003.geometry}
        material={materials.Table}
        position={[4.528, 0.459, 3.892]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top_Drawer001.geometry}
        material={materials.Table}
        position={[4.271, 0.626, 4.129]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top_Drawer002.geometry}
        material={materials.Table}
        position={[5.797, 0.626, 3.491]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder001.geometry} material={materials.Pot} position={[4.734, 0.451, 4.99]} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lamp001.geometry}
        material={materials['Black Lamp']}
        position={[5.572, 1.052, 3.418]}
        rotation={[-Math.PI, 0.675, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lamp003.geometry}
        material={materials['Creme Lamp']}
        position={[4.708, 1.052, 4.246]}
        rotation={[1.948, -0.457, -2.409]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cooler001.geometry}
        material={materials.Cooler}
        position={[3.878, 0.609, 2.834]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Binder red']}
        position={[5.209, 0.831, 3.418]}
        rotation={[-1.506, 1.528, 1.506]}
        scale={[1.026, 1, 1.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials['Binder Blue']}
        position={[5.214, 0.765, 3.421]}
        rotation={[1.428, 1.565, -1.428]}
        scale={[1.026, 1, 1.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials['Binder Blue']}
        position={[4.236, 0.274, 4.146]}
        scale={[1.026, 1, 1.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials['Binder Black']}
        position={[5.205, 0.897, 3.412]}
        rotation={[-1.566, 1.48, 1.567]}
        scale={[1.026, 1, 1.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['paper ']}
        position={[5.245, 1.001, 4.622]}
        rotation={[0, 0.53, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials['paper ']}
        position={[5.671, 0.553, 3.453]}
        rotation={[0, 0.245, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials['paper ']}
        position={[4.254, 0.077, 4.973]}
        rotation={[Math.PI / 2, 0, -0.173]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['paper ']}
        position={[5.61, 0.083, 4.982]}
        rotation={[2.054, 0.32, -1.024]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials['paper 2']}
        position={[5.47, 0.028, 4.599]}
        rotation={[0, 0.183, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={materials['paper 2']}
        position={[5.386, 0.361, 4.58]}
        rotation={[0, -0.226, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={materials['paper 3']}
        position={[4.544, 0.791, 2.668]}
        rotation={[0, -0.282, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials['paper 3']}
        position={[4.245, 0.308, 4.106]}
        rotation={[-0.05, -0.235, -0.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={materials['paper 3']}
        position={[5.592, 0.557, 3.51]}
        rotation={[0, -0.376, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={materials['paper 2']}
        position={[5.323, 0.632, 2.864]}
        rotation={[0, 0.315, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={materials['paper 2']}
        position={[4.202, 0.059, 5.073]}
        rotation={[1.831, 0.831, -0.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014.geometry}
        material={materials['paper 2']}
        position={[5.535, 0.059, 5.018]}
        rotation={[1.831, 0.831, -0.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane015.geometry}
        material={materials['paper 3']}
        position={[4.319, 0.147, 5.095]}
        rotation={[Math.PI / 2, 0, -0.173]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane016.geometry}
        material={materials['paper 3']}
        position={[5.623, 0.153, 5.049]}
        rotation={[Math.PI / 2, 0, -0.173]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials['Cardboard Box']}
        position={[5.691, 0.132, 2.875]}
        rotation={[0, 1.443, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials['Cardboard Box']}
        position={[5.277, 0.537, 2.879]}
        rotation={[0, 1.156, 0]}
      />
      <group position={[5.688, 0.098, 2.896]} rotation={[0, 1.443, 0]} scale={[0.11, 0.474, 0.474]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube024_1.geometry} material={materials.Files} />
        <mesh castShadow receiveShadow geometry={nodes.Cube024_2.geometry} material={materials['paper ']} />
      </group>
      <group position={[5.269, 0.509, 2.898]} rotation={[0, 1.156, 0]} scale={[0.11, 0.474, 0.474]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube025_1.geometry} material={materials['Files.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube025_2.geometry} material={materials['paper .001']} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes.Cylinder002.geometry} material={materials['Trash can']} position={[4.263, 0, 5.036]} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder004.geometry} material={materials['Trash can']} position={[5.597, 0, 5.009]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube009.geometry} material={materials['Cabinet Metal']} position={[5.33, 0.5, 4.61]} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials['Cabinet Metal']}
        position={[4.656, 0.5, 4.61]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <group position={[4.591, 0.462, 2.556]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube029_1.geometry} material={materials['Printer Screen']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube029_2.geometry} material={materials['Pc Feet']} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials['Printer Top White']}
        position={[4.705, 1.111, 2.696]}
        rotation={[0, 0, -0.873]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials['Transparent blue plastic procedural']}
        position={[3.857, 1.048, 2.89]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={0.84}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={materials.Phone}
        position={[5.521, 0.767, 3.542]}
        rotation={[0, -0.399, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube019.geometry}
        material={materials.Phone}
        position={[4.502, 0.774, 4.083]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={1.2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KeyBoard_002002.geometry}
        material={materials['Keyboard White.001']}
        position={[5.632, 0.756, 4.136]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.011}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mouse_001001.geometry}
        material={materials['Mouse White']}
        position={[5.609, 0.756, 3.842]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.011}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mouse_001004.geometry}
        material={materials['Mouse Black.001']}
        position={[4.293, 0.756, 3.797]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.011}
      />
      <group position={[5.387, 0.782, 3.69]} rotation={[0, -0.259, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder009_1.geometry} material={materials['Mug 3']} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder009_2.geometry} material={materials['Mug 3 Logo']} />
      </group>
      <group position={[4.999, 1.136, 5.068]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder019.geometry} material={materials['Clock face']} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder019_1.geometry} material={materials['Generic Glass']} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder019_2.geometry} material={materials['Clock Back']} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder009.geometry}
        material={materials.Black}
        position={[5.002, 1.089, 5.083]}
        rotation={[-2.303, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder010.geometry}
        material={materials['Black.001']}
        position={[4.995, 1.136, 5.068]}
        rotation={[0, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder013.geometry}
        material={materials['Trash can']}
        position={[4.669, 0.825, 3.941]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath003.geometry}
        material={materials['Pc Feet']}
        position={[5.176, 0.753, 3.909]}
        scale={0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath004.geometry}
        material={materials['Pc Feet']}
        position={[4.729, 0.753, 3.734]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath008.geometry}
        material={materials['Pc Feet']}
        position={[5.143, 0.751, 4.237]}
        rotation={[0, 0, -Math.PI]}
        scale={-0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath009.geometry}
        material={materials['Pc Feet']}
        position={[4.762, 0.751, 3.406]}
        rotation={[-Math.PI, 0, 0]}
        scale={-0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath001.geometry}
        material={materials['Pc Feet']}
        position={[5.036, 0.874, 4.153]}
        rotation={[0, 0, -Math.PI]}
        scale={-0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath002.geometry}
        material={materials['Pc Feet']}
        position={[4.869, 0.873, 3.488]}
        rotation={[-Math.PI, 0, 0]}
        scale={-0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath005.geometry}
        material={materials['Pc Feet']}
        position={[5.036, 0.871, 4.079]}
        rotation={[0, 0, -Math.PI]}
        scale={-0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath006.geometry}
        material={materials['Pc Feet']}
        position={[4.869, 0.87, 3.562]}
        rotation={[-Math.PI, 0, 0]}
        scale={-0.102}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube023.geometry}
        material={materials['Cardboard Box']}
        position={[5.691, 0.018, 2.875]}
        rotation={[0, 1.443, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube024.geometry}
        material={materials['Cardboard Box']}
        position={[5.277, 0.614, 2.879]}
        rotation={[0, 1.156, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube025.geometry}
        material={materials['Cardboard Box White']}
        position={[5.098, 0.146, 2.871]}
        rotation={[0, 1.571, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube027.geometry}
        material={materials['Cardboard Box White']}
        position={[5.365, 0.146, 2.871]}
        rotation={[0, 1.571, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028.geometry}
        material={materials['Cardboard Box White']}
        position={[5.25, 0.352, 2.86]}
        rotation={[-Math.PI, 1.382, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube029.geometry}
        material={materials['Cardboard Box White']}
        position={[5.098, 0.188, 2.871]}
        rotation={[0, 1.571, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube030.geometry}
        material={materials['Cardboard Box White']}
        position={[5.365, 0.188, 2.871]}
        rotation={[0, 1.571, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube031.geometry}
        material={materials['Cardboard Box White']}
        position={[5.25, 0.394, 2.86]}
        rotation={[-Math.PI, 1.382, -Math.PI]}
      />
      <group position={[5.649, 0.137, 4.613]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube042.geometry} material={materials['Cabinet Metal']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube042_1.geometry} material={materials.Note} />
      </group>
      <group position={[4.472, 0.137, 4.608]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube043.geometry} material={materials['Cabinet Metal']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube043_1.geometry} material={materials.Note} />
      </group>
      <group position={[5.572, 0.47, 4.613]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube044.geometry} material={materials['Cabinet Metal']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube044_1.geometry} material={materials.Note} />
      </group>
      <group position={[4.356, 0.47, 4.608]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube045.geometry} material={materials['Cabinet Metal']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube045_1.geometry} material={materials.Note} />
      </group>
      <group position={[5.547, 0.802, 4.613]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube047.geometry} material={materials['Cabinet Metal']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube047_1.geometry} material={materials.Note} />
      </group>
      <group position={[4.47, 0.802, 4.608]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube048.geometry} material={materials['Cabinet Metal']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube048_1.geometry} material={materials.Note} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fan_Head002.geometry}
        material={materials['Fan_Metal.001']}
        position={[5.308, 0.977, 5.11]}
        rotation={[Math.PI / 2, 0, -0.821]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fan_Head003.geometry}
        material={materials.Fan_Metal}
        position={[5.26, 0.335, 5.135]}
        rotation={[Math.PI / 2, 0, -0.821]}
        scale={0.01}
      />
      <group position={[5.301, 0.971, 5.116]} rotation={[Math.PI / 2, 0, -0.821]} scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Fan_Head005_1.geometry} material={materials.Fan_Metal} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_Head005_2.geometry} material={materials.Fan_Head} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_Head005_3.geometry} material={materials['Fan Brand']} />
      </group>
    </group>
  )
}

useGLTF.preload('/3dmodel/retro-office.glb')
