// Arambh Premium Shoes - Product Data
const shoes = [
    {
        id: 1,
        name: 'Elegance Leather Oxford',
        price: 8999,
        originalPrice: 11999,
        category: 'formal',
        emoji: '👔',
        description: 'Timeless leather oxford shoes for formal occasions',
        specs: ['Leather', 'Handcrafted']
    },
    {
        id: 2,
        name: 'Urban Street Sneaker',
        price: 6499,
        originalPrice: 8999,
        category: 'casual',
        emoji: '👟',
        description: 'Premium casual sneakers for everyday style',
        specs: ['Canvas', 'Comfort Fit']
    },
    {
        id: 3,
        name: 'Professional Runner',
        price: 7999,
        originalPrice: 10999,
        category: 'sports',
        emoji: '⚽',
        description: 'High-performance running shoes with advanced cushioning',
        specs: ['Mesh', 'Lightweight']
    },
    {
        id: 4,
        name: 'Royal Formal Loafer',
        price: 9499,
        originalPrice: 12999,
        category: 'formal',
        emoji: '🎩',
        description: 'Sophisticated loafers with premium finishing',
        specs: ['Suede', 'Flexible']
    },
    {
        id: 5,
        name: 'Casual Denim Shoe',
        price: 5999,
        originalPrice: 7999,
        category: 'casual',
        emoji: '👕',
        description: 'Versatile denim shoes for casual wear',
        specs: ['Denim', 'Breathable']
    },
    {
        id: 6,
        name: 'Sprint Performance Boot',
        price: 9999,
        originalPrice: 13999,
        category: 'sports',
        emoji: '🏃',
        description: 'Advanced sports boot for athletes',
        specs: ['Synthetic', 'Cushioned']
    },
    {
        id: 7,
        name: 'Luxury Dress Shoe',
        price: 14999,
        originalPrice: 18999,
        category: 'luxury',
        emoji: '💎',
        description: 'Exquisite luxury dress shoes for elite style',
        specs: ['Premium Leather', 'Handmade']
    },
    {
        id: 8,
        name: 'Executive Comfort Oxford',
        price: 10499,
        originalPrice: 13999,
        category: 'formal',
        emoji: '🏢',
        description: 'Executive shoes with ultimate comfort',
        specs: ['Leather', 'Ergonomic']
    },
    {
        id: 9,
        name: 'Casual Loafer Classic',
        price: 6999,
        originalPrice: 9499,
        category: 'casual',
        emoji: '🌳',
        description: 'Classic casual loafers for weekend wear',
        specs: ['Leather', 'Slip-On']
    },
    {
        id: 10,
        name: 'Athletic Marathon Shoe',
        price: 8499,
        originalPrice: 11499,
        category: 'sports',
        emoji: '🏅',
        description: 'Marathon training shoes for distance running',
        specs: ['Mesh', 'Support']
    },
    {
        id: 11,
        name: 'Luxury Sneaker Supreme',
        price: 15999,
        originalPrice: 19999,
        category: 'luxury',
        emoji: '👑',
        description: 'Premium luxury sneaker with designer touch',
        specs: ['Leather', 'Exclusive']
    },
    {
        id: 12,
        name: 'Court Tennis Professional',
        price: 7499,
        originalPrice: 10499,
        category: 'sports',
        emoji: '🎾',
        description: 'Professional tennis shoes for court play',
        specs: ['Rubber', 'Grip']
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const shoesGrid = document.getElementById('shoesGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const subtotal = document.getElementById('subtotal');
const modalBackdrop = document.getElementById('modalBackdrop');
const checkoutBtn = document.getElementById('checkoutBtn');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayShoes(shoes);
    setupFilters();
    setupCartModal();
    setupForm();
});

// Display Shoes
function displayShoes(shoesToDisplay) {
    shoesGrid.innerHTML = '';

    if (shoesToDisplay.length === 0) {
        shoesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px;">No shoes found in this category</p>';
        return;
    }

    shoesToDisplay.forEach(shoe => {
        const shoeCard = document.createElement('div');
        shoeCard.className = 'shoe-card';
        shoeCard.innerHTML = `
            <div class="shoe-image">${shoe.emoji}</div>
            <div class="shoe-info">
                <p class="shoe-category">${shoe.category}</p>
                <h3 class="shoe-name">${shoe.name}</h3>
                <p class="shoe-description">${shoe.description}</p>
                <div class="shoe-specs">
                    ${shoe.specs.map(spec => `<span>• ${spec}</span>`).join('')}
                </div>
                <div class="shoe-price">
                    <span class="original">₹${shoe.originalPrice}</span>₹${shoe.price}
                </div>
                <button class="add-to-cart-btn" data-id="${shoe.id}">Add to Cart</button>
            </div>
        `;
        shoesGrid.appendChild(shoeCard);
    });

    // Add event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            addToCart(parseInt(this.dataset.id));
            
            // Button feedback
            this.textContent = '✓ Added to Cart';
            this.classList.add('added');
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.classList.remove('added');
            }, 2000);
        });
    });
}

// Setup Filters
function setupFilters() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            let filtered;

            if (filter === 'all') {
                filtered = shoes;
            } else {
                filtered = shoes.filter(shoe => shoe.category === filter);
            }

            displayShoes(filtered);
        });
    });
}

// Add to Cart
function addToCart(shoeId) {
    const shoe = shoes.find(s => s.id === shoeId);
    const existingItem = cart.find(item => item.id === shoeId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...shoe,
            quantity: 1
        });
    }

    updateCartUI();
}

// Remove from Cart
function removeFromCart(shoeId) {
    cart = cart.filter(item => item.id !== shoeId);
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-msg">Your cart is empty. Start shopping!</p>';
        subtotal.textContent = '0';
        totalPrice.textContent = '0';
    } else {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</div>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        subtotal.textContent = total;
        totalPrice.textContent = total;

        // Add remove listeners
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                removeFromCart(parseInt(this.dataset.id));
            });
        });
    }
}

// Setup Cart Modal
function setupCartModal() {
    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'block';
    });

    closeCartBtn.addEventListener('click', closeCart);
    modalBackdrop.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const total = totalPrice.textContent;
        alert(`Thank you for your order!\n\nTotal: ₹${total}\n\nYour premium shoes will be delivered within 3-5 business days with complimentary gift wrapping.`);
        
        cart = [];
        updateCartUI();
        closeCart();
    });
}

function closeCart() {
    cartModal.style.display = 'none';
}

// Setup Contact Form
function setupForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputs = this.querySelectorAll('.form-input');
        let allValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allValid = false;
            }
        });

        if (allValid) {
            alert('Thank you for reaching out! We will respond to your message within 24 hours.');
            inputs.forEach(input => input.value = '');
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Smooth Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Close cart on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCart();
    }
});
