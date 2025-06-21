// busca.js
export function configurarBusca({ inputSelector = '#search', formSelector = '.div_busca', aoBuscar }) {
    const form = document.querySelector(formSelector);
    const input = document.querySelector(inputSelector);

    if (!form || !input || typeof aoBuscar !== 'function') {
        console.warn('Busca não configurada corretamente.');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const termo = input.value.trim().toLowerCase();
        await aoBuscar(termo); // função personalizada para a lista atual
    });
}
