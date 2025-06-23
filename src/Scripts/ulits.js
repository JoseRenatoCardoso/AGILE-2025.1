import { getPessoa } from './DataBase.js';

const params = new URLSearchParams(window.location.search);
const type = params.get('type') || '';

export async function renderPeopleItems(divCardSection, termo = '') {
    divCardSection.innerHTML = '';
    const peopleItems = await getPessoa(type);

    const filtradas = peopleItems.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(termo) ||
        pessoa.data.toLowerCase().includes(termo)
    );

    if (!filtradas || filtradas.length === 0) {
        divCardSection.innerHTML = '<p>Nenhuma pessoa cadastrada.</p>';
        return;
    }

    filtradas.forEach(pessoa => {
        const card = document.createElement('div');
        card.classList.add('div1_geren');

        const dataFormatada = pessoa.data
            ? new Date(pessoa.data).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
            : 'Sem data';

        card.innerHTML = `
            <div class="linha_doador">
                <div class="lb_nome"><strong>${pessoa.nome}</strong></div>
                <div class="lb_data">${dataFormatada}</div>
            </div>
        `;

        divCardSection.appendChild(card);
    });
}
