document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const cartList = document.getElementById('cart-list');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartSection = document.getElementById('cart-items');
  const cartButton = document.getElementById('cart');
  const checkoutButton = document.getElementById('checkout');
  const menuToggle = document.getElementById('menu-toggle');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Carregar livros
  books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    const imgSrc = window.innerWidth <= 600 && book.imageMobile ? book.imageMobile : book.image;
    bookDiv.innerHTML = `
      <img src="${imgSrc}" alt="${book.title}" loading="lazy">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>R$ ${book.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${book.id}" data-title="${book.title}" data-price="${book.price}">Adicionar ao Carrinho</button>
    `;
    bookList.appendChild(bookDiv);
  });

  // Adicionar eventos aos botões
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => addToCart(button));
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      addToCart(button);
    });
  });

  // Função para adicionar ao carrinho
  function addToCart(button) {
    const id = parseInt(button.dataset.id);
    const title = button.dataset.title;
    const price = parseFloat(button.dataset.price);
    cart.push({ id, title, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    if (window.innerWidth <= 600) {
      cartSection.style.display = 'none';
      cartButton.classList.remove('active');
    }
  }

  // Atualizar carrinho
  function updateCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price;
      const li = document.createElement('li');
      li.textContent = `${item.title} - R$ ${item.price.toFixed(2)}`;
      cartList.appendChild(li);
    });
    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
  }

  // Mostrar/esconder carrinho
  cartButton.addEventListener('click', () => toggleCart());
  cartButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleCart();
  });

  function toggleCart() {
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
  }

  // Menu hambúrguer
  menuToggle.addEventListener('click', () => {
    cartButton.classList.toggle('active');
  });
  menuToggle.addEventListener('touchstart', (e) => {
    e.preventDefault();
    cartButton.classList.toggle('active');
  });

  // Finalizar compra
  checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Carrinho vazio!');
      return;
    }
    alert('Compra finalizada com sucesso!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    cartSection.style.display = 'none';
    cartButton.classList.remove('active');
  });

  // Ajustar layout ao redimensionar
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 600 && cartSection.style.display === 'block') {
      cartSection.style.display = 'none';
      cartButton.classList.remove('active');
    }
  });

  // Inicializar carrinho
  updateCart();
});