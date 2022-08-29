// Preparação
const $canvas = document.getElementById('canvas');
let users = {};
let user = undefined;

// Renderizando Usuários
function renderUsers() {
  $canvas.innerHTML = `
  ${Object.keys(users).map((userId) => {
    const user = users[userId]
    return `
        <div class="player" 
        style="
        top: ${user.y || 0}px;
        left: ${user.x || 0}px;
        ">
          ${user.name}
        </div>
      `;
  }).join('')}
  `;
}
renderUsers();
