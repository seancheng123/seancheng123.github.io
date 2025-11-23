import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import "./RecordPlayer.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Preload, Html } from "@react-three/drei";
import RecordPlayerModel from "../../assets/record-player-copy.glb";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import myEnvironment from "../../assets/forest.exr";
import gsap from 'gsap';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';


function Models({ url, setAnimatedParts}) {
  const { scene } = useGLTF(url);
	
	const clonedParts = useMemo(() => {
		let animatedParts = {};

		scene.traverse((child) => {
			child.castShadow = true;
			child.receiveShadow = true;
			if (child.name === "RecordDisk") {
				animatedParts["RecordDisk"] = child.clone();
				child.visible = false;
			}
			if (child.name === "Arm") {
				animatedParts["Arm"] = child.clone();
				child.visible = false;

				animatedParts["Arm"].traverse((subChild) => {
					if (subChild.name === "Needle") {
						animatedParts["Needle"] = subChild;
					}
			});
			}
			if (child.name === "Needle") {
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


			console.log(child.name);
		});

		return animatedParts;
	}, []);

	useEffect(() => {
    setAnimatedParts(clonedParts);
  }, [clonedParts]);

  return (
		<group>
      <primitive object={scene} />
			<Perf position="top-left" />

    </group>
	);
}

function CameraController({ controlsRef, delay = 2000, playerSelected, displaySelected, diskTextRef }) {
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
          ease: 'power1.inOut',
        })
        .to(controlsRef.current.target, {
          x: 0,
          y: 0.75,
          z: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        }, 0)
				.to(diskTextRef.current, 
					{
						opacity: 1,
						duration: 1,
						ease: 'power1.out',
						onComplete: () => {
							diskTextRef.current.visible = true;
						}
					}, 1.5);
      } 
			else if (displaySelected) {
				tl.to(camera.position, {
          x: 1,
          y: 2,
          z: -2.5,
          duration: 1.5,
          ease: 'power1.inOut',
        })
        .to(controlsRef.current.target, {
          x: -2.5,
          y: 0,
          z: -2.5,
          duration: 1.5,
          ease: 'power1.inOut',
        }, 0)
				.to(diskTextRef.current, 
					{
						opacity: 0,
						duration: 1,
						ease: 'power1.out',
						onComplete: () => {
							diskTextRef.current.visible = false;
						}
					}, 0);
			}
			else {
        tl.to(camera.position, {
          x: 3,
          y: 2,
          z: -3,
          duration: 1.5,
          ease: 'power1.inOut',
        })
        .to(controlsRef.current.target, {
          x: -1,
          y: 1,
          z: -1,
          duration: 1.5,
          ease: 'power1.inOut',
        }, 0)
				.to(diskTextRef.current, 
					{
						opacity: 0,
						duration: 1,
						ease: 'power1.out',
						onComplete: () => {
							diskTextRef.current.visible = false;
						}
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
  }, [playerSelected, displaySelected]);

  return null;
}


export default function LandingScene() {
	const controlsRef = useRef();

	const [animatedParts, setAnimatedParts] = useState({});
	const diskTextRef = useRef(null);

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
		if (animatedParts["Arm"] && animatedParts["Needle"]) {
			if (playing && playerSelected) {
				tl
				.to(animatedParts["Arm"].rotation, {
					y: 0,
					duration: 1,
					ease: 'power1.inOut',
				})
				.to(animatedParts["Needle"].rotation, {
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
				tl
				.to(animatedParts["Needle"].rotation, {
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
		return () => { if (tl) tl.kill(); };
	}, [playing, animatedParts["Arm"], animatedParts["Needle"], animatedParts["RecordDisk"]]);

	useEffect(() => {
		const tl = gsap.timeline();
		if (animatedParts["RecordDisk"]) {
			if (!side && !playing) {
				tl
				.to(animatedParts["RecordDisk"].position, {
					y: 1.1,
					duration: 0.5,
					ease: 'power1.inOut'
				})
				.to(animatedParts["RecordDisk"].rotation, {
					x: Math.PI,
					duration: 0.5,
					ease: 'power1.inOut'
				}, 0.5)
				.to(animatedParts["RecordDisk"].position, {
					y: 0.66,
					duration: 0.5,
					ease: 'power1.inOut'
				}, 1)
			}
			else if (side && !playing) {
				tl
				.to(animatedParts["RecordDisk"].position, {
					y: 1.1,
					duration: 0.5,
					ease: 'power1.inOut'
				})
				.to(animatedParts["RecordDisk"].rotation, {
					x: 0,
					duration: 0.5,
					ease: 'power1.inOut'
				}, 0.5)
				.to(animatedParts["RecordDisk"].position, {
					y: 0.66,
					duration: 0.5,
					ease: 'power1.inOut'
				}, 1)
			}
		}

		return () => { if (tl) tl.kill(); };
	}, [side, animatedParts["RecordDisk"]]);

	function selectDisk() {
		if (!playerSelected) {
			setPlayerSelected(true);
			setDisplaySelected(false);
		}
		else {
			setSide(!side);
		}
	}


  return (
    <Canvas
      shadows
      camera={{ position: [-1, 2, -2], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
			onCreated={(state) => {
				state.gl.outputColorSpace = THREE.SRGBColorSpace;
				state.gl.toneMapping = THREE.ACESFilmicToneMapping;
				state.gl.toneMappingExposure = 1.0;
				state.gl.physicallyCorrectLights = true;
				state.gl.shadowMap.enabled = true;
				state.gl.shadowMap.type = THREE.PCFSoftShadowMap;
			}}
    >
			<Suspense fallback={<Html position={[-1,2,-2]}><LoadingScreen /></Html>}>
				<Environment 
					preset="apartment"
					background={false}
					blur={0} // Add a slight blur to soften the reflections/lighting
					environmentIntensity={1} // Adjust the brightness of the environment light
				/>
				
				<ambientLight intensity={0.1} />
				<pointLight 
					position={[2, 3, -2]} 
					intensity={40} 
					distance={10}
					decay={2}
					castShadow
					shadow-mapSize-width={1024}     // Higher resolution for better detail
  				shadow-mapSize-height={1024}
					shadow-bias={-0.001}
				/>
				

				
				<Models url={RecordPlayerModel} setAnimatedParts={setAnimatedParts}/>
				{animatedParts["RecordDisk"] && <primitive object={animatedParts["RecordDisk"]} onClick={(e) => {e.stopPropagation(); selectDisk()}}/>}
				{animatedParts["Arm"] && <primitive object={animatedParts["Arm"]} onClick={(e) => {e.stopPropagation(); setPlaying(!playing)}}/>}
				{animatedParts["Lever"] && <primitive object={animatedParts["Lever"]} onClick={(e) => {e.stopPropagation(); spinLever()}}/>}
				{animatedParts["AlbumDisplay"] && <primitive object={animatedParts["AlbumDisplay"]} onClick={(e) => {e.stopPropagation(); setPlayerSelected(false); setDisplaySelected(true)}}/>}
				{animatedParts["Album1"] && <AlbumModel album={animatedParts["Album1"]} displaySelected={displaySelected} setDisplaySelected={setDisplaySelected}/>}
				

				<OrbitControls 
					ref={controlsRef}
					target={[-2, 2, -2]}
					enableDamping
					dampingFactor={0.1}
					enablePan={true}
					enableZoom={true}
					enableRotate={true}
				/>
				<CameraController controlsRef={controlsRef} delay={3000} playerSelected={playerSelected} displaySelected={displaySelected} diskTextRef={diskTextRef}/>

				<Html 
					position={[0, 1, 0.75]} 
					rotation={[0, 0, 0]}
					center
					ref={diskTextRef}
					visible={false}
				>
					<div className="frosted-panel">
						<h1 className="panel-title">Your Dynamic Title</h1>
						<p className="panel-content">
							This text is rendered using standard CSS and HTML. The container size will automatically adjust to fit this content unless a fixed width/height is set in the CSS.
						</p>
					</div>
				</Html>
				
				<Preload all/>
			</Suspense>
    </Canvas>
  );
}

function AlbumModel({ album, displaySelected, setDisplaySelected }) {
  const { pointer, camera, scene } = useThree();
  const hover = useRef(false);
  const ref = useRef(album); // Refers to the album 3d object
  
	const selected = useRef(false);

  const originalRotation = useRef(new THREE.Euler());
	originalRotation.current.copy(album.rotation);

  const plane = new THREE.Plane();
  const raycaster = new THREE.Raycaster();
  const intersection = new THREE.Vector3();
  const targetQuat = new THREE.Quaternion();

  useFrame(() => {
    const mesh = ref.current;
    if (!displaySelected || !selected.current || !mesh) return;
		const temp = new THREE.Object3D();

    if (hover.current && displaySelected && selected.current) {
      const albumWorldPos = mesh.getWorldPosition(new THREE.Vector3());
      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);

	  	const offset = 0.4;
			const planePos = albumWorldPos.clone().add(cameraDir.clone().multiplyScalar(-offset));
      plane.setFromNormalAndCoplanarPoint(cameraDir, planePos);

      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(plane, intersection);
			
			temp.position.copy(mesh.position);
			temp.lookAt(intersection);
			temp.rotateY(-Math.PI / 2);
      targetQuat.copy(temp.quaternion);

    } else if (!mesh.userData.isDetached) {
			const originalQuat = new THREE.Quaternion().setFromEuler(originalRotation.current);
      targetQuat.copy(originalQuat);
    }

		mesh.quaternion.slerp(targetQuat, 0.05);

  });

  function handleAlbumClick() {
    if (!album || !displaySelected) return;

    if (!album.userData.savedWorld) {
      album.userData.savedWorld = {
        position: album.getWorldPosition(new THREE.Vector3()),
        rotation: album.getWorldQuaternion(new THREE.Quaternion()),
        parent: album.parent
      };

      scene.attach(album);
			gsap.to(album.position, {
				duration: 0.75,
				ease: 'power1.inOut',
				x: -.25,
				y: 1.25,
				z: -2.5
			});
			selected.current = true;
    } else {
      putBackAlbum(album)
    }
  }

	function putBackAlbum() {
		if (album.userData.savedWorld) {
			const { position, rotation, parent } = album.userData.savedWorld;

			parent.attach(album);
			const originalPosition = album.parent.worldToLocal(position.clone());

			gsap.to(album.position, {
				duration: 0.75,
				ease: 'power1.inOut',
				x: originalPosition.x,
				y: originalPosition.y,
				z: originalPosition.z
			});

			gsap.to(album.rotation, {
				duration: 0.75,
				ease: 'power1.inOut',
				x: rotation.x,
				y: rotation.y,
				z: rotation.z
			});

			delete album.userData.savedWorld;
			selected.current = false;
		}
	}

	useEffect(() => {
		putBackAlbum();
	}, [displaySelected]);

  return (
    <primitive
      object={album}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      onClick={(e) => { e.stopPropagation(); setDisplaySelected(true); handleAlbumClick(); }}
    />
  );
}