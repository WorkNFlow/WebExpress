import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AnimatedModel = ({ fov = 75, camz = 5, scale = 3 }) => {
    const mountRef = useRef(null);
    const [error, setError] = useState(null);
    const [isInView, setIsInView] = useState(true);
    const [currentModel, setCurrentModel] = useState('code');
    const modelRef = useRef(null);
    const rotationRef = useRef(Math.PI / 2); // Initial rotation set to 180 degrees
    const sceneRef = useRef(null);
    const totalRotationRef = useRef(0);
    const isAnimatingRef = useRef(true);

    const loadModel = useCallback((modelName) => {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load(
                `/models/${modelName}.glb`,
                (gltf) => {
                    const model = gltf.scene;

                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0x4c3219,
                                metalness: 0.5,
                                roughness: 0.5,
                            });
                        }
                    });

                    model.scale.set(scale, scale, scale);
                    model.rotation.x = -Math.PI / 2;
                    model.rotation.z = rotationRef.current;

                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);

                    resolve(model);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                reject
            );
        });
    }, [scale]);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            fov,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const animate = () => {
            if (isInView && modelRef.current && isAnimatingRef.current) {
                const rotationSpeed = 0.008; // Reduced speed to half
                rotationRef.current += rotationSpeed;
                totalRotationRef.current += rotationSpeed;

                modelRef.current.rotation.z = rotationRef.current;

                // Check for full rotation (π radians = 180 degrees)
                if (totalRotationRef.current >= Math.PI) {
                    isAnimatingRef.current = false;
                    totalRotationRef.current = 0;

                    // Switch model
                    setCurrentModel(prev => prev === 'code' ? 'we' : 'code');
                }

                renderer.render(scene, camera);
            }
            requestAnimationFrame(animate);
        };

        const initScene = async () => {
            try {
                const model = await loadModel(currentModel);
                modelRef.current = model;
                scene.add(model);
                animate();
            } catch (err) {
                console.error('Error loading model:', err);
                setError('Failed to load 3D model');
            }
        };

        initScene();

        camera.position.z = camz;

        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(mountRef.current);

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [fov, camz, loadModel]);

    useEffect(() => {
        const switchModel = async () => {
            if (!sceneRef.current || isAnimatingRef.current) return;

            try {
                const newModel = await loadModel(currentModel);

                if (modelRef.current) {
                    sceneRef.current.remove(modelRef.current);
                }

                modelRef.current = newModel;
                sceneRef.current.add(newModel);

                rotationRef.current = Math.PI / 2;
                isAnimatingRef.current = true;
            } catch (err) {
                console.error('Error switching model:', err);
                setError('Failed to switch 3D model');
            }
        };

        switchModel();
    }, [currentModel, loadModel]);

    return (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {error ? (
                <div className="absolute inset-0 flex items-center justify-center text-red-500">
                    {error}
                </div>
            ) : (
                <div
                    ref={mountRef}
                    className="absolute inset-0 w-full h-full"
                />
            )}
        </div>
    );
};

export default AnimatedModel;