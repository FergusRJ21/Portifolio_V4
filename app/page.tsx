"use client";

import { motion } from "framer-motion";
import AboutSection from "../components/AboutSection";
import ContactTerminal from "../components/ContactTerminal";
import Footer from "../components/Footer"; // 1. Importação do novo componente
import ParticlesBackground from "../components/ParticlesBackground";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  return (
    <main className="cyber-scanlines relative w-full text-white">

      <ParticlesBackground />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <div className="inline-block border border-[#00ffcc]/40 bg-[#00ffcc]/10 px-4 py-1 font-mono text-xs tracking-widest text-[#00ffcc]">
            SYSTEM_STATUS: ONLINE // ALL_SYSTEMS_OPERATIONAL
          </div>

          <h1 className="font-mono text-5xl font-black tracking-widest text-[#00ffcc] sm:text-7xl drop-shadow-[0_0_25px_rgba(0,255,204,0.7)]">
            PORTFÓLIO_v4
          </h1>

          <p className="font-mono text-lg text-gray-400 sm:text-xl">
            [Role a página para inicializar a leitura de dados]
          </p>
        </motion.div>
      </section>

      <AboutSection />

      <ProjectsSection />

      <ContactTerminal />

      {/* 2. Inserção do Rodapé no final da página */}
      <Footer />

    </main>
  );
}