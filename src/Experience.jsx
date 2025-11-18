import { Center, OrbitControls, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.js'
import portalFragmentShader from './shaders/portal/fragment.js'
import * as THREE from 'three'



export default function Experience()
{

    const {nodes} = useGLTF("./model/portal.glb")
    console.log(nodes);
    

    
    const bakedImg = useTexture('./model/baked.jpg');
    bakedImg.flipY = false

    return <>
        <color args={["black"]} attach={"background"}/>

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={nodes.baked.geometry}>
            <meshBasicMaterial  map={bakedImg}/>
            </mesh>

            <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}> 
                <meshBasicMaterial />
            </mesh>

            
            <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}> 
                <meshBasicMaterial/>    
            </mesh>


            <mesh 
                geometry={nodes.portalLight.geometry} 
                position={nodes.portalLight.position} 
                rotation={nodes.portalLight.rotation}>
                    <shaderMaterial
                        vertexShader={portalVertexShader}
                        fragmentShader={portalFragmentShader}
                        uniforms={
                            {
                                uTime :{value : 0},
                                uColorStart : {value : new THREE.Color('#ac339a')},
                                uColorEnd: {value : new THREE.Color('#1b261bff')}
                            }
                        }
                    />
            </mesh>

            <Sparkles
            size={2}
            color={"cyan"}
            count={40}
            scale={[4,2,4]}
            speed={0.4}
            position-y={1.3}
            />

        </Center>

 

    </>
}