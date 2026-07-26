// components/AboutSection.tsx

// 'use client' é obrigatório no Next.js ao usar bibliotecas que dependem 
// de interações no navegador, como as animações do framer-motion.
"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        // 'relative z-10' garante que este painel fique sobre o fundo de partículas
        <section className="relative z-10 flex min-h-screen w-full items-center justify-center p-6 md:p-10">

            <motion.div
                // Configurações de animação: o elemento surge da escala 0.9 para 1
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                // Classes Cyberpunk: bordas brilhantes, fundo de vidro escuro e cantos cortados (cyber-tile)
                className="cyber-tile relative mx-auto w-full max-w-4xl border border-[#00ffcc]/40 bg-[#05050a]/80 p-8 md:p-12 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,204,0.15)]"
            >
                {/* Barra superior de status indicando um terminal acadêmico */}
                <div className="mb-6 flex items-center justify-between border-b border-[#00ffcc]/20 pb-3 font-mono text-xs text-gray-400">
                    <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#00ffcc] animate-ping" />
                        SYS_ID: CS_ACADEMIC_PROFILE // CORE_v1.0
                    </span>
                    <span className="text-[#ff0055] font-bold">[UNIVERSITY_ACCESS_GRANTED]</span>
                </div>

                {/* Título Principal */}
                <h2 className="mb-6 font-mono text-3xl font-black tracking-widest text-[#00ffcc] md:text-4xl drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]">
                    &gt; SOBRE_MIM //
                </h2>

                {/* Corpo do texto atualizado para o perfil de Ciência da Computação */}
                <div className="space-y-4 font-mono text-sm leading-relaxed text-gray-300 md:text-base">
                    <p className="text-[#f3e600]">
                        [STATUS: COMPILANDO_CONHECIMENTOS_TEÓRICOS...]
                    </p>
                    <p>
                        Acadêmico de Ciência da Computação movido pela curiosidade de desvendar os princípios fundamentais
                        que unem software e hardware. O meu foco de estudo está na análise de algoritmos complexos, na exploração de
                        estruturas de dados otimizadas e na compreensão profunda da arquitetura de sistemas.
                    </p>
                    <p>
                        Mais do que apenas escrever código, busco entender o "como" e o "porquê" por trás da máquina,
                        transformando a teoria matemática em engenharia de software sólida.
                    </p>
                    <p className="border-l-2 border-[#ff0055] pl-4 italic text-gray-400">
                        "A universidade é o meu campo de testes. A tecnologia é a linguagem com a qual traduzo a teoria em inovação tangível."
                    </p>
                </div>

                {/* Tags de competências acadêmicas estilizadas com cores Cyberpunk */}
                <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
                    <span className="border border-[#00ffcc] bg-[#00ffcc]/10 px-3 py-1 text-[#00ffcc]">
                        ALGORITHM_DESIGN
                    </span>
                    <span className="border border-[#ff0055] bg-[#ff0055]/10 px-3 py-1 text-[#ff0055]">
                        DATA_STRUCTURES
                    </span>
                    <span className="border border-[#f3e600] bg-[#f3e600]/10 px-3 py-1 text-[#f3e600]">
                        SYSTEMS_ARCHITECTURE
                    </span>
                    <span className="border border-purple-500 bg-purple-500/10 px-3 py-1 text-purple-400">
                        THEORETICAL_COMPUTING
                    </span>
                </div>
            </motion.div>

        </section>
    );
}