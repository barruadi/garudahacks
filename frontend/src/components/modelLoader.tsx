import { useGLTF } from "@react-three/drei"


const Model = ({path}: {path: string}) => {
    const gltf = useGLTF(path);
    return <primitive object={gltf.scene} />
}


export default Model