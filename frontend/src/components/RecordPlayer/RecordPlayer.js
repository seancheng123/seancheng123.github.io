import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, } from "@react-three/drei";
import RecordPlayerModel from "../../assets/record-player-copy.glb";
import gsap from 'gsap';
import * as THREE from 'three';


function Models({ url, setAnimatedParts, setScene }) {
  const { scene } = useGLTF(url);
	
	const clonedParts = useMemo(() => {
		let animatedParts = {};

		scene.traverse((child) => {
			if (child.name === "RecordDisk") {
				animatedParts["RecordDisk"] = child.clone();
				child.visible = false;
			}
			if (child.name === "Arm") {
				animatedParts["Arm"] = child.clone();
				child.visible = false;

				animatedParts["Arm"].traverse((subChild) => {
					if (subChild.name === "Circle007") {
						animatedParts["Circle007"] = subChild;
					}
			});
			}
			if (child.name === "Circle007") {
				child.visible = false;
			}
			if (child.name === "Lever") {
				animatedParts["Lever"] = child.clone();
				child.visible = false;
			}
			if (child.name === "AlbumDisplay") {
				animatedParts["AlbumDisplay"] = child.clone();
				child.visible = false;
			}
			if (child.name === "Album1") {
				animatedParts["Album1"] = child.clone();
				child.visible = false;
			}

			if (child.isMesh) {
				child.castShadow = true;
			}

			console.log(child.name);
		});

		return animatedParts;
	}, [scene]);

	useEffect(() => {
    setAnimatedParts(clonedParts);
		setScene(scene);
  }, [clonedParts, setAnimatedParts, setScene]); 

  return (
		<group>
      <primitive object={scene} />
    </group>
	);
}

function CameraController({ controlsRef, delay = 2000, playerSelected, displaySelected }) {
  const { camera } = useThree();
	const hasRunOnce = useRef(false);

  useEffect(() => {
		let timeout;

		const startAnimation = () => {
      const tl = gsap.timeline();

      if (playerSelected) {
        tl.to(camera.position, {
          x: 1,
          y: 1.4,
          z: -0.25,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix(),
        })
        .to(controlsRef.current.target, {
          x: 0,
          y: 0.75,
          z: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => controlsRef.current.update(),
        }, 0);
      } 
			else if (displaySelected) {
				tl.to(camera.position, {
          x: 1,
          y: 2,
          z: -2.5,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix(),
        })
        .to(controlsRef.current.target, {
          x: -2.5,
          y: 0,
          z: -2.5,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => controlsRef.current.update(),
        }, 0);
			}
			else {
        tl.to(camera.position, {
          x: 3,
          y: 2,
          z: -3,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => camera.updateProjectionMatrix(),
        })
        .to(controlsRef.current.target, {
          x: -1,
          y: 1,
          z: -1,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => controlsRef.current.update(),
        }, 0);
      }

			return () => {
				if (tl) tl.kill();
			}
		}

		if (!hasRunOnce.current) {
      timeout = setTimeout(() => {
        startAnimation();
        hasRunOnce.current = true;
      }, delay);
    } else {
      startAnimation();
    }

    return () => clearTimeout(timeout);
  }, [playerSelected, camera, controlsRef, delay, displaySelected]);

  return null;
}


