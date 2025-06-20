import { getPessoa } from './DataBase.js';

async function exibirPessoas() {
  const container = document.getElementById("lista-doadores");
  container.innerHTML = ""; 

  const lista = await getPessoa("Doador"); // ou "Donatário"
  console.log(lista); // array com pessoas filtradas

  if (!lista || lista.length === 0) {
    container.innerHTML = "<p>Nenhum doador encontrado.</p>";
    return;
  }

  lista.forEach(pessoa => {
    const div = document.createElement("div");
    div.className = "card_doador";
    div.innerHTML = `
      <p><strong>${pessoa.nome}</strong></p>
      <p>${pessoa.data}</p>
    `;
    container.appendChild(div);
  });
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', exibirPessoas);
