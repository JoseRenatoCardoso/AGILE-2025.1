// scripts/Create.js
import { createData } from './DataBase.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    const submitButton = form.querySelector('.btn_adicionar');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Impede múltiplos cliques
        if (submitButton.disabled) return;

        // Coleta e limpa os valores
        const nome = document.getElementById('name').value.trim();
        const marca = document.getElementById('marca').value.trim();
        const cod = document.getElementById('cod').value.trim();
        const quant = parseInt(document.getElementById('quant').value.trim());
        const desc = document.getElementById('desc').value.trim();

        // Validação com feedback
        if (!nome) {
            alert('Por favor, preencha o nome do item.');
            return;
        }

        if (isNaN(quant) || quant < 0) {
            alert('Digite uma quantidade válida (número ≥ 0).');
            return;
        }

        // Monta o novo item
        const novoItem = {
            nome,
            marca,
            cod,
            quant,
            desc
        };

        try {
            // Indica carregamento
            submitButton.value = 'Adicionando...';
            submitButton.disabled = true;

            await createData('Produtos', novoItem);

            alert('✅ Item adicionado com sucesso!');

            form.reset(); // Limpa o formulário

            // Redireciona para a tela de estoque (ajuste o caminho conforme necessário)
            window.location.href = '../gerenciamento_estoque/gern.html';

        } catch (error) {
            console.error('Erro ao adicionar:', error);
            alert('❌ Ocorreu um erro. Veja o console.');
        } finally {
            // Restaura botão
            submitButton.value = 'ADICIONAR';
            submitButton.disabled = false;
        }
    });
});
