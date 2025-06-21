import { renderPeopleItems } from './ulits.js';
import { configurarBusca } from './busca.js';

document.addEventListener('DOMContentLoaded', async () => {
    const divCardSection = document.querySelector('.div_card');

    // renderiza tudo ao carregar
    await renderPeopleItems(divCardSection);

    // configura a busca
    configurarBusca({
        aoBuscar: async (termo) => {
            await renderPeopleItems(divCardSection, termo);
        }
    });
});