export default function LandingScene() {
	const [scene, setScene] = useState(null);

	const controlsRef = useRef();

	const [animatedParts, setAnimatedParts] = useState({});

	const [playerSelected, setPlayerSelected] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [side, setSide] = useState(false);

	const [displaySelected, setDisplaySelected] = useState(false);

	function spinLever() {
		gsap.to(animatedParts["Lever"].rotation, {
			z: animatedParts["Lever"].rotation.z + Math.PI * 4,
			duration: 1.5,
			ease: 'power1.inOut',
		})
	}

	useEffect(() => {
		const tl = gsap.timeline();
		if (animatedParts["Arm"] && animatedParts["Circle007"]) {
			if (playing) {
				tl.to(animatedParts["Arm"].rotation, {
					y: 0,
					duration: 1,
					ease: 'power1.inOut',
				})
				.to(animatedParts["Circle007"].rotation, {
					x: 0,
					y: 0,
					z: 0,
					duration: 0.5,
					ease: 'power1.inOut',
				}, 1)
				.to(animatedParts["RecordDisk"].rotation, {
					y: animatedParts["RecordDisk"].rotation.y + (!side ? (2 * Math.PI) : -2 * Math.PI),
					duration: 5,
					ease: 'none',
					repeat: -1
				}, 0);
			}
			else {
				tl.to(animatedParts["Circle007"].rotation, {
					x: Math.PI / 7,
					y: .1,
					z: .4,
					duration: 0.5,
					ease: 'power1.inOut',
				})
				.to(animatedParts["Arm"].rotation, {
					y: Math.PI / 4,
					duration: 1,
					ease: 'power1.inOut',
				}, 0.5)
				
				
				gsap.killTweensOf(animatedParts["RecordDisk"].rotation);
			}
		}
		return () => {
			if (tl) tl.kill();
		};
	}, [playing, animatedParts]);

	useEffect(() => {
		const tl = gsap.timeline();
		if (animatedParts["RecordDisk"]) {
			if (!side && !playing) {
				tl.to(animatedParts["RecordDisk"].position, {
					y: "+=0.4",
					duration: 0.5,
					ease: 'power1.inOut'
				})
				.to(animatedParts["RecordDisk"].rotation, {
					x: animatedParts["RecordDisk"].rotation.x + Math.PI,
					duration: 0.5,
					ease: 'power1.inOut'
				}, 0.5)
				.to(animatedParts["RecordDisk"].position, {
					y: "-=0.4",
					duration: 0.5,
					ease: 'power1.inOut'
				}, 1)
			}
			else if (side && !playing) {
				tl.to(animatedParts["RecordDisk"].position, {
					y: "+=0.4",
					duration: 0.5,
					ease: 'power1.inOut'
				})
				.to(animatedParts["RecordDisk"].rotation, {
					x: animatedParts["RecordDisk"].rotation.x - Math.PI,
					duration: 0.5,
					ease: 'power1.inOut'
				}, 0.5)
				.to(animatedParts["RecordDisk"].position, {
					y: "-=0.4",
					duration: 0.5,
					ease: 'power1.inOut'
				}, 1)
			}
		}

		return () => {
			if (tl) tl.kill();
		};
	}, [side, animatedParts]);

	function selectDisk() {
		if (!playerSelected) {
			setPlayerSelected(true);
		}
		else {
			setSide(!side);
		}
	}

	


  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, -1], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
    >
			<Environment preset="apartment"/>
			
      <ambientLight intensity={0.5} />
			<pointLight
				position={[3, 6, 0]}
				intensity={20}
				distance={20}
				decay={1}
				castShadow
				shadow-mapSize={[2048, 2048]}
				shadow-bias={0.01} 
			/>

      <Suspense fallback={null}>
        <Models url={RecordPlayerModel} setAnimatedParts={setAnimatedParts} setScene={setScene}/>
				{animatedParts["RecordDisk"] && <primitive object={animatedParts["RecordDisk"]} onClick={(e) => {e.stopPropagation(); selectDisk()}}/>}
				{animatedParts["Arm"] && <primitive object={animatedParts["Arm"]} onClick={(e) => {e.stopPropagation(); setPlaying(!playing)}}/>}
				{animatedParts["Lever"] && <primitive object={animatedParts["Lever"]} onClick={(e) => {e.stopPropagation(); spinLever()}}/>}
				{animatedParts["AlbumDisplay"] && <primitive object={animatedParts["AlbumDisplay"]} onClick={(e) => {e.stopPropagation(); setDisplaySelected(true)}}/>}
				{animatedParts["Album1"] && <AlbumHover album={animatedParts["Album1"]} />}
      </Suspense>

			<OrbitControls 
				ref={controlsRef}
				target={[-2, 2, -1]}
				enableDamping
        ampingFactor={0.1}
				enablePan={true}
				enableZoom={true}
				enableRotate={true}
			/>
			<CameraController controlsRef={controlsRef} delay={1000} playerSelected={playerSelected} displaySelected={displaySelected}/>

			<mesh 
				rotation={[-Math.PI / 2, 0, 0]}
				position={[4, 0, -6]}
				receiveShadow
				onClick={(e) => {e.stopPropagation(); setPlayerSelected(false); setDisplaySelected(false)}}
			>
				<planeGeometry args={[16, 16]} />
				<meshStandardMaterial color="white" />
			</mesh>
			<mesh 
				rotation={[0, Math.PI/2, 0]}
				position={[-3.01, 8, -6]}
				receiveShadow
				onClick={(e) => {e.stopPropagation(); setPlayerSelected(false); setDisplaySelected(false)}}
			>
				<planeGeometry args={[16, 16]} />
				<meshStandardMaterial color="white" />
			</mesh>
			<mesh 
				rotation={[0, Math.PI, 0]}
				position={[4, 8, 2]}
				receiveShadow
				onClick={(e) => {e.stopPropagation(); setPlayerSelected(false); setDisplaySelected(false)}}
			>
				<planeGeometry args={[16, 16]} />
				<meshStandardMaterial color="white" />
			</mesh>    
    </Canvas>
  );
}

function AlbumHover({ album }) {
  const { pointer, camera, scene } = useThree();
  const hover = useRef(false);
  const ref = useRef();
  const originalRotation = useRef(new THREE.Euler());
  const plane = new THREE.Plane();
  const raycaster = new THREE.Raycaster();
  const intersection = new THREE.Vector3();
  const targetQuat = new THREE.Quaternion();

  useEffect(() => {
    if (album) {
      ref.current = album;
      originalRotation.current.copy(album.rotation);
    }
  }, [album]);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;

    if (hover.current) {
      const albumWorldPos = mesh.getWorldPosition(new THREE.Vector3());
      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);
      plane.setFromNormalAndCoplanarPoint(cameraDir, albumWorldPos);

      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(plane, intersection);

      intersection.lerp(albumWorldPos, 0.9);

      mesh.lookAt(intersection);
			mesh.rotateY(-Math.PI / 2);
      targetQuat.copy(mesh.quaternion);

    } else if (!mesh.userData.isDetached) {
      mesh.rotation.copy(originalRotation.current);
      targetQuat.copy(mesh.quaternion);
    }

  });

  function handleAlbumClick(album, scene) {
    if (!album) return;

    if (!album.userData.savedWorld) {
      album.userData.savedWorld = {
        position: album.getWorldPosition(new THREE.Vector3()),
        rotation: album.getWorldQuaternion(new THREE.Quaternion()),
        parent: album.parent
      };

      scene.attach(album);
      album.position.set(-0.75, 1, -2.5);
    } else {
      const { position, rotation, parent } = album.userData.savedWorld;
      parent.attach(album);
      album.position.copy(album.parent.worldToLocal(position.clone()));
      album.quaternion.copy(rotation);
      delete album.userData.savedWorld;
    }
  }

  return (
    <primitive
      object={album}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      onClick={(e) => { e.stopPropagation(); handleAlbumClick(album, scene); }}
    />
  );
}