import { createData } from './DataBase.js';
import { renderPeopleItems } from './ulits.js'; // <- importa função reutilizável

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    const submitButton = form.querySelector('.btn_submit');
    const divCardSection = document.querySelector('.div_card'); // <- usada na atualização

    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'desconhecido';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (submitButton.disabled) return;

        const nome = document.getElementById('name').value.trim();
        const data = document.getElementById('data').value.trim();

        if (!nome) {
            alert('Por favor, preencha o nome do item.');
            return;
        }

        if (!data) {
            alert('Por favor, selecione uma data válida.');
            return;
        }

        const novoPes = {
            nome,
            data,
            tipo: type,
        };

        try {
            submitButton.disabled = true;
            submitButton.value = '...';

            await createData('Pessoas', novoPes);
            alert('✅ Pessoa adicionada com sucesso!');

            form.reset();

            // Atualiza a lista de doadores sem recarregar
            await renderPeopleItems(divCardSection);
        } catch (error) {
            console.error('Erro ao adicionar:', error);
            alert('❌ Ocorreu um erro. Veja o console.');
        } finally {
            submitButton.value = '+';
            submitButton.disabled = false;
        }
    });
});
