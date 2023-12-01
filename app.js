const chocolates = [
    { name: 'Chocolate 1', price: 10, description: 'Delicious milk chocolate bar.', image: './assets/chocolete1.jpeg' },
    { name: 'Chocolate 2', price: 15, description: 'Rich dark chocolate with almonds.', image: './assets/chocolete2.jpg' },
    { name: 'Chocolate 3', price: 20, description: 'Creamy white chocolate with hazelnuts.', image: './assets/chocolete3.jpeg' },
    // Add more chocolates as needed
];

let bundle = [];
let totalPrice = 0;

const chocolatesDiv = document.getElementById('chocolates');
chocolates.forEach((chocolate, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    const image = document.createElement('div');
    image.className = 'product-image';
    image.style.background = `url('${chocolate.image}') no-repeat center center / cover`;
    card.appendChild(image);
    const title = document.createElement('h5');
    title.textContent = chocolate.name;
    card.appendChild(title);
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = chocolate.description;
    card.appendChild(description);
    const price = document.createElement('p');
    price.textContent = `$${chocolate.price}`;
    card.appendChild(price);
    const button = document.createElement('button');
    button.className = 'btn-primary';
    button.textContent = 'Add to bundle';
    button.addEventListener('click', () => {
        if (bundle.length < 8) {
            const totalQuantity = bundle.reduce((acc, curr) => acc + curr.quantity, 0);
            if (totalQuantity + 1 <= 8) {
                const existingChocolate = bundle.find(item => item.name === chocolate.name);
                if (existingChocolate) {
                    existingChocolate.quantity++;
                } else {
                    chocolate.quantity = 1;
                    bundle.push(chocolate);
                }
                totalPrice += chocolate.price;
                updateBundleDisplay();
            } else {
                alert('Total quantity of chocolates in the bundle cannot exceed 8.');
            }
        } else {
            alert('You cannot add more than 8 items to the bundle.');
        }
    });
    card.appendChild(button);
    chocolatesDiv.appendChild(card);
});

function updateBundleDisplay() {
    const bundleDiv = document.getElementById('bundle');
    bundleDiv.textContent = '';
    bundle.forEach((chocolate, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        const title = document.createElement('h5');
        title.textContent = chocolate.name;
        card.appendChild(title);
        const price = document.createElement('p');
        price.textContent = `$${chocolate.price} x ${chocolate.quantity}`;
        card.appendChild(price);
        const button = document.createElement('button');
        button.className = 'btn-danger';
        button.textContent = 'Remove from bundle';
        button.addEventListener('click', () => {
            if (chocolate.quantity > 1) {
                chocolate.quantity--;
            } else {
                bundle.splice(index, 1);
            }
            totalPrice -= chocolate.price;
            updateBundleDisplay();
        });
        card.appendChild(button);
        const count = document.createElement('p');
        count.className = 'count';
        count.textContent = `Total: $${chocolate.price * chocolate.quantity}`;
        card.appendChild(count);
        bundleDiv.appendChild(card);
    });
    const totalPriceDiv = document.getElementById('totalAmount');
    totalPriceDiv.textContent = `$${totalPrice}`;
}
