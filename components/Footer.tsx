
/**
 * Componente de Rodapé (Footer).
 * Responsável por exibir os direitos de autor e o link de redirecionamento.
 */
export default function Footer() {
    // O JavaScript captura automaticamente o ano atual do sistema.
    // Assim, o seu copyright nunca ficará desatualizado.
    const anoAtual = new Date().getFullYear();

    return (
        // z-10 garante que o footer fica acima das partículas.
        // border-t cria a linha divisória com o resto do site.
        <footer className="relative z-10 w-full border-t border-[#00ffcc]/20 bg-[#030308] py-8 text-center font-mono text-sm text-gray-400">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-2 px-6">

                {/* Ícone ou detalhe estético Cyberpunk */}
                <div className="mb-2 flex gap-1">
                    <span className="h-1 w-8 bg-[#00ffcc]/40"></span>
                    <span className="h-1 w-2 bg-[#ff0055]/60"></span>
                </div>

                <p>
                    &copy; {anoAtual} FERGUSRJ21 Todos os direitos reservados.
                </p>

                <p>
                    Desenvolvido por{" "}
                    {/* 
            
          */}
                    <a
                        href="https://fergusonrails.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#00ffcc] transition-all duration-300 hover:text-[#ff0055] hover:drop-shadow-[0_0_8px_rgba(255,0,85,0.8)]"
                    >
                        Fergus
                    </a>
                </p>
            </div>
        </footer>
    );
}