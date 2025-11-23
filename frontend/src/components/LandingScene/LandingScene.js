import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Preload, Html, Text } from "@react-three/drei";
import RecordPlayerModel from "../../assets/record-player-copy.glb";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import TitleFont from "../../assets/Inter/static/Inter_18pt-ExtraLight.ttf"
import myEnvironment from "../../assets/forest.exr";
import "./LandingScene.css";
import gsap from 'gsap';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Perf } from 'r3f-perf';
gsap.registerPlugin(ScrollTrigger);

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
			if (child.name === "WhiteBackdrop") {
				animatedParts["Backdrop"] = child.clone();
				child.visible = false;
			}

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

function CameraController({ controlsRef, playerSelected, diskTextRef, homeRef }) {
  const { camera } = useThree();

	const scrollRef = useRef(null);
	const introDone = useRef(false);

	const prevCameraPosition = useRef({ x: 3, y: 1.5, z: -3 });
  const prevTargetPosition = useRef({ x: 0, y: 1.25, z: 0 });

	useEffect(() => {
		return () => {
			if (scrollRef.current) {
				scrollRef.current.kill();
				scrollRef.current = null;
			}
		}
	}, []);

  useEffect(() => {

		const tl = gsap.timeline();
		
		if (scrollRef.current) {
			scrollRef.current.disable(false);
		}
		if (playerSelected) {
			prevCameraPosition.current.x = camera.position.x;
      prevCameraPosition.current.y = camera.position.y;
      prevCameraPosition.current.z = camera.position.z;
      
      prevTargetPosition.current.x = controlsRef.current.target.x;
      prevTargetPosition.current.y = controlsRef.current.target.y;
      prevTargetPosition.current.z = controlsRef.current.target.z;
			gsap.set(diskTextRef.current, 
				{
					display: 'block',
				})
			tl.to(camera.position, {
				x: 1,
				y: 1.5,
				z: -.5,
				duration: 1.5,
				ease: 'power2.out',
			})
			.to(controlsRef.current.target, {
				x: 0,
				y: 0.5,
				z: 0,
				duration: 1.5,
				ease: 'power2.out',
			}, 0)
			.to(diskTextRef.current, 
				{
					opacity: 1,
					duration: 0.5,
					ease: 'power2.out',
				}, 1);
		}
		else {
			const targetDuration = introDone.current ? 1.5 : 3;
			tl.to(camera.position, {
        x: prevCameraPosition.current.x,
        y: prevCameraPosition.current.y,
        z: prevCameraPosition.current.z, 
        duration: targetDuration,
        ease: 'power2.out',
      })
      .to(controlsRef.current.target, {
        x: prevTargetPosition.current.x,
        y: prevTargetPosition.current.y,
        z: prevTargetPosition.current.z,
        duration: targetDuration,
        ease: 'power2.out',
        onComplete: () => {
          if (!introDone.current) {
            createScrollAnimation(camera);
          }
          introDone.current = true;
          if (scrollRef.current) {
            scrollRef.current.enable();
          }
        }
      }, 0)
			.to(diskTextRef.current, 
				{
					opacity: 0,
					duration: 0.5,
					ease: 'power1.out',
					onComplete: () => {
						diskTextRef.current.style.display = 'none';
					}
				}, 0);
				
		}

		return () => {
			if (tl) tl.kill();
		}

  }, [playerSelected]);

	function createScrollAnimation (camera) {
		scrollRef.current = gsap.fromTo(camera.position, 
      { 
				x: 3,
				y: 1.5,
				z: -3,
			}, 
      {
        x: 6,
				y: 1.5,
				z: -6,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
        overwrite: true
      }
    ).scrollTrigger;
	}

  return null;
}


export default function LandingScene({ homeRef }) {
	const controlsRef = useRef();

	const [fontSize, setFontSize] = useState(getFontSize());

	const [animatedParts, setAnimatedParts] = useState({});
	const diskTextRef = useRef(null);

	const [playerSelected, setPlayerSelected] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [side, setSide] = useState(false);

	function getFontSize() {
		return window.innerWidth * 0.002;
	}

	useEffect(() => {
		if (animatedParts["Arm"] && animatedParts["Needle"] && animatedParts["RecordDisk"]) {
			gsap.set(animatedParts["Needle"].rotation, {
				x: Math.PI / 7,
				y: .1,
				z: .4,
				duration: 0.5,
				ease: 'power1.inOut',
			});

			gsap.set(animatedParts["Arm"].rotation, {
				y: Math.PI / 4,
				duration: 1,
				ease: 'power1.inOut',
			});
		}

		const handleResize = () => {
      setFontSize(getFontSize());
    };
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [animatedParts["Arm"], animatedParts["Needle"]]);

	useEffect(() => {
		if (animatedParts["RecordDisk"]) {
			if (playerSelected) {
				gsap.killTweensOf(animatedParts["RecordDisk"].position);
				gsap.to(animatedParts["RecordDisk"].position,
					{
						y:.66,
						duration: 0.5,
						ease: 'power1.out'
					}
				)
			}
			else if (!playerSelected && !playing){
				gsap.fromTo(animatedParts["RecordDisk"].position,
					{
						y: .66,
					},
					{
						y: .74,
						duration: 1.25,
						ease: 'power1.out',
						repeat: -1,
						yoyo: true,
						overwrite: true
					}
				);
			}
		}

	}, [playerSelected, animatedParts["RecordDisk"]]);

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
					y: animatedParts["RecordDisk"].rotation.y + (side ? (2 * Math.PI) : -2 * Math.PI),
					duration: 5,
					ease: 'none',
					repeat: -1
				}, 0);
			}
			else if (playerSelected) {
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
			if (!side && !playing && playerSelected) {
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
			else if (side && !playing && playerSelected) {
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
		}

		return () => { if (tl) tl.kill(); };
	}, [side, animatedParts["RecordDisk"]]);

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
      camera={{ position: [3, 32, -3], fov: 50 }}
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
			<Suspense fallback={<Html position={[3,32,-3]}><LoadingScreen /></Html>}>
				<Environment 
					preset="apartment"
					background={false}
					blur={0} 
					environmentIntensity={1}
				/>
				
				<ambientLight intensity={0.1} />
				<pointLight 
					position={[-1, 5, -4]} 
					intensity={75}
					distance={50}
					decay={2}
					castShadow
					shadow-mapSize-width={1024}     // Higher resolution for better detail
  				shadow-mapSize-height={1024}
					shadow-bias={-0.001}
				/>

				<Text
					position={[-8, 1.5, 8]}
					rotation-y={(3 * Math.PI) / 4}
					fontSize={fontSize}
					color="#000000"
					material-toneMapped={false}
					letterSpacing={0.1}
					font={TitleFont}
				>
					SEAN CHENG
				</Text>

				<Html 
					position={[-.25, .5, 1.5]} 
					rotation={[0, 0, 0]}
					center
					visible={false}
					raycast={() => {}}
				>
					<div className="frosted-panel" ref={diskTextRef}>
						<h1 className="panel-title">Your Dynamic Title</h1>
						<p className="panel-content">
							This text is rendered using standard CSS and HTML. The container size will automatically adjust to fit this content unless a fixed width/height is set in the CSS.
						</p>
					</div>
				</Html>
				
				<Models url={RecordPlayerModel} setAnimatedParts={setAnimatedParts}/>
				{animatedParts["RecordDisk"] && <primitive object={animatedParts["RecordDisk"]} onClick={(e) => {e.stopPropagation(); selectDisk()}}/>}
				{animatedParts["Arm"] && <primitive object={animatedParts["Arm"]} onClick={(e) => {e.stopPropagation(); if(playerSelected) setPlaying(!playing)}}/>}
				{animatedParts["Lever"] && <primitive object={animatedParts["Lever"]} onClick={(e) => {e.stopPropagation(); spinLever()}}/>}
				{animatedParts["Backdrop"] && <primitive object={animatedParts["Backdrop"]} onClick={(e) => {e.stopPropagation(); setPlayerSelected(false)}}/>}

				<OrbitControls 
					ref={controlsRef}
					target={[-8, 32, 8]}
					enableDamping
					dampingFactor={0.1}
					enablePan={false}
					enableZoom={false}
					enableRotate={false}
				/>
				<CameraController controlsRef={controlsRef} playerSelected={playerSelected} diskTextRef={diskTextRef} homeRef={homeRef}/>

				
				
				
				<Preload all/>
			</Suspense>
    </Canvas>
  );
}