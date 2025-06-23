import { getStorage, updateData, deleteData } from './DataBase.js';
import { configurarBusca } from './busca.js';

document.addEventListener('DOMContentLoaded', async () => {
    const divCardSection = document.querySelector('.div_card');

    async function renderStorageItems(termo = '') {
        divCardSection.innerHTML = '';

        const storageItems = await getStorage();

        const filtrados = storageItems.filter(item =>
            item.nome?.toLowerCase().includes(termo) ||
            item.marca?.toLowerCase().includes(termo) ||
            item.desc?.toLowerCase().includes(termo) ||
            item.data?.toLowerCase().includes(termo)
        );

        if (filtrados.length === 0) {
            divCardSection.innerHTML = '<p>Nenhum item no estoque para exibir.</p>';
            return;
        }

        filtrados.forEach(item => {
            const formBlock = document.createElement('div');
            formBlock.className = 'form_block_geren w-form';

            const form = document.createElement('form');
            form.id = `item-form-${item.id}`;
            form.className = 'form';

            const isSemEstoque = typeof item.quant !== 'number' || item.quant <= 0;
            const quantLabel = isSemEstoque ? "Sem Estoque" : item.quant;

            form.innerHTML = `
                <section class="div1_geren">
                    <section class="div_foto_nome">
                        <img src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" width="48" alt="" class="image">
                        <label class="lab_nome_marca">${item.nome}</label>
                    </section>
                    <section class="div_btn_ed">
                        <input type="button" class="btn_deletar w-button" value="🗑️" data-id="${item.id}">
                        <input type="button" class="btn_editar w-button" value="✏️" data-id="${item.id}">
                    </section>
                </section>
                <section class="div_desc_quant">
                    <label class="lab_desc">${item.desc}</label>
                    <section class="div_quant">
                        <input type="button" class="btn_quant_add w-button" value="+" data-id="${item.id}">
                        <label class="lab_quant">${quantLabel}<br>&zwj;</label>
                        <input type="button" class="btn_quant_sub w-button" value="-" data-id="${item.id}">
                    </section>
                </section>
            `;

            formBlock.appendChild(form);
            divCardSection.appendChild(formBlock);

            // DELETE
            form.querySelector('.btn_deletar').addEventListener('click', async () => {
                if (confirm(`Tem certeza que deseja deletar "${item.nome}"?`)) {
                    await deleteData('Produtos', item.id);
                    await renderStorageItems();
                }
            });

            // EDITAR
            form.querySelector('.btn_editar').addEventListener('click', () => {
                abrirModalEditarProduto(item);
            });

            // AUMENTAR
            form.querySelector('.btn_quant_add').addEventListener('click', async () => {
                const current = (typeof item.quant === 'number' && item.quant >= 0) ? item.quant : 0;
                const newQuant = current + 1;
                await updateData('Produtos', item.id, { quant: newQuant });
                await renderStorageItems();
            });

            // DIMINUIR
            form.querySelector('.btn_quant_sub').addEventListener('click', async () => {
                const current = (typeof item.quant === 'number' && item.quant > 0) ? item.quant : 0;
                if (current > 0) {
                    const newQuant = current - 1;
                    await updateData('Produtos', item.id, { quant: newQuant });
                    await renderStorageItems();
                } else {
                    alert('Quantidade não pode ser menor que zero.');
                }
            });
        });
    }

    // Renderização inicial
    await renderStorageItems();

    // Busca
    configurarBusca({
        aoBuscar: async (termo) => {
            await renderStorageItems(termo);
        }
    });

    // Modal de edição
    document.getElementById("form-editar-produto").addEventListener("submit", async function (e) {
        e.preventDefault();

        const produtoAtualizado = {
            id: document.getElementById('editar-id-produto').value,
            nome: document.getElementById('editar-nome-produto').value,
            marca: document.getElementById('editar-marca').value,
            cod: document.getElementById('editar-codigo').value,
            quant: parseInt(document.getElementById('editar-quantidade').value),
            desc: document.getElementById('editar-descricao').value
        };

        await updateData("Produtos", produtoAtualizado.id, produtoAtualizado);
        fecharModalEditarProduto();
        await renderStorageItems();
    });
});

// Funções do modal
function abrirModalEditarProduto(produto) {
    document.getElementById('editar-id-produto').value = produto.id;
    document.getElementById('editar-nome-produto').value = produto.nome;
    document.getElementById('editar-marca').value = produto.marca;
    document.getElementById('editar-codigo').value = produto.cod;
    document.getElementById('editar-quantidade').value = produto.quant;
    document.getElementById('editar-descricao').value = produto.desc;
    document.getElementById('modal-editar-produto').style.display = 'flex';
}

function fecharModalEditarProduto() {
    document.getElementById('modal-editar-produto').style.display = 'none';
}

window.fecharModalEditarProduto = fecharModalEditarProduto;
