"use client";

import { motion } from "framer-motion";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

interface ITerminalLine {
    id: number;
    type: "system" | "user" | "error";
    text: string;
}

interface IContactFormData {
    name: string;
    email: string;
    message: string;
}

export default function ContactTerminal() {
    const [formData, setFormData] = useState<IContactFormData>({ name: "", email: "", message: "" });
    const [step, setStep] = useState<number>(0);
    const [currentInput, setCurrentInput] = useState<string>("");

    // O nosso histórico começa exatamente com 4 itens
    const [history, setHistory] = useState<ITerminalLine[]>([
        { id: 1, type: "system", text: "[SYSTEM_BOOT]: NÓ_DE_COMUNICAÇÃO_CYBEROS_v9.1" },
        { id: 2, type: "system", text: "[SEGURANÇA]: CRIPTOGRAFIA DE 256-BITS ATIVA" },
        { id: 3, type: "system", text: "--------------------------------------------------------" },
        { id: 4, type: "system", text: "Identifique-se para iniciar transmissão. Qual é o seu nome?" }
    ]);

    const endOfTerminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // EFEITO CORRIGIDO: Só rola a tela se o utilizador adicionou novas linhas
    useEffect(() => {
        if (history.length > 4) {
            // block: "nearest" ajuda a rolar apenas o conteúdo interno sem puxar a janela toda do navegador
            endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [history]);

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && currentInput.trim() !== "") {
            const input = currentInput.trim();
            const newHistory = [...history, { id: Date.now(), type: "user", text: `operador@cyberos:~$ ${input}` } as ITerminalLine];

            if (step === 0) {
                setFormData({ ...formData, name: input });
                newHistory.push({ id: Date.now() + 1, type: "system", text: `> Operador registado: [${input}]. Informe o seu e-mail de contacto:` });
                setStep(1);
            } else if (step === 1) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input)) {
                    newHistory.push({ id: Date.now() + 1, type: "error", text: "> [ERRO_DE_VALIDAÇÃO]: E-mail inválido. Digite um e-mail válido:" });
                } else {
                    setFormData({ ...formData, email: input });
                    newHistory.push({ id: Date.now() + 1, type: "system", text: "> E-mail autenticado. Digite a sua mensagem abaixo:" });
                    setStep(2);
                }
            } else if (step === 2) {
                newHistory.push({ id: Date.now() + 1, type: "system", text: "> ENCRIPTANDO E TRANSMITINDO PACOTE PARA O SERVIDOR CENTRAL..." });
                setHistory(newHistory);
                setCurrentInput("");
                setStep(3);

                try {
                    // LEMBRETE: Mantenha o seu URL real do Formspree aqui
                    const response = await fetch("COLE_SEU_URL_DO_FORMSPREE_AQUI", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            nome: formData.name,
                            email: formData.email,
                            mensagem: input,
                        }),
                    });

                    if (response.ok) {
                        setHistory(prev => [
                            ...prev,
                            { id: Date.now() + 2, type: "system", text: "> [SUCESSO]: Transmissão concluída! A tua mensagem foi recebida." }
                        ]);
                    } else {
                        setHistory(prev => [
                            ...prev,
                            { id: Date.now() + 2, type: "error", text: "> [FALHA_NA_TRANSMISSÃO]: O servidor rejeitou o pacote de dados." }
                        ]);
                        setStep(2);
                    }
                } catch (error) {
                    setHistory(prev => [
                        ...prev,
                        { id: Date.now() + 2, type: "error", text: "> [ERRO_CRÍTICO]: Ligação à rede interrompida. Verifica a tua conexão." }
                    ]);
                    setStep(2);
                }
                return;
            }

            setHistory(newHistory);
            setCurrentInput("");
        }
    };

    const focarInput = () => {
        if (step < 3) inputRef.current?.focus();
    };

    return (
        <section className="relative z-10 flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full max-w-4xl"
            >
                <div className="cyber-tile overflow-hidden border border-[#00ffcc]/40 bg-black/90 shadow-[0_0_35px_rgba(0,255,204,0.15)]">

                    <div className="flex items-center justify-between border-b border-gray-800 bg-[#0a0a12] px-4 py-2.5 font-mono text-xs">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-[#ff0055]" />
                            <span className="h-3 w-3 rounded-full bg-[#f3e600]" />
                            <span className="h-3 w-3 rounded-full bg-[#00ffcc]" />
                        </div>
                        <div className="text-gray-400">root@cyberos-terminal: /bin/bash</div>
                        <div className="text-[#00ffcc] font-bold">[ONLINE]</div>
                    </div>

                    <div
                        onClick={focarInput}
                        className="h-[420px] w-full cursor-text overflow-y-auto p-6 font-mono text-sm leading-relaxed text-[#00FF41]"
                    >
                        <div className="flex flex-col gap-1.5">
                            {history.map((line) => (
                                <span
                                    key={line.id}
                                    className={line.type === "error" ? "text-[#ff0055] font-bold" : line.type === "system" ? "text-gray-300" : "text-[#00FF41] font-bold"}
                                >
                                    {line.text}
                                </span>
                            ))}
                        </div>

                        {step < 3 && (
                            <div className="mt-3 flex items-center">
                                <span className="mr-2 text-[#00FF41] font-bold">operador@cyberos:~$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    // O ATRIBUTO 'autoFocus' FOI REMOVIDO DESTA LINHA
                                    className="flex-1 bg-transparent text-[#00FF41] outline-none caret-[#00FF41]"
                                    spellCheck={false}
                                />
                            </div>
                        )}
                        <div ref={endOfTerminalRef} />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}