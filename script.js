/* ================================================================
   CONTROLLER PRINCIPAL - BARBEARIA (script.js)
   (Apenas Lógica de Interface e Envio via API Serverless Segura)
================================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ================================================================
       0. RELÓGIO LOCAL (HH:MM, atualizado a cada minuto)
    ================================================================ */
    const clockEl = document.getElementById("localTime");
    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        clockEl.textContent = hh + ":" + mm;
    }
    updateClock();
    setInterval(updateClock, 15000);

    /* ================================================================
       0.1 BRILHO REATIVO AO CURSOR NOS PAINÉIS DE VIDRO (apenas desktop)
    ================================================================ */
    if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
        document.querySelectorAll(".panel-glass").forEach((panel) => {
            panel.addEventListener("pointermove", (e) => {
                const rect = panel.getBoundingClientRect();
                panel.style.setProperty("--mx", (e.clientX - rect.left) + "px");
                panel.style.setProperty("--my", (e.clientY - rect.top) + "px");
            });
        });
    }

    /* ================================================================
       1. ANIMAÇÕES DE SCROLL (REVEAL ON SCROLL)
    ================================================================ */
    const observerOptions = {
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível na tela
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-element");
    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });


    /* ================================================================
       2. CONTROLE DO MODAL DE FEEDBACK 
    ================================================================ */
    const openModalBtn = document.getElementById("open-feedback-modal");
    const closeModalBtn = document.getElementById("close-feedback-modal");
    const modalOverlay = document.getElementById("feedbackModal");

    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden"; 
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove("active");
            document.body.style.overflow = ""; 
        }
    }

    if (openModalBtn) {
        openModalBtn.addEventListener("click", openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", function (event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    /* ================================================================
       3. LÓGICA DE ENVIO DO FORMULÁRIO (VIA ROTA SEGURA DA VERCEL)
    ================================================================ */
    function attachFeedbackEvent() {
        const feedbackForm = document.getElementById("feedbackForm");
        if (!feedbackForm) return;

        feedbackForm.addEventListener("submit", async function (e) {
            e.preventDefault(); 

            const visitorName = document.getElementById("visitorName")?.value || "Anônimo";
            const feedbackMessage = document.getElementById("feedbackMessage").value;
            const clientId = localStorage.getItem("jm_client_id") || null;

            const submitBtn = feedbackForm.querySelector("button[type='submit']") || document.getElementById("submitFeedbackBtn");
            let originalBtnText = "Enviar";

            if (submitBtn) {
                originalBtnText = submitBtn.textContent;
                submitBtn.textContent = "Enviando...";
                submitBtn.disabled = true;
            }

            try {
                // Comunicação com a rota interna da Vercel (/api/feedback)
                // As chaves reais do banco ficam guardadas exclusivamente no servidor da Vercel
                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: clientId,
                        visitor_name: visitorName,
                        message: feedbackMessage
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Erro ao enviar feedback');
                }

                // Pega o container interno do modal para trocar pelo card de sucesso
                const formContainer = feedbackForm.parentElement;
                const originalFormContent = formContainer.innerHTML;

                // Substitui o formulário por uma mensagem de sucesso super limpa
                formContainer.innerHTML = `
                    <div style="text-align: center; padding: 30px 10px; color: #fff;">
                        <div style="font-size: 42px; margin-bottom: 12px;">✨</div>
                        <h3 style="margin-bottom: 10px; font-size: 20px; font-weight: 600;">Obrigado, ${visitorName}!</h3>
                        <p style="color: #aaa; font-size: 14px; margin-bottom: 24px;">Sua mensagem foi enviada com sucesso para nossa equipe.</p>
                        <button type="button" id="closeSuccessModal" style="background: #e50914; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background 0.2s;">Fechar</button>
                    </div>
                `;

                // Ação do botão de fechar da mensagem de sucesso
                document.getElementById("closeSuccessModal").addEventListener("click", function () {
                    closeModal();
                    setTimeout(() => {
                        formContainer.innerHTML = originalFormContent;
                        attachFeedbackEvent();
                    }, 300);
                });

                // Fecha automaticamente o modal após 3.5 segundos
                setTimeout(() => {
                    if (modalOverlay.classList.contains("active")) {
                        closeModal();
                        setTimeout(() => {
                            formContainer.innerHTML = originalFormContent;
                            attachFeedbackEvent();
                        }, 300);
                    }
                }, 3500);

            } catch (error) {
                console.error('Erro ao enviar feedback:', error);
                alert('Não foi possível enviar sua mensagem. Tente novamente mais tarde.');
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // Inicializa o evento do formulário
    attachFeedbackEvent();

});