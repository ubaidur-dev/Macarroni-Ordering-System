const menuData = [
    { id: 1, name: "Penne Arrabiata", cat: "pasta", price: 12.00, img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500" },
    { id: 2, name: "Lasagna Clásica", cat: "pasta", price: 16.00, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500" },
    { id: 3, name: "Fettuccine Alfredo", cat: "pasta", price: 14.50, img: "https://images.unsplash.com/photo-1645112481338-3560e7745231?w=500" },
    { id: 4, name: "Spaghetti Carbonara", cat: "pasta", price: 15.00, img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500" },
    { id: 5, name: "Ravioli Ricotta", cat: "pasta", price: 17.50, img: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=500" },
    { id: 6, name: "Gnocchi de Papa", cat: "pasta", price: 13.00, img: "https://images.unsplash.com/photo-1595111101533-41f6e709e63e?w=500" },
    { id: 7, name: "Pasta al Pesto", cat: "pasta", price: 11.50, img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500" },
    { id: 8, name: "Pizza Pepperoni", cat: "pizza", price: 15.50, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { id: 9, name: "Pizza Margarita", cat: "pizza", price: 13.00, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=500" },
    { id: 10, name: "Pizza Cuatro Quesos", cat: "pizza", price: 18.00, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 11, name: "Pizza Prosciutto", cat: "pizza", price: 19.50, img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500" },
    { id: 12, name: "Pizza Vegetariana", cat: "pizza", price: 14.00, img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500" },
    { id: 13, name: "Pizza Calzone", cat: "pizza", price: 16.50, img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500" },
    { id: 14, name: "Pizza Trufada", cat: "pizza", price: 22.00, img: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=500" },
    { id: 15, name: "Bruschetta Italiana", cat: "pasta", price: 8.50, img: "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500" },
    { id: 16, name: "Ensalada Caprese", cat: "pasta", price: 10.00, img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=500" },
    { id: 17, name: "Risotto Funghi", cat: "pasta", price: 20.00, img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500" },
    { id: 18, name: "Tiramisú Casero", cat: "pasta", price: 9.00, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500" },
    { id: 19, name: "Focaccia de Ajo", cat: "pizza", price: 7.00, img: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?w=500" },
    { id: 20, name: "Cannoli Siciliani", cat: "pasta", price: 11.00, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500" },
    { id: 21, name: "Pan de Ajo Supremo", cat: "pizza", price: 6.50, img: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=500" }
];

let cart = [];
let user = JSON.parse(localStorage.getItem('m_user')) || null;

window.onload = () => { filterMenu('all'); updateNav(); };

function openAuth(type) {
    document.getElementById('auth-modal').style.display = 'flex';
    document.getElementById('login-box').style.display = type === 'login' ? 'block' : 'none';
    document.getElementById('reg-box').style.display = type === 'reg' ? 'block' : 'none';
}
function closeAuth() { document.getElementById('auth-modal').style.display = 'none'; }

function doRegister() {
    const n = document.getElementById('r-name').value;
    const e = document.getElementById('r-email').value;
    const p = document.getElementById('r-pass').value;
    if(n && e && p.length >= 6) {
        localStorage.setItem('u_db', JSON.stringify({n, e, p}));
        alert("¡Registro exitoso! Por favor inicia sesión."); openAuth('login');
    } else { alert("Datos inválidos (Contraseña min 6 caracteres)"); }
}

function doLogin() {
    const e = document.getElementById('l-email').value;
    const p = document.getElementById('l-pass').value;
    const db = JSON.parse(localStorage.getItem('u_db'));
    if(db && db.e === e && db.p === p) {
        user = db; localStorage.setItem('m_user', JSON.stringify(user)); location.reload();
    } else { alert("Credenciales incorrectas."); }
}

function updateNav() {
    if(user) {
        document.getElementById('auth-ui').innerHTML = `
            <div class="user-logged">
                <span style="color:var(--gold); font-size:12px; font-weight:700">Hola, ${user.n.split(' ')[0]}</span>
                <button onclick="logout()" class="icon-btn-auth" style="margin-left:10px; font-size:10px;">[Salir]</button>
            </div>`;
    }
}
function logout() { localStorage.removeItem('m_user'); location.reload(); }

// UPDATED: Ab button click par yellow color change hoga
function filterMenu(cat, event) {
    // Active class update logic
    if(event) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
    }

    const grid = document.getElementById('menu-grid');
    grid.innerHTML = "";
    const items = cat === 'all' ? menuData : menuData.filter(i => i.cat === cat);
    items.forEach(p => {
        grid.innerHTML += `
            <div class="menu-card">
                <img src="${p.img}" loading="lazy">
                <h3 style="color:var(--gold); font-size:17px; margin-bottom:10px">${p.name}</h3>
                <p style="margin-bottom:15px; font-weight:bold; font-size:18px;">$${p.price.toFixed(2)}</p>
                <select id="size-${p.id}" class="size-selector">
                    <option value="S">Pequeño (S)</option>
                    <option value="M" selected>Mediano (M)</option>
                    <option value="L">Grande (L)</option>
                </select>
                <button class="btn-gold w-100" onclick="addToCart(${p.id})">Añadir</button>
            </div>`;
    });
}

function addToCart(id) {
    if(!user) { alert("Inicia sesión para pedir."); openAuth('login'); return; }
    const item = menuData.find(i => i.id === id);
    const size = document.getElementById(`size-${id}`).value;
    cart.push({...item, selectedSize: size});
    const cartBtn = document.getElementById('main-cart-btn');
    cartBtn.classList.add('bump');
    setTimeout(() => cartBtn.classList.remove('bump'), 300);
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    const list = document.getElementById('cart-list');
    let total = 0;
    list.innerHTML = cart.map(i => {
        total += i.price;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; border-bottom:1px solid #111; padding-bottom:8px">
            <span>${i.name} (${i.selectedSize})</span><b>$${i.price.toFixed(2)}</b>
        </div>`;
    }).join('');
    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}

function handleCheckout() {
    if(cart.length === 0) { alert("El carrito está vacío."); return; }
    let msg = `*Nuevo Pedido - Maccaroni*\nCliente: ${user.n}\n------------------\n` + 
              cart.map(i => `- ${i.name} (${i.selectedSize}): $${i.price}`).join('\n') + 
              `\n------------------\n*Total: ${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/584241676922?text=${encodeURIComponent(msg)}`);
}