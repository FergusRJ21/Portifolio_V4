// components/ParticlesBackground.tsx
"use client";

import { type ISourceOptions, MoveDirection, OutMode, tsParticles } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

export default function ParticlesBackground() {
    const [isEngineReady, setIsEngineReady] = useState(false);

    useEffect(() => {
        loadSlim(tsParticles).then(() => {
            setIsEngineReady(true);
        });
    }, []);

    const particlesOptions: ISourceOptions = useMemo(
        () => ({
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" }, // Cria conexões com o mouse
                },
                modes: {
                    grab: { distance: 180, links: { opacity: 0.8 } },
                },
            },
            particles: {
                color: { value: ["#00ffcc", "#ff0055"] }, // Cores Cyberpunk: Ciano e Rosa Néon
                links: {
                    color: "#00ffcc",
                    distance: 140,
                    enable: true,
                    opacity: 0.25,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: { default: OutMode.bounce },
                    speed: 1.2,
                },
                number: {
                    density: { enable: true },
                    value: 70,
                },
                opacity: { value: 0.6 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        }),
        [],
    );

    if (!isEngineReady) return <></>;

    return (
        <Particles
            id="fundo-particulas"
            options={particlesOptions}
            className="fixed inset-0 -z-10"
        />
    );
}