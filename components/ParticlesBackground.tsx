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
            fpsLimit: 120, // Limite para desktops
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                },
                modes: {
                    grab: { distance: 180, links: { opacity: 0.8 } },
                },
            },
            particles: {
                color: { value: ["#00ffcc", "#ff0055"] },
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
                    value: 70, // Quantidade para desktop
                },
                opacity: { value: 0.6 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,

            // CONFIGURAÇÃO DE OTIMIZAÇÃO MOBILE (NOVO)
            // Avalia a largura da tela em tempo real e sobrescreve as configurações acima
            responsive: [
                {
                    maxWidth: 768, // Se a tela for menor ou igual a 768px (Smartphones)
                    options: {
                        particles: {
                            number: {
                                value: 25, // Reduz drasticamente as partículas para poupar GPU
                            },
                        },
                        fpsLimit: 60, // Corta a taxa de atualização para poupar bateria
                    },
                },
            ],
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