document.addEventListener('DOMContentLoaded', function() {

    // Dark/Light Mode Toggle
    const themeBtn = document.querySelector('.dark-btn');
    const themeIcon = themeBtn.querySelector('i');
    const body = document.body;
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // If there's a saved theme, apply it on page load
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme when button is clicked
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Change icon based on current mode
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

   
    var minusBtn = document.getElementById('minus');
    var plusBtn = document.getElementById('plus');
    var counter = document.getElementById('counter');
    var heart = document.querySelector('.btnheart');
    var share = document.querySelector('.btnshare');
    var cartBtn = document.getElementById('cartbtn');
    var cartCount = document.querySelector('.cart-count');
    
    // Check if we're on the product page
    if (plusBtn && minusBtn && counter) {
        
        // Counter noti
        function showCounterNotification(action, value) {
            const counterNotification = document.createElement('div');
            counterNotification.className = 'counternoti';
            
            if (action === 'increase') {
                counterNotification.innerHTML = '<i class="fa-solid fa-plus"></i><span>Quantity: ' + value + '</span>';
                counterNotification.classList.add('increase');
            } else {
                counterNotification.innerHTML = '<i class="fa-solid fa-minus"></i><span>Quantity: ' + value + '</span>';
                counterNotification.classList.add('decrease');
            }
            
            document.body.appendChild(counterNotification);
            
            setTimeout(function() {
                counterNotification.classList.add('show');
            }, 10);
            
            setTimeout(function() {
                counterNotification.classList.remove('show');
                setTimeout(function() {
                    counterNotification.remove();
                }, 300);
            }, 1500);
        }
        
        // Plus btn
        plusBtn.addEventListener('click', function() {
            var currentCount = parseInt(counter.value);
            counter.value = currentCount + 1;
            showCounterNotification('increase', currentCount + 1); 
        });

        // Minus btn 
        minusBtn.addEventListener('click', function() {
            var currentCount = parseInt(counter.value);
            if (currentCount > 1) {
                counter.value = currentCount - 1;
                showCounterNotification('decrease', currentCount - 1); 
            }
        });
        
        // Cart noti 
        function showcartnoti() {
            const cartnoti = document.createElement('div');
            cartnoti.className = 'cartnoti';
            cartnoti.innerHTML = '<i class="fa-solid fa-check"></i><span>Item(s) added to cart</span>';
            document.body.appendChild(cartnoti);
            
            setTimeout(function() {
                cartnoti.classList.add('show');
            }, 10);
            
            setTimeout(function() {
                cartnoti.classList.remove('show');
                setTimeout(function() {
                    cartnoti.remove();
                }, 300);
            }, 1500);
        }
        
        // Add to cart btn
        if (cartBtn && cartCount) {
            cartBtn.addEventListener('click', function() {
                // Update cart count
                var currentCount = parseInt(cartCount.textContent);
                var quantity = parseInt(counter.value);
                cartCount.textContent = currentCount + quantity;
              
                showcartnoti();
            });
        }

    
        if (heart) {
            let isWishlisted = false;
            heart.addEventListener('click', function() {
                isWishlisted = !isWishlisted;
                const icon = heart.querySelector('i');
                
                if (isWishlisted) {
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                    icon.style.color = '#ff4d4d';
                } else {
                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                    icon.style.color = '#ffffff';
                }
            });
        }

     
        if (share) {
            let isShared = false;
            share.addEventListener('click', function() {
                isShared = !isShared;
                const icon = share.querySelector('i');
                
                if (isShared) {
                    icon.style.color = '#00bbff';
                } else {
                    icon.style.color = '#ffffff';
                }
            });
        }
    } 

    
    var searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showsearchnoti();
        });
    }

    function showsearchnoti() {
        const searchnoti = document.createElement('div');
        searchnoti.className = 'searchnoti';
        searchnoti.innerHTML = '<i class="fa-solid fa-hourglass-half"></i><span>Feature coming soon!</span>';
        document.body.appendChild(searchnoti);
        
        setTimeout(function() {
            searchnoti.classList.add('show');
        }, 10);
        
        setTimeout(function() {
            searchnoti.classList.remove('show');
            setTimeout(function() {
                searchnoti.remove();
            }, 300);
        }, 1500);
    }

});