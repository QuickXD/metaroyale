// RoyaleMeta.fun - Main JavaScript
// Created for the Ultimate Clash Royale Resource Hub

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Interactive Deck Builder
    const openDeckBuilderBtn = document.getElementById('open-deck-builder');
    let deckBuilderModal;
    let selectedCards = [];
    const maxDeckSize = 8;

    // Create deck builder modal dynamically
    function createDeckBuilderModal() {
        // Create modal container
        deckBuilderModal = document.createElement('div');
        deckBuilderModal.className = 'deck-builder-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'deck-builder-content';
        
        // Add close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', closeDeckBuilder);
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = 'Build Your Ultimate Deck';
        
        // Add deck preview
        const deckPreview = document.createElement('div');
        deckPreview.className = 'deck-preview';
        
        const deckCards = document.createElement('div');
        deckCards.className = 'deck-cards';
        
        // Create 8 empty card slots
        for (let i = 0; i < maxDeckSize; i++) {
            const cardSlot = document.createElement('div');
            cardSlot.className = 'deck-card empty';
            cardSlot.innerHTML = '<i class="fas fa-plus"></i>';
            cardSlot.dataset.index = i;
            deckCards.appendChild(cardSlot);
        }
        
        const deckStats = document.createElement('div');
        deckStats.className = 'deck-stats';
        
        const elixirStat = document.createElement('div');
        elixirStat.className = 'stat';
        elixirStat.innerHTML = '<span class="stat-label">Avg. Elixir</span><span class="stat-value" id="elixir-value">0.0</span>';
        
        const winRateStat = document.createElement('div');
        winRateStat.className = 'stat';
        winRateStat.innerHTML = '<span class="stat-label">Win Rate</span><span class="stat-value" id="win-rate-value">0%</span>';
        
        deckStats.appendChild(elixirStat);
        deckStats.appendChild(winRateStat);
        
        deckPreview.appendChild(deckCards);
        deckPreview.appendChild(deckStats);
        
        // Add card selection
        const cardSelectionTitle = document.createElement('h3');
        cardSelectionTitle.textContent = 'Select Cards';
        cardSelectionTitle.style.marginTop = '2rem';
        
        const cardSelection = document.createElement('div');
        cardSelection.className = 'card-selection';
        
        // Add cards from RoyaleAPI
        const cardImages = [
            'https://cdn.royaleapi.com/static/img/cards-150/mega-knight.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/electro-giant.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/goblin-drill.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/royal-champion.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/tornado.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/lightning.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/bomber.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/cannon.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/skeletons.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/ice-spirit.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/log.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/fireball.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/hog-rider.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/valkyrie.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/musketeer.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/mini-pekka.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/wizard.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/balloon.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/witch.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/giant.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/prince.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/baby-dragon.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/skeleton-army.png?t=e7c50ff0c',
            'https://cdn.royaleapi.com/static/img/cards-150/golem.png?t=e7c50ff0c'
        ];
        
        // Card data with elixir cost
        const cardData = {
            'mega-knight': { name: 'Mega Knight', elixir: 7 },
            'electro-giant': { name: 'Electro Giant', elixir: 8 },
            'goblin-drill': { name: 'Goblin Drill', elixir: 4 },
            'royal-champion': { name: 'Royal Champion', elixir: 6 },
            'tornado': { name: 'Tornado', elixir: 3 },
            'lightning': { name: 'Lightning', elixir: 6 },
            'bomber': { name: 'Bomber', elixir: 2 },
            'cannon': { name: 'Cannon', elixir: 3 },
            'skeletons': { name: 'Skeletons', elixir: 1 },
            'ice-spirit': { name: 'Ice Spirit', elixir: 1 },
            'log': { name: 'The Log', elixir: 2 },
            'fireball': { name: 'Fireball', elixir: 4 },
            'hog-rider': { name: 'Hog Rider', elixir: 4 },
            'valkyrie': { name: 'Valkyrie', elixir: 4 },
            'musketeer': { name: 'Musketeer', elixir: 4 },
            'mini-pekka': { name: 'Mini P.E.K.K.A', elixir: 4 },
            'wizard': { name: 'Wizard', elixir: 5 },
            'balloon': { name: 'Balloon', elixir: 5 },
            'witch': { name: 'Witch', elixir: 5 },
            'giant': { name: 'Giant', elixir: 5 },
            'prince': { name: 'Prince', elixir: 5 },
            'baby-dragon': { name: 'Baby Dragon', elixir: 4 },
            'skeleton-army': { name: 'Skeleton Army', elixir: 3 },
            'golem': { name: 'Golem', elixir: 8 }
        };
        
        cardImages.forEach(cardUrl => {
            const cardItem = document.createElement('div');
            cardItem.className = 'card-selection-item';
            
            const img = document.createElement('img');
            img.src = cardUrl;
            
            // Extract card name from URL
            const cardName = cardUrl.split('/').pop().split('.')[0];
            img.alt = cardData[cardName] ? cardData[cardName].name : cardName;
            img.dataset.card = cardName;
            img.dataset.elixir = cardData[cardName] ? cardData[cardName].elixir : 0;
            
            cardItem.appendChild(img);
            cardItem.addEventListener('click', function() {
                selectCard(this, cardName, cardUrl);
            });
            
            cardSelection.appendChild(cardItem);
        });
        
        // Add share button
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn btn-primary';
        shareBtn.textContent = 'Share Deck';
        shareBtn.style.marginTop = '2rem';
        shareBtn.addEventListener('click', shareDeck);
        
        // Assemble modal content
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(title);
        modalContent.appendChild(deckPreview);
        modalContent.appendChild(cardSelectionTitle);
        modalContent.appendChild(cardSelection);
        modalContent.appendChild(shareBtn);
        
        deckBuilderModal.appendChild(modalContent);
        document.body.appendChild(deckBuilderModal);
        
        // Add event listeners to empty card slots
        const emptySlots = deckBuilderModal.querySelectorAll('.deck-card.empty');
        emptySlots.forEach(slot => {
            slot.addEventListener('click', function() {
                // If a card is already in this slot, remove it
                if (!this.classList.contains('empty')) {
                    const index = parseInt(this.dataset.index);
                    selectedCards.splice(index, 1);
                    updateDeckDisplay();
                }
            });
        });
    }
    
    function selectCard(cardElement, cardName, cardUrl) {
        const cardData = {
            name: cardName,
            url: cardUrl,
            elixir: parseInt(cardElement.querySelector('img').dataset.elixir)
        };
        
        // Check if card is already selected
        const existingIndex = selectedCards.findIndex(card => card.name === cardName);
        
        if (existingIndex !== -1) {
            // Remove card if already selected
            selectedCards.splice(existingIndex, 1);
            cardElement.classList.remove('selected');
        } else if (selectedCards.length < maxDeckSize) {
            // Add card if deck is not full
            selectedCards.push(cardData);
            cardElement.classList.add('selected');
        } else {
            // Alert if deck is full
            alert('Your deck is full! Remove a card before adding a new one.');
            return;
        }
        
        updateDeckDisplay();
    }
    
    function updateDeckDisplay() {
        const deckSlots = deckBuilderModal.querySelectorAll('.deck-preview .deck-card');
        
        // Reset all slots
        deckSlots.forEach((slot, index) => {
            slot.innerHTML = '<i class="fas fa-plus"></i>';
            slot.className = 'deck-card empty';
            slot.dataset.index = index;
        });
        
        // Fill slots with selected cards
        selectedCards.forEach((card, index) => {
            const slot = deckSlots[index];
            slot.innerHTML = `<img src="${card.url}" alt="${card.name}">`;
            slot.className = 'deck-card';
            slot.dataset.index = index;
        });
        
        // Update stats
        updateDeckStats();
    }
    
    function updateDeckStats() {
        const elixirValue = document.getElementById('elixir-value');
        const winRateValue = document.getElementById('win-rate-value');
        
        if (selectedCards.length > 0) {
            // Calculate average elixir
            const totalElixir = selectedCards.reduce((sum, card) => sum + card.elixir, 0);
            const avgElixir = (totalElixir / selectedCards.length).toFixed(1);
            elixirValue.textContent = avgElixir;
            
            // Calculate estimated win rate based on deck composition
            // This is a simplified algorithm for demonstration
            let winRate = 0;
            
            // Base win rate starts at 40%
            winRate += 40;
            
            // Add up to 10% based on elixir balance (3.5-4.5 is ideal)
            const elixirScore = 10 - Math.abs(4 - parseFloat(avgElixir)) * 5;
            winRate += Math.max(0, elixirScore);
            
            // Add up to 20% based on deck completeness
            winRate += (selectedCards.length / maxDeckSize) * 20;
            
            // Add up to 30% based on card synergy (simplified)
            // Check for common archetypes
            const cardNames = selectedCards.map(card => card.name);
            
            // Check for win condition
            const winConditions = ['hog-rider', 'balloon', 'giant', 'golem', 'electro-giant'];
            if (winConditions.some(card => cardNames.includes(card))) {
                winRate += 10;
            }
            
            // Check for spells
            const spells = ['fireball', 'log', 'lightning', 'tornado'];
            const spellCount = spells.filter(spell => cardNames.includes(spell)).length;
            winRate += spellCount * 5;
            
            // Check for defense
            const defense = ['cannon', 'mega-knight', 'valkyrie', 'mini-pekka'];
            const defenseCount = defense.filter(def => cardNames.includes(def)).length;
            winRate += defenseCount * 3;
            
            // Cap at 95% max
            winRate = Math.min(95, Math.round(winRate));
            
            winRateValue.textContent = `${winRate}%`;
            
            // Change color based on win rate
            if (winRate >= 70) {
                winRateValue.style.color = 'var(--accent-green)';
            } else if (winRate >= 50) {
                winRateValue.style.color = 'var(--secondary)';
            } else {
                winRateValue.style.color = 'var(--accent-red)';
            }
        } else {
            elixirValue.textContent = '0.0';
            winRateValue.textContent = '0%';
            winRateValue.style.color = 'var(--text-light)';
        }
    }
    
    function shareDeck() {
        if (selectedCards.length < maxDeckSize) {
            alert(`Your deck is incomplete! Please select ${maxDeckSize - selectedCards.length} more card(s).`);
            return;
        }
        
        // In a real application, this would generate a shareable link
        // For this demo, we'll just show an alert
        alert('Deck copied to clipboard! Share it with your friends.');
        
        // Close the modal
        closeDeckBuilder();
    }
    
    function openDeckBuilder() {
        if (!deckBuilderModal) {
            createDeckBuilderModal();
        }
        
        deckBuilderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDeckBuilder() {
        deckBuilderModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (openDeckBuilderBtn) {
        openDeckBuilderBtn.addEventListener('click', openDeckBuilder);
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.featured-card, .news-card, .daily-deck-container, .newsletter-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Create Meta Tier List page
    const createMetaTierListPage = () => {
        // This would be implemented in a real application
        console.log('Meta Tier List page would be created here');
    };

    // Create Deck Guides page
    const createDeckGuidesPage = () => {
        // This would be implemented in a real application
        console.log('Deck Guides page would be created here');
    };

    // Create Strategies page
    const createStrategiesPage = () => {
        // This would be implemented in a real application
        console.log('Strategies page would be created here');
    };

    // Create News page
    const createNewsPage = () => {
        // This would be implemented in a real application
        console.log('News page would be created here');
    };

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real application, this would send the email to a server
                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our latest updates soon.`);
                emailInput.value = '';
            }
        });
    }
});