import { renderPeopleItems } from './ulits.js';

document.addEventListener('DOMContentLoaded', async () => {
    const divCardSection = document.querySelector('.div_card');
    await renderPeopleItems(divCardSection);
});
