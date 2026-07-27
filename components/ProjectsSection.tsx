// components/ProjectsSection.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface IProject {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    status: string;
}

const projectsData: IProject[] = [
    {
        id: "01",
        title: "SISTEMA_ORION",
        description: "Plataforma cibernética de visualização de dados em tempo real utilizando WebGL e renderização em servidor.",
        techStack: ["Next.js", "Three.js", "TypeScript"],
        status: "DEPLOYED",
    },
    {
        id: "02",
        title: "NEURAL_NET_UI",
        description: "Interface administrativa futurista baseada em modelos de inteligência artificial e grafos interativos.",
        techStack: ["React", "D3.js", "Tailwind CSS"],
        status: "ONLINE",
    },
    {
        id: "03",
        title: "CYBER_COMMERCE",
        description: "Plataforma e-commerce headless ultra-rápida com arquitetura de microsserviços e segurança encriptada.",
        techStack: ["Next.js", "GraphQL", "Node.js"],
        status: "STABLE",
    },
];

const ProjectCard = ({ project }: { project: IProject }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Estado para verificar se o hardware suporta "hover" (ratos vs telas de toque)
    const [isHoverableDevice, setIsHoverableDevice] = useState(false);

    // Executado apenas no cliente (Navegador) para evitar erros de hidratação no Next.js
    useEffect(() => {
        // Avalia se o dispositivo tem um ponteiro fino (rato/trackpad)
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        setIsHoverableDevice(canHover);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Se for mobile, não executa a matemática pesada
        if (!cardRef.current || !isHoverableDevice) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        if (!isHoverableDevice) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // Oculta a perspetiva se for mobile para poupar cálculos no DOM
            style={{ perspective: isHoverableDevice ? 1000 : 'none' }}
            className="relative z-10 h-full w-full cursor-crosshair"
        >
            <motion.div
                style={{
                    // Aplica os eixos de rotação X e Y apenas se for um dispositivo Desktop
                    rotateX: isHoverableDevice ? rotateX : 0,
                    rotateY: isHoverableDevice ? rotateY : 0,
                    transformStyle: "preserve-3d"
                }}
                // Reduzimos o padding no mobile (p-5) e mantemos no desktop (md:p-6) para caber melhor no ecrã
                className="cyber-tile relative flex h-[340px] w-full flex-col justify-between border border-[#00ffcc]/30 bg-[#05050a]/85 p-5 md:p-6 backdrop-blur-md transition-all hover:border-[#ff0055] hover:shadow-[0_0_25px_rgba(255,0,85,0.3)]"
            >
                <span className="absolute right-4 top-2 font-mono text-5xl font-black text-white/5 pointer-events-none">
                    #{project.id}
                </span>

                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#ff0055]">
              // PROJETO_{project.id}
                        </span>
                        <span className="rounded bg-[#00ffcc]/10 px-2 py-0.5 font-mono text-[10px] text-[#00ffcc] border border-[#00ffcc]/30">
                            {project.status}
                        </span>
                    </div>

                    {/* Ajuste de tipografia: letras menores em mobile (text-lg) e maiores em desktop (md:text-xl) */}
                    <h3 className="mb-3 font-mono text-lg md:text-xl font-black tracking-wider text-white">
                        {project.title}
                    </h3>
                    <p className="font-mono text-[11px] md:text-xs leading-relaxed text-gray-400">
                        {project.description}
                    </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-800 pt-4">
                    {project.techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-black/60 px-2 py-1 font-mono text-[10px] md:text-[11px] text-[#f3e600] border border-[#f3e600]/30"
                        >
                            #{tech}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function ProjectsSection() {
    return (
        // Adicionámos py-10 no mobile e py-20 no desktop para evitar rolagem excessiva e vazia no telemóvel
        <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 md:px-10 py-10 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-10 md:mb-14 w-full max-w-6xl text-left"
            >
                <h2 className="font-mono text-2xl md:text-4xl font-black tracking-widest text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.4)]">
                    &gt; BASE_DE_PROJETOS //
                </h2>
                <div className="mt-2 h-[2px] w-full bg-gradient-to-r from-[#ff0055] via-[#00ffcc] to-transparent" />
            </motion.div>

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}