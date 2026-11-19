'use client';

import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, WifiOff } from 'lucide-react';
import { useOnlineStatus, usePWAInstall } from '../../lib/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'hero' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'hero',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // Suppress install prompt when already running in standalone mode
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setShowInstallGuide(true);
  };

  const buttonClasses =
    variant === 'compact'
      ? 'inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-950 border border-zinc-800 hover:border-blue-500/70 transition-colors whitespace-nowrap shrink-0 cursor-pointer'
      : 'inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3.5 rounded-xl text-sm font-semibold text-zinc-100 backdrop-blur-md bg-zinc-950/75 border border-zinc-800 hover:border-blue-500/70 transition-colors whitespace-nowrap cursor-pointer';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        data-testid={`pwa-install-btn-${variant}`}
        aria-label="Instalar App do JM Barberclub na tela inicial"
        className={buttonClasses}
      >
        {variant === 'compact' ? (
          <Download className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
        ) : (
          <Smartphone className="w-4 h-4 text-blue-500" aria-hidden="true" />
        )}
        <span>{variant === 'compact' ? 'App' : 'Instalar App (1 Toque)'}</span>
      </button>

      {showInstallGuide && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-guide-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl text-left">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-blue-500" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    id="pwa-guide-title"
                    className="font-display text-base font-bold text-white"
                  >
                    Instalar App JM Barberclub
                  </h3>
                  <p className="text-xs font-light text-zinc-400 tracking-wide">
                    Agende em 1 toque direto da tela inicial
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                aria-label="Fechar instruções de instalação"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 border border-blue-500/40 text-blue-400 font-mono font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>
                    Toque no botão <strong className="text-white">Compartilhar</strong>{' '}
                    <Share className="inline w-3.5 h-3.5 text-blue-400 mx-0.5" aria-hidden="true" />{' '}
                    na barra do Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 border border-blue-500/40 text-blue-400 font-mono font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>
                    Role para baixo e toque em{' '}
                    <strong className="text-white">Adicionar à Tela de Início</strong>{' '}
                    <PlusSquare className="inline w-3.5 h-3.5 text-red-400 mx-0.5" aria-hidden="true" />.
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 border border-blue-500/40 text-blue-400 font-mono font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>
                    Abra o menu do navegador (<strong className="text-white">⋮</strong> ou ícone de instalação na barra de endereço).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 border border-blue-500/40 text-blue-400 font-mono font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>
                    Selecione <strong className="text-white">Instalar aplicativo</strong> ou{' '}
                    <strong className="text-white">Adicionar à tela inicial</strong>.
                  </span>
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowInstallGuide(false)}
              className="mt-5 w-full min-h-[42px] rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all duration-300 cursor-pointer"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-4 z-50 flex items-center gap-2 rounded-xl bg-zinc-950 border border-red-600/60 px-3.5 py-2 text-xs font-medium text-zinc-200 shadow-2xl"
    >
      <WifiOff className="w-3.5 h-3.5 text-red-500 shrink-0" aria-hidden="true" />
      <span>Modo offline — exibindo catálogo em cache</span>
    </div>
  );
};

export default PWAInstallButton;
