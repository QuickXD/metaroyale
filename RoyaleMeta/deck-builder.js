// RoyaleMeta.fun - Deck Builder JavaScript
// Implementazione completa del deck builder con 119 carte di Clash Royale

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi DOM
    const cardsContainer = document.getElementById('cards-container');
    const deckSlots = document.querySelectorAll('.deck-slot');
    const elixirCost = document.getElementById('elixir-cost');
    const elixirFill = document.querySelector('.elixir-fill');
    const defenseRating = document.getElementById('defense-rating');
    const offenseRating = document.getElementById('offense-rating');
    const deckTipsContent = document.getElementById('deck-tips-content');
    const cardSearch = document.getElementById('card-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const saveButton = document.querySelector('.save-btn');
    const clearButton = document.querySelector('.clear-btn');
    const randomButton = document.querySelector('.random-btn');
    
    // Aggiungiamo un pulsante per copiare il mazzo
    const copyButton = document.createElement('button');
    copyButton.className = 'action-btn save-btn';
    copyButton.innerHTML = '<i class="fas fa-copy"></i><span>Copia Mazzo</span>';
    copyButton.style.marginTop = '10px';
    document.querySelector('.deck-actions').appendChild(copyButton);
    
    // Stato del deck builder
    let selectedCards = [];
    const maxDeckSize = 8;
    let currentFilter = 'all';
    let searchTerm = '';
    let hasChampion = false; // Per limitare a un solo campione per mazzo
    
    // Database completo delle 119 carte di Clash Royale
    const cards = [
        // Truppe comuni
        { id: 'knight', name: 'Knight', elixir: 3, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/knight.png?t=e7c50ff0c' },
        { id: 'archers', name: 'Archers', elixir: 3, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/archers.png?t=e7c50ff0c' },
        { id: 'bomber', name: 'Bomber', elixir: 2, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/bomber.png?t=e7c50ff0c' },
        { id: 'goblins', name: 'Goblins', elixir: 2, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/goblins.png?t=e7c50ff0c' },
        { id: 'spear-goblins', name: 'Spear Goblins', elixir: 2, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/spear-goblins.png?t=e7c50ff0c' },
        { id: 'skeletons', name: 'Skeletons', elixir: 1, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/skeletons.png?t=e7c50ff0c' },
        { id: 'minions', name: 'Minions', elixir: 3, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/minions.png?t=e7c50ff0c' },
        { id: 'bats', name: 'Bats', elixir: 2, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/bats.png?t=e7c50ff0c' },
        { id: 'barbarians', name: 'Barbarians', elixir: 5, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/barbarians.png?t=e7c50ff0c' },
        { id: 'minion-horde', name: 'Minion Horde', elixir: 5, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/minion-horde.png?t=e7c50ff0c' },
        { id: 'fire-spirit', name: 'Fire Spirit', elixir: 1, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/fire-spirit.png?t=e7c50ff0c' },
        { id: 'ice-spirit', name: 'Ice Spirit', elixir: 1, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/ice-spirit.png?t=e7c50ff0c' },
        { id: 'electro-spirit', name: 'Electro Spirit', elixir: 1, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/electro-spirit.png?t=e7c50ff0c' },
        { id: 'royal-recruits', name: 'Royal Recruits', elixir: 7, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/royal-recruits.png?t=e7c50ff0c' },
        { id: 'skeleton-dragons', name: 'Skeleton Dragons', elixir: 4, type: 'troop', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/skeleton-dragons.png?t=e7c50ff0c' },
        
        // Truppe rare
        { id: 'mini-pekka', name: 'Mini P.E.K.K.A', elixir: 4, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/mini-pekka.png?t=e7c50ff0c' },
        { id: 'musketeer', name: 'Musketeer', elixir: 4, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/musketeer.png?t=e7c50ff0c' },
        { id: 'valkyrie', name: 'Valkyrie', elixir: 4, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/valkyrie.png?t=e7c50ff0c' },
        { id: 'hog-rider', name: 'Hog Rider', elixir: 4, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/hog-rider.png?t=e7c50ff0c' },
        { id: 'mega-minion', name: 'Mega Minion', elixir: 3, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/mega-minion.png?t=e7c50ff0c' },
        { id: 'wizard', name: 'Wizard', elixir: 5, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/wizard.png?t=e7c50ff0c' },
        { id: 'ice-golem', name: 'Ice Golem', elixir: 2, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/ice-golem.png?t=e7c50ff0c' },
        { id: 'dart-goblin', name: 'Dart Goblin', elixir: 3, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/dart-goblin.png?t=e7c50ff0c' },
        { id: 'battle-ram', name: 'Battle Ram', elixir: 4, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/battle-ram.png?t=e7c50ff0c' },
        { id: 'zappies', name: 'Zappies', elixir: 4, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/zappies.png?t=e7c50ff0c' },
        { id: 'flying-machine', name: 'Flying Machine', elixir: 4, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/flying-machine.png?t=e7c50ff0c' },
        { id: 'elixir-golem', name: 'Elixir Golem', elixir: 3, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/elixir-golem.png?t=e7c50ff0c' },
        { id: 'firecracker', name: 'Firecracker', elixir: 3, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/firecracker.png?t=e7c50ff0c' },
        
        // Truppe epiche
        { id: 'prince', name: 'Prince', elixir: 5, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/prince.png?t=e7c50ff0c' },
        { id: 'baby-dragon', name: 'Baby Dragon', elixir: 4, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/baby-dragon.png?t=e7c50ff0c' },
        { id: 'skeleton-army', name: 'Skeleton Army', elixir: 3, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/skeleton-army.png?t=e7c50ff0c' },
        { id: 'witch', name: 'Witch', elixir: 5, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/witch.png?t=e7c50ff0c' },
        { id: 'balloon', name: 'Balloon', elixir: 5, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/balloon.png?t=e7c50ff0c' },
        { id: 'pekka', name: 'P.E.K.K.A', elixir: 7, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/pekka.png?t=e7c50ff0c' },
        { id: 'golem', name: 'Golem', elixir: 8, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/golem.png?t=e7c50ff0c' },
        { id: 'dark-prince', name: 'Dark Prince', elixir: 4, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/dark-prince.png?t=e7c50ff0c' },
        { id: 'guards', name: 'Guards', elixir: 3, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/guards.png?t=e7c50ff0c' },
        { id: 'bowler', name: 'Bowler', elixir: 5, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/bowler.png?t=e7c50ff0c' },
        { id: 'executioner', name: 'Executioner', elixir: 5, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/executioner.png?t=e7c50ff0c' },
        { id: 'cannon-cart', name: 'Cannon Cart', elixir: 5, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/cannon-cart.png?t=e7c50ff0c' },
        { id: 'electro-dragon', name: 'Electro Dragon', elixir: 5, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/electro-dragon.png?t=e7c50ff0c' },
        { id: 'goblin-giant', name: 'Goblin Giant', elixir: 6, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/goblin-giant.png?t=e7c50ff0c' },
        { id: 'electro-giant', name: 'Electro Giant', elixir: 8, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/electro-giant.png?t=e7c50ff0c' },
        { id: 'goblin-drill', name: 'Goblin Drill', elixir: 4, type: 'troop', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/goblin-drill.png?t=e7c50ff0c' },
        
        // Truppe leggendarie
        { id: 'lava-hound', name: 'Lava Hound', elixir: 7, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/lava-hound.png?t=e7c50ff0c' },
        { id: 'inferno-dragon', name: 'Inferno Dragon', elixir: 4, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/inferno-dragon.png?t=e7c50ff0c' },
        { id: 'ice-wizard', name: 'Ice Wizard', elixir: 3, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/ice-wizard.png?t=e7c50ff0c' },
        { id: 'princess', name: 'Princess', elixir: 3, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/princess.png?t=e7c50ff0c' },
        { id: 'miner', name: 'Miner', elixir: 3, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/miner.png?t=e7c50ff0c' },
        { id: 'sparky', name: 'Sparky', elixir: 6, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/sparky.png?t=e7c50ff0c' },
        { id: 'lumberjack', name: 'Lumberjack', elixir: 4, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/lumberjack.png?t=e7c50ff0c' },
        { id: 'electro-wizard', name: 'Electro Wizard', elixir: 4, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/electro-wizard.png?t=e7c50ff0c' },
        { id: 'night-witch', name: 'Night Witch', elixir: 4, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/night-witch.png?t=e7c50ff0c' },
        { id: 'bandit', name: 'Bandit', elixir: 3, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/bandit.png?t=e7c50ff0c' },
        { id: 'royal-ghost', name: 'Royal Ghost', elixir: 3, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/royal-ghost.png?t=e7c50ff0c' },
        { id: 'mega-knight', name: 'Mega Knight', elixir: 7, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/mega-knight.png?t=e7c50ff0c' },
        { id: 'magic-archer', name: 'Magic Archer', elixir: 4, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/magic-archer.png?t=e7c50ff0c' },
        { id: 'ram-rider', name: 'Ram Rider', elixir: 5, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/ram-rider.png?t=e7c50ff0c' },
        { id: 'fisherman', name: 'Fisherman', elixir: 3, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/fisherman.png?t=e7c50ff0c' },
        { id: 'mother-witch', name: 'Mother Witch', elixir: 4, type: 'troop', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/mother-witch.png?t=e7c50ff0c' },
        
        // Campioni
        { id: 'royal-champion', name: 'Royal Champion', elixir: 6, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/royal-champion.png?t=e7c50ff0c' },
        { id: 'archer-queen', name: 'Archer Queen', elixir: 5, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/archer-queen.png?t=e7c50ff0c' },
        { id: 'skeleton-king', name: 'Skeleton King', elixir: 4, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/skeleton-king.png?t=e7c50ff0c' },
        { id: 'golden-knight', name: 'Golden Knight', elixir: 4, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/golden-knight.png?t=e7c50ff0c' },
        { id: 'mighty-miner', name: 'Mighty Miner', elixir: 4, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/mighty-miner.png?t=e7c50ff0c' },
        { id: 'monk', name: 'Monk', elixir: 5, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/monk.png?t=e7c50ff0c' },
        { id: 'phoenix', name: 'Phoenix', elixir: 4, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/phoenix.png?t=e7c50ff0c' },
        { id: 'little-prince', name: 'Little Prince', elixir: 3, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/little-prince.png?t=e7c50ff0c' },
        
        // Incantesimi
        { id: 'fireball', name: 'Fireball', elixir: 4, type: 'spell', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/fireball.png?t=e7c50ff0c' },
        { id: 'arrows', name: 'Arrows', elixir: 3, type: 'spell', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/arrows.png?t=e7c50ff0c' },
        { id: 'zap', name: 'Zap', elixir: 2, type: 'spell', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/zap.png?t=e7c50ff0c' },
        { id: 'log', name: 'The Log', elixir: 2, type: 'spell', rarity: 'legendary', url: 'https://cdns3.royaleapi.com/cdn-cgi/image/w=150,h=180,format=auto/static/img/cards/v4-aba2f5ae/the-log.png' },
        { id: 'rocket', name: 'Rocket', elixir: 6, type: 'spell', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/rocket.png?t=e7c50ff0c' },
        { id: 'lightning', name: 'Lightning', elixir: 6, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/lightning.png?t=e7c50ff0c' },
        { id: 'giant-snowball', name: 'Giant Snowball', elixir: 2, type: 'spell', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/giant-snowball.png?t=e7c50ff0c' },
        { id: 'tornado', name: 'Tornado', elixir: 3, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/tornado.png?t=e7c50ff0c' },
        { id: 'poison', name: 'Poison', elixir: 4, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/poison.png?t=e7c50ff0c' },
        { id: 'earthquake', name: 'Earthquake', elixir: 3, type: 'spell', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/earthquake.png?t=e7c50ff0c' },
        { id: 'rage', name: 'Rage', elixir: 2, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/rage.png?t=e7c50ff0c' },
        { id: 'freeze', name: 'Freeze', elixir: 4, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/freeze.png?t=e7c50ff0c' },
        { id: 'clone', name: 'Clone', elixir: 3, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/clone.png?t=e7c50ff0c' },
        { id: 'mirror', name: 'Mirror', elixir: 0, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/mirror.png?t=e7c50ff0c' },
        { id: 'graveyard', name: 'Graveyard', elixir: 5, type: 'spell', rarity: 'legendary', url: 'https://cdn.royaleapi.com/static/img/cards-150/graveyard.png?t=e7c50ff0c' },
        { id: 'barbarian-barrel', name: 'Barbarian Barrel', elixir: 2, type: 'spell', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/barbarian-barrel.png?t=e7c50ff0c' },
        { id: 'heal-spirit', name: 'Heal Spirit', elixir: 1, type: 'troop', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/heal-spirit.png?t=e7c50ff0c' },
        
        // Costruzioni
        { id: 'cannon', name: 'Cannon', elixir: 3, type: 'building', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/cannon.png?t=e7c50ff0c' },
        { id: 'tesla', name: 'Tesla', elixir: 4, type: 'building', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/tesla.png?t=e7c50ff0c' },
        { id: 'mortar', name: 'Mortar', elixir: 4, type: 'building', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/mortar.png?t=e7c50ff0c' },
        { id: 'inferno-tower', name: 'Inferno Tower', elixir: 5, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/inferno-tower.png?t=e7c50ff0c' },
        { id: 'bomb-tower', name: 'Bomb Tower', elixir: 4, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/bomb-tower.png?t=e7c50ff0c' },
        { id: 'goblin-cage', name: 'Goblin Cage', elixir: 4, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/goblin-cage.png?t=e7c50ff0c' },
        { id: 'goblin-hut', name: 'Goblin Hut', elixir: 5, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/goblin-hut.png?t=e7c50ff0c' },
        { id: 'furnace', name: 'Furnace', elixir: 4, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/furnace.png?t=e7c50ff0c' },
        { id: 'tombstone', name: 'Tombstone', elixir: 3, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/tombstone.png?t=e7c50ff0c' },
        { id: 'barbarian-hut', name: 'Barbarian Hut', elixir: 7, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/barbarian-hut.png?t=e7c50ff0c' },
        { id: 'elixir-collector', name: 'Elixir Collector', elixir: 6, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/elixir-collector.png?t=e7c50ff0c' },
        { id: 'x-bow', name: 'X-Bow', elixir: 6, type: 'building', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/x-bow.png?t=e7c50ff0c' },
        { id: 'royal-delivery', name: 'Royal Delivery', elixir: 3, type: 'spell', rarity: 'common', url: 'https://cdn.royaleapi.com/static/img/cards-150/royal-delivery.png?t=e7c50ff0c' },
        { id: 'goblin-drill', name: 'Goblin Drill', elixir: 4, type: 'building', rarity: 'epic', url: 'https://cdn.royaleapi.com/static/img/cards-150/goblin-drill.png?t=e7c50ff0c' },
        { id: 'super-mini-pekka', name: 'Super Mini P.E.K.K.A', elixir: 4, type: 'champion', rarity: 'champion', url: 'https://cdn.royaleapi.com/static/img/cards-150/super-mini-pekka.png?t=e7c50ff0c' },
        { id: 'barbarian-launcher', name: 'Barbarian Launcher', elixir: 4, type: 'building', rarity: 'rare', url: 'https://cdn.royaleapi.com/static/img/cards-150/barbarian-launcher.png?t=e7c50ff0c' }
    ];
    
    // Funzione per creare gli elementi delle carte
    function createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.dataset.id = card.id;
        cardElement.dataset.elixir = card.elixir;
        cardElement.dataset.type = card.type;
        cardElement.dataset.rarity = card.rarity;
        
        cardElement.innerHTML = `
            <img src="${card.url}" alt="${card.name}">
            <div class="card-info">
                <span class="card-name">${card.name}</span>
                <span class="card-elixir">${card.elixir}</span>
            </div>
        `;
        
        // Aggiungi evento click per selezionare la carta
        cardElement.addEventListener('click', function() {
            selectCard(card);
        });
        
        return cardElement;
    }
    
    // Funzione per selezionare una carta
    function selectCard(card) {
        // Controlla se il mazzo è già pieno
        if (selectedCards.length >= maxDeckSize && !isCardInDeck(card.id)) {
            showNotification('Il mazzo è già completo (8 carte)');
            return;
        }
        
        // Controlla se è un campione e se c'è già un campione nel mazzo
        if (card.type === 'champion' && hasChampion && !isCardInDeck(card.id)) {
            showNotification('Puoi avere solo un campione nel mazzo');
            return;
        }
        
        // Controlla se la carta è già nel mazzo
        if (isCardInDeck(card.id)) {
            // Rimuovi la carta dal mazzo
            removeCardFromDeck(card.id);
            if (card.type === 'champion') {
                hasChampion = false;
            }
        } else {
            // Aggiungi la carta al mazzo
            selectedCards.push(card);
            if (card.type === 'champion') {
                hasChampion = true;
            }
        }
        
        // Aggiorna la visualizzazione del mazzo
        updateDeckDisplay();
        // Aggiorna le statistiche del mazzo
        updateDeckStats();
        // Aggiorna i consigli sul mazzo
        updateDeckTips();
    }
    
    // Funzione per verificare se una carta è già nel mazzo
    function isCardInDeck(cardId) {
        return selectedCards.some(card => card.id === cardId);
    }
    
    // Funzione per rimuovere una carta dal mazzo
    function removeCardFromDeck(cardId) {
        selectedCards = selectedCards.filter(card => card.id !== cardId);
    }
    
    // Funzione per aggiornare la visualizzazione del mazzo
    function updateDeckDisplay() {
        // Resetta tutti gli slot
        deckSlots.forEach(slot => {
            slot.innerHTML = '';
            slot.classList.remove('filled');
        });
        
        // Aggiorna gli slot con le carte selezionate
        selectedCards.forEach((card, index) => {
            if (index < deckSlots.length) {
                const slot = deckSlots[index];
                slot.innerHTML = `
                    <img src="${card.url}" alt="${card.name}">
                    <span class="card-elixir">${card.elixir}</span>
                    <div class="remove-card">×</div>
                `;
                slot.classList.add('filled');
                slot.dataset.id = card.id;
                
                // Aggiungi evento per rimuovere la carta
                const removeBtn = slot.querySelector('.remove-card');
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    removeCardFromDeck(card.id);
                    if (card.type === 'champion') {
                        hasChampion = false;
                    }
                    updateDeckDisplay();
                    updateDeckStats();
                    updateDeckTips();
                });
            }
        });
        
        // Aggiorna lo stato visivo delle carte nella collezione
        updateCardSelectionState();
    }
    
    // Funzione per aggiornare lo stato visivo delle carte nella collezione
    function updateCardSelectionState() {
        const cardItems = cardsContainer.querySelectorAll('.card-item');
        cardItems.forEach(item => {
            const cardId = item.dataset.id;
            if (isCardInDeck(cardId)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }
    
    // Funzione per aggiornare le statistiche del mazzo
    function updateDeckStats() {
        if (selectedCards.length === 0) {
            elixirCost.textContent = '0.0';
            elixirFill.style.width = '0%';
            defenseRating.textContent = '0';
            offenseRating.textContent = '0';
            return;
        }
        
        // Calcola il costo medio di elisir
        const totalElixir = selectedCards.reduce((sum, card) => sum + card.elixir, 0);
        const avgElixir = totalElixir / selectedCards.length;
        elixirCost.textContent = avgElixir.toFixed(1);
        
        // Aggiorna la barra dell'elisir (max 7.0 = 100%)
        const elixirPercentage = Math.min((avgElixir / 7) * 100, 100);
        elixirFill.style.width = `${elixirPercentage}%`;
        
        // Calcola i punteggi di difesa e attacco
        const defenseScore = calculateDefenseScore();
        const offenseScore = calculateOffenseScore();
        
        defenseRating.textContent = defenseScore;
        offenseRating.textContent = offenseScore;
    }
    
    // Funzione per calcolare il punteggio di difesa
    function calculateDefenseScore() {
        let score = 0;
        
        // Conta i tipi di carte
        const buildingCount = selectedCards.filter(card => card.type === 'building').length;
        const spellCount = selectedCards.filter(card => card.type === 'spell').length;
        const tankCount = selectedCards.filter(card => card.elixir >= 5 && card.type === 'troop').length;
        const swarmCount = selectedCards.filter(card => ['skeleton-army', 'goblin-gang', 'bats', 'minions', 'minion-horde'].includes(card.id)).length;
        
        // Bonus per edifici
        score += buildingCount * 2;
        
        // Bonus per incantesimi difensivi
        const defensiveSpells = selectedCards.filter(card => ['tornado', 'freeze', 'zap', 'giant-snowball', 'arrows', 'log', 'royal-delivery'].includes(card.id)).length;
        score += defensiveSpells * 1.5;
        
        // Bonus per tank
        score += tankCount * 1;
        
        // Bonus per sciami
        score += swarmCount * 1;
        
        // Bonus per carte specifiche con alto valore difensivo
        const highDefenseCards = selectedCards.filter(card => 
            ['pekka', 'mega-knight', 'valkyrie', 'bowler', 'electro-wizard', 'ice-wizard', 'inferno-tower', 'tesla'].includes(card.id)
        ).length;
        
        score += highDefenseCards * 2;
        
        // Normalizza il punteggio su una scala da 1 a 10
        score = Math.min(Math.max(Math.round(score), 1), 10);
        
        return score;
    }
    
    // Funzione per calcolare il punteggio di attacco
    function calculateOffenseScore() {
        let score = 0;
        
        // Conta i tipi di carte
        const winConditions = selectedCards.filter(card => 
            ['hog-rider', 'balloon', 'golem', 'giant', 'royal-giant', 'goblin-barrel', 'graveyard', 'x-bow', 'mortar', 'ram-rider', 'wall-breakers', 'goblin-drill', 'electro-giant'].includes(card.id)
        ).length;
        
        const heavySpells = selectedCards.filter(card => 
            ['fireball', 'poison', 'lightning', 'rocket'].includes(card.id)
        ).length;
        
        const supportTroops = selectedCards.filter(card => 
            ['musketeer', 'wizard', 'executioner', 'magic-archer', 'baby-dragon', 'electro-dragon', 'inferno-dragon'].includes(card.id)
        ).length;
        
        // Bonus per condizioni di vittoria
        score += winConditions * 3;
        
        // Bonus per incantesimi pesanti
        score += heavySpells * 2;
        
        // Bonus per truppe di supporto
        score += supportTroops * 1.5;
        
        // Bonus per carte specifiche con alto valore offensivo
        const highOffenseCards = selectedCards.filter(card => 
            ['lumberjack', 'mini-pekka', 'prince', 'dark-prince', 'elite-barbarians', 'sparky'].includes(card.id)
        ).length;
        
        score += highOffenseCards * 2;
        
        // Normalizza il punteggio su una scala da 1 a 10
        score = Math.min(Math.max(Math.round(score), 1), 10);
        
        return score;
    }
    
    // Funzione per aggiornare i consigli sul mazzo
    function updateDeckTips() {
        if (selectedCards.length < maxDeckSize) {
            deckTipsContent.innerHTML = `<p>Aggiungi altre ${maxDeckSize - selectedCards.length} carte per completare il mazzo.</p>`;
            return;
        }
        
        // Analizza il mazzo e fornisci consigli
        const avgElixir = selectedCards.reduce((sum, card) => sum + card.elixir, 0) / selectedCards.length;
        const buildingCount = selectedCards.filter(card => card.type === 'building').length;
        const spellCount = selectedCards.filter(card => card.type === 'spell').length;
        const winConditions = selectedCards.filter(card => 
            ['hog-rider', 'balloon', 'golem', 'giant', 'royal-giant', 'goblin-barrel', 'graveyard', 'x-bow', 'mortar', 'ram-rider', 'wall-breakers', 'goblin-drill', 'electro-giant'].includes(card.id)
        ).length;
        
        let tips = [];
        
        // Consigli sul costo di elisir
        if (avgElixir > 4.5) {
            tips.push('Il tuo mazzo è piuttosto pesante. Potresti avere difficoltà contro mazzi veloci.');
        } else if (avgElixir < 3.0) {
            tips.push('Il tuo mazzo è molto leggero. Potresti avere difficoltà contro mazzi pesanti.');
        } else {
            tips.push('Il costo di elisir è ben bilanciato.');
        }
        
        // Consigli sugli edifici
        if (buildingCount === 0) {
            tips.push('Non hai edifici nel mazzo. Gli edifici sono utili per la difesa.');
        } else if (buildingCount > 2) {
            tips.push('Hai molti edifici. Considera di sostituirne alcuni con truppe o incantesimi.');
        }
        
        // Consigli sugli incantesimi
        if (spellCount === 0) {
            tips.push('Non hai incantesimi nel mazzo. Gli incantesimi sono essenziali per rimuovere truppe nemiche.');
        } else if (spellCount === 1) {
            tips.push('Hai solo un incantesimo. Considera di aggiungerne un altro per maggiore versatilità.');
        } else if (spellCount > 3) {
            tips.push('Hai molti incantesimi. Considera di sostituirne alcuni con truppe.');
        }
        
        // Consigli sulle condizioni di vittoria
        if (winConditions === 0) {
            tips.push('Non hai condizioni di vittoria chiare. Aggiungi carte come Hog Rider, Giant, Balloon, ecc.');
        } else if (winConditions > 2) {
            tips.push('Hai troppe condizioni di vittoria. Considera di sostituirne alcune con carte di supporto.');
        }
        
        // Mostra i consigli
        deckTipsContent.innerHTML = tips.map(tip => `<p>• ${tip}</p>`).join('');
    }
    
    // Funzione per mostrare una notifica
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Funzione per filtrare le carte
    function filterCards() {
        const filteredCards = cards.filter(card => {
            // Filtra per tipo
            if (currentFilter !== 'all' && card.type !== currentFilter && !(currentFilter === 'champion' && card.rarity === 'champion')) {
                return false;
            }
            
            // Filtra per termine di ricerca
            if (searchTerm && !card.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            
            return true;
        });
        
        // Aggiorna la visualizzazione delle carte
        renderCards(filteredCards);
    }
    
    // Funzione per renderizzare le carte
    function renderCards(cardsToRender) {
        cardsContainer.innerHTML = '';
        
        cardsToRender.forEach(card => {
            const cardElement = createCardElement(card);
            cardsContainer.appendChild(cardElement);
        });
        
        // Aggiorna lo stato di selezione delle carte
        updateCardSelectionState();
    }
    
    // Funzione per generare un mazzo casuale
    function generateRandomDeck() {
        // Resetta il mazzo
        selectedCards = [];
        hasChampion = false;
        
        // Categorie di carte per un mazzo bilanciato
        const winConditions = cards.filter(card => 
            ['hog-rider', 'balloon', 'golem', 'giant', 'royal-giant', 'goblin-barrel', 'graveyard', 'x-bow', 'mortar', 'ram-rider', 'wall-breakers', 'goblin-drill', 'electro-giant'].includes(card.id)
        );
        
        const spells = cards.filter(card => card.type === 'spell');
        const buildings = cards.filter(card => card.type === 'building');
        const supportTroops = cards.filter(card => 
            !winConditions.some(wc => wc.id === card.id) && 
            card.type !== 'spell' && 
            card.type !== 'building' &&
            card.rarity !== 'champion'
        );
        const champions = cards.filter(card => card.rarity === 'champion');
        
        // Seleziona 1-2 condizioni di vittoria
        const winConditionCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < winConditionCount; i++) {
            if (winConditions.length > 0) {
                const randomIndex = Math.floor(Math.random() * winConditions.length);
                selectedCards.push(winConditions[randomIndex]);
                winConditions.splice(randomIndex, 1);
            }
        }
        
        // Seleziona 2 incantesimi
        for (let i = 0; i < 2; i++) {
            if (spells.length > 0) {
                const randomIndex = Math.floor(Math.random() * spells.length);
                selectedCards.push(spells[randomIndex]);
                spells.splice(randomIndex, 1);
            }
        }
        
        // Seleziona 1 edificio
        if (buildings.length > 0) {
            const randomIndex = Math.floor(Math.random() * buildings.length);
            selectedCards.push(buildings[randomIndex]);
        }
        
        // Decide se includere un campione (50% di probabilità)
        const includeChampion = Math.random() < 0.5;
        if (includeChampion && champions.length > 0) {
            const randomIndex = Math.floor(Math.random() * champions.length);
            selectedCards.push(champions[randomIndex]);
            hasChampion = true;
        }
        
        // Riempi il resto del mazzo con truppe di supporto
        while (selectedCards.length < maxDeckSize && supportTroops.length > 0) {
            const randomIndex = Math.floor(Math.random() * supportTroops.length);
            selectedCards.push(supportTroops[randomIndex]);
            supportTroops.splice(randomIndex, 1);
        }
        
        // Aggiorna la visualizzazione
        updateDeckDisplay();
        updateDeckStats();
        updateDeckTips();
    }
    
    // Funzione per salvare il mazzo
    function saveDeck() {
        if (selectedCards.length < maxDeckSize) {
            showNotification(`Completa il mazzo prima di salvarlo (${selectedCards.length}/8 carte)`);
            return;
        }
        
        // Crea un oggetto con i dati del mazzo
        const deck = {
            cards: selectedCards.map(card => card.id),
            avgElixir: parseFloat(elixirCost.textContent),
            defenseRating: parseInt(defenseRating.textContent),
            offenseRating: parseInt(offenseRating.textContent),
            timestamp: new Date().toISOString()
        };
        
        // Ottieni i mazzi salvati o inizializza un array vuoto
        let savedDecks = JSON.parse(localStorage.getItem('royaleMeta_savedDecks') || '[]');
        
        // Aggiungi il nuovo mazzo
        savedDecks.push(deck);
        
        // Salva nel localStorage
        localStorage.setItem('royaleMeta_savedDecks', JSON.stringify(savedDecks));
        
        showNotification('Mazzo salvato con successo!');
    }
    
    // Funzione per copiare il mazzo
    function copyDeckToClipboard() {
        if (selectedCards.length < maxDeckSize) {
            showNotification(`Completa il mazzo prima di copiarlo (${selectedCards.length}/8 carte)`);
            return;
        }
        
        // Crea una stringa con i nomi delle carte
        const deckString = selectedCards.map(card => card.name).join(', ');
        
        // Copia negli appunti
        navigator.clipboard.writeText(deckString)
            .then(() => {
                showNotification('Mazzo copiato negli appunti!');
            })
            .catch(err => {
                showNotification('Errore durante la copia del mazzo');
                console.error('Errore durante la copia: ', err);
            });
    }
    
    // Inizializzazione
    function init() {
        // Renderizza tutte le carte
        renderCards(cards);
        
        // Aggiungi eventi ai pulsanti di filtro
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Rimuovi la classe active da tutti i pulsanti
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Aggiungi la classe active al pulsante cliccato
                this.classList.add('active');
                
                // Aggiorna il filtro corrente
                currentFilter = this.dataset.filter;
                
                // Filtra le carte
                filterCards();
            });
        });
        
        // Aggiungi evento alla ricerca
        cardSearch.addEventListener('input', function() {
            searchTerm = this.value.trim();
            filterCards();
        });
        
        // Aggiungi eventi ai pulsanti di azione
        saveButton.addEventListener('click', saveDeck);
        clearButton.addEventListener('click', function() {
            selectedCards = [];
            hasChampion = false;
            updateDeckDisplay();
            updateDeckStats();
            updateDeckTips();
        });
        randomButton.addEventListener('click', generateRandomDeck);
        copyButton.addEventListener('click', copyDeckToClipboard);
    }
    
    // Avvia l'applicazione
    init();
});