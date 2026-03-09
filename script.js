class RatMafiaGame {
    constructor() {
        this.gameStarted = false;
        this.startScreen = document.getElementById('start-screen');
        this.gameContainer = document.getElementById('game-container');
        this.startButton = document.getElementById('start-game-btn');
        
        this.setupStartScreen();
    }
    
    setupStartScreen() {
        this.startButton.addEventListener('click', () => {
            this.startGame();
        });
    }
    
    startGame() {
        this.gameStarted = true;
        this.startScreen.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        
        // Initialize game components
        this.gameArea = document.getElementById('game-area');
        this.player = document.getElementById('player');
        
        this.playerStats = {
            x: 100,
            y: 100,
            prevX: 100,
            prevY: 100,
            speed: 5,
            damage: 10,
            fireRate: 500,
            lastShot: 0,
            level: 1,
            xp: 0,
            xpToNext: 100,
            cash: 0,
            health: 100,
            maxHealth: 100,
            invulnerable: false,
            invulnerableTime: 0,
            damageCooldown: 0,
            criticalChance: 0,
            lifestealAmount: 0,
            multishotCount: 1
        };
        
        this.familyMembers = [];
        this.enemies = [];
        this.bullets = [];
        this.goonBullets = [];
        this.particles = [];
        
        this.upgrades = {
            goon: { cost: 100, owned: 0, maxLevel: 10 },
            weapon: { cost: 250, owned: 0, maxLevel: 5 },
            speed: { cost: 150, owned: 0, maxLevel: 5 },
            firerate: { cost: 200, owned: 0, maxLevel: 5 },
            health: { cost: 300, owned: 0, maxLevel: 5 },
            critical: { cost: 400, owned: 0, maxLevel: 3 },
            lifesteal: { cost: 350, owned: 0, maxLevel: 3 },
            multishot: { cost: 500, owned: 0, maxLevel: 3 }
        };
        
        this.keys = {};
        this.gameRunning = true;
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 2000;
        
        // Time-based difficulty scaling
        this.gameStartTime = Date.now();
        this.timeDifficultyMultiplier = 1;
        
        // Load sound effects
        this.enemyDeathSound = new Audio('I Don\'t Care Anymore (2016 Remaster) (mp3cut.net).mp3');
        this.enemyDeathSound.volume = 0.3; // Set volume to 30%
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUI();
        this.gameLoop();
        this.spawnEnemy();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                this.keys[e.key.toLowerCase()] = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
                this.keys[key] = false;
            }
        });
        
        // Clear all keys when window loses focus (tab out, click elsewhere)
        window.addEventListener('blur', () => {
            this.keys = {};
        });
        
        // Also clear keys when window regains focus
        window.addEventListener('focus', () => {
            this.keys = {};
        });
        
        this.gameArea.addEventListener('click', (e) => {
            if (this.gameRunning) {
                this.shoot(e);
            }
        });
        
        document.querySelectorAll('.upgrade-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.purchaseUpgrade(e.target.dataset.upgrade);
            });
        });
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        this.updatePlayer();
        this.updateEnemies();
        this.updateGoons();
        this.updateBullets();
        this.updateGoonBullets();
        this.updateParticles();
        this.checkCollisions();
        this.spawnEnemies();
        this.updateTimeDifficulty();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    updatePlayer() {
        let dx = 0;
        let dy = 0;
        
        // Check movement keys with proper key detection
        if (this.keys['w'] || this.keys['arrowup']) dy = -this.playerStats.speed;
        if (this.keys['s'] || this.keys['arrowdown']) dy = this.playerStats.speed;
        if (this.keys['a'] || this.keys['arrowleft']) dx = -this.playerStats.speed;
        if (this.keys['d'] || this.keys['arrowright']) dx = this.playerStats.speed;
        
        // Normalize diagonal movement to prevent faster diagonal speed
        if (dx !== 0 && dy !== 0) {
            const factor = 0.707; // 1/sqrt(2) for normalized diagonal movement
            dx *= factor;
            dy *= factor;
        }
        
        const rect = this.gameArea.getBoundingClientRect();
        const newX = this.playerStats.x + dx;
        const newY = this.playerStats.y + dy;
        
        // Apply boundary constraints
        this.playerStats.x = Math.max(0, Math.min(rect.width - 60, newX));
        this.playerStats.y = Math.max(0, Math.min(rect.height - 60, newY));
        
        this.player.style.left = this.playerStats.x + 'px';
        this.player.style.top = this.playerStats.y + 'px';
        
        // Update invulnerability
        if (this.playerStats.invulnerable) {
            this.playerStats.invulnerableTime -= 16;
            if (this.playerStats.invulnerableTime <= 0) {
                this.playerStats.invulnerable = false;
                this.player.style.opacity = '1';
            } else {
                // Flashing effect when invulnerable
                this.player.style.opacity = this.playerStats.invulnerableTime % 200 < 100 ? '0.5' : '1';
            }
        }
        
        // Update damage cooldown
        if (this.playerStats.damageCooldown > 0) {
            this.playerStats.damageCooldown -= 16;
        }
    }
    
    shoot(e) {
        const now = Date.now();
        if (now - this.playerStats.lastShot < this.playerStats.fireRate) return;
        
        this.playerStats.lastShot = now;
        
        const rect = this.gameArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const baseAngle = Math.atan2(mouseY - (this.playerStats.y + 30), mouseX - (this.playerStats.x + 30));
        
        // Multi-shot: create multiple bullets in a spread pattern
        const bulletCount = this.playerStats.multishotCount;
        const spreadAngle = 0.2; // Spread angle between bullets
        
        for (let i = 0; i < bulletCount; i++) {
            const angleOffset = (i - (bulletCount - 1) / 2) * spreadAngle;
            const angle = baseAngle + angleOffset;
            
            // Check for critical hit
            const isCritical = Math.random() < this.playerStats.criticalChance;
            const damage = isCritical ? this.playerStats.damage * 2 : this.playerStats.damage;
            
            const bullet = {
                x: this.playerStats.x + 30,
                y: this.playerStats.y + 30,
                vx: Math.cos(angle) * 10,
                vy: Math.sin(angle) * 10,
                damage: damage,
                isCritical: isCritical,
                element: this.createBulletElement(this.playerStats.x + 30, this.playerStats.y + 30, isCritical)
            };
            
            this.bullets.push(bullet);
        }
    }
    
    createBulletElement(x, y, isCritical = false) {
        const bullet = document.createElement('div');
        bullet.className = isCritical ? 'bullet critical-bullet' : 'bullet';
        bullet.style.left = x + 'px';
        bullet.style.top = y + 'px';
        this.gameArea.appendChild(bullet);
        return bullet;
    }
    
    updateBullets() {
        const rect = this.gameArea.getBoundingClientRect();
        
        this.bullets = this.bullets.filter(bullet => {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            
            bullet.element.style.left = bullet.x + 'px';
            bullet.element.style.top = bullet.y + 'px';
            
            if (bullet.x < 0 || bullet.x > rect.width || bullet.y < 0 || bullet.y > rect.height) {
                bullet.element.remove();
                return false;
            }
            
            return true;
        });
    }
    
    spawnEnemies() {
        this.enemySpawnTimer += 16;
        if (this.enemySpawnTimer >= this.enemySpawnInterval) {
            // Calculate how many enemies to spawn based on level milestones
            const levelTier = Math.floor(this.playerStats.level / 5); // How many 5-level milestones passed
            const baseEnemies = 1;
            const additionalEnemies = levelTier * 5; // Add 2 enemies per 5 levels
            const enemiesToSpawn = baseEnemies + additionalEnemies;
            
            // Spawn multiple enemies
            for (let i = 0; i < enemiesToSpawn; i++) {
                // Add small delay between spawns to prevent them all appearing at exact same spot
                setTimeout(() => {
                    this.spawnEnemy();
                }, i * 100); // 100ms delay between each enemy spawn
            }
            
            this.enemySpawnTimer = 0;
            
            // Spawn rate based on player level: 2 seconds - 0.1 seconds per level
            const baseInterval = 2000; // 2 seconds in milliseconds
            const levelReduction = this.playerStats.level * 100; // 0.1 seconds = 100ms per level
            this.enemySpawnInterval = Math.max(400, baseInterval - levelReduction); // Minimum 400ms (0.4 seconds)
        }
    }
    
    spawnEnemy() {
        const rect = this.gameArea.getBoundingClientRect();
        const side = Math.floor(Math.random() * 4);
        let x, y;
        
        switch(side) {
            case 0: x = Math.random() * rect.width; y = -50; break;
            case 1: x = rect.width + 50; y = Math.random() * rect.height; break;
            case 2: x = Math.random() * rect.width; y = rect.height + 50; break;
            case 3: x = -50; y = Math.random() * rect.height; break;
        }
        
        // Apply time-based difficulty scaling
        const baseHealth = 30 + (this.playerStats.level * 5);
        const scaledHealth = Math.floor(baseHealth * this.timeDifficultyMultiplier);
        const baseValue = 10 + (this.playerStats.level * 2);
        const scaledValue = Math.floor(baseValue * this.timeDifficultyMultiplier);
        
        const enemy = {
            x: x,
            y: y,
            health: scaledHealth,
            maxHealth: scaledHealth,
            value: scaledValue,
            damage: Math.floor(10 * this.timeDifficultyMultiplier), // Enemy damage also scales
            element: this.createEnemyElement(x, y)
        };
        
        this.enemies.push(enemy);
    }
    
    createEnemyElement(x, y) {
        const enemy = document.createElement('div');
        enemy.className = 'enemy-rat';
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';
        enemy.innerHTML = `
            <div class="phil-face">
                <img src="https://m.media-amazon.com/images/I/91MvvblZdsL._UF1000,1000_QL80_.jpg" alt="Phil Collins" class="phil-image">
            </div>
        `;
        this.gameArea.appendChild(enemy);
        return enemy;
    }
    
    updateEnemies() {
        this.enemies = this.enemies.filter(enemy => {
            const dx = this.playerStats.x - enemy.x;
            const dy = this.playerStats.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Check if player is moving (has velocity from previous frame)
            const playerMoving = Math.abs(dx - (this.playerStats.x - this.playerStats.prevX || 0)) > 1 || 
                               Math.abs(dy - (this.playerStats.y - this.playerStats.prevY || 0)) > 1;
            
            if (distance > 35) { // Keep distance from player
                // Always move towards player
                const moveSpeed = playerMoving ? 2 : 3; // Move faster when player is stationary
                const moveX = (dx / distance) * moveSpeed;
                const moveY = (dy / distance) * moveSpeed;
                enemy.x += moveX;
                enemy.y += moveY;
                enemy.element.style.left = enemy.x + 'px';
                enemy.element.style.top = enemy.y + 'px';
            }
            
            // Only attack if close enough, don't die on collision
            if (distance < 35) {
                if (!this.playerStats.invulnerable && this.playerStats.damageCooldown <= 0) {
                    this.takeDamage(enemy.damage || 10); // Use enemy's scaled damage or fallback to 10
                    this.playerStats.damageCooldown = 1500; // 1.5 second cooldown between hits
                }
                // Don't remove enemy - keep them alive to be shot
            }
            
            return enemy.health > 0;
        });
        
        // Store previous position for movement detection
        this.playerStats.prevX = this.playerStats.x;
        this.playerStats.prevY = this.playerStats.y;
    }
    
    updateGoons() {
        const now = Date.now();
        
        this.familyMembers.forEach(goon => {
            // Find nearest enemy in range
            let nearestEnemy = null;
            let nearestDistance = Infinity;
            
            this.enemies.forEach(enemy => {
                const dx = (goon.x + 25) - (enemy.x + 25);
                const dy = (goon.y + 25) - (enemy.y + 25);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance <= goon.range && distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestEnemy = enemy;
                }
            });
            
            // Shoot at nearest enemy
            if (nearestEnemy && now - goon.lastShot >= goon.fireRate) {
                goon.lastShot = now;
                this.goonShoot(goon, nearestEnemy);
            }
        });
    }
    
    goonShoot(goon, target) {
        const angle = Math.atan2(
            (target.y + 25) - (goon.y + 25),
            (target.x + 25) - (goon.x + 25)
        );
        
        const bullet = {
            x: goon.x + 25,
            y: goon.y + 25,
            vx: Math.cos(angle) * 8,
            vy: Math.sin(angle) * 8,
            damage: goon.damage,
            element: this.createGoonBulletElement(goon.x + 25, goon.y + 25)
        };
        
        this.goonBullets.push(bullet);
    }
    
    createGoonBulletElement(x, y) {
        const bullet = document.createElement('div');
        bullet.className = 'goon-bullet';
        bullet.style.left = x + 'px';
        bullet.style.top = y + 'px';
        this.gameArea.appendChild(bullet);
        return bullet;
    }
    
    updateGoonBullets() {
        const rect = this.gameArea.getBoundingClientRect();
        
        this.goonBullets = this.goonBullets.filter(bullet => {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            
            bullet.element.style.left = bullet.x + 'px';
            bullet.element.style.top = bullet.y + 'px';
            
            if (bullet.x < 0 || bullet.x > rect.width || bullet.y < 0 || bullet.y > rect.height) {
                bullet.element.remove();
                return false;
            }
            
            return true;
        });
    }
    
    checkCollisions() {
        // Player bullets
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                const dx = bullet.x - (enemy.x + 25);
                const dy = bullet.y - (enemy.y + 25);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 30) {
                    enemy.health -= bullet.damage;
                    
                    // Lifesteal: heal player based on damage dealt
                    if (this.playerStats.lifestealAmount > 0) {
                        const healAmount = Math.floor(bullet.damage * this.playerStats.lifestealAmount);
                        this.playerStats.health = Math.min(this.playerStats.maxHealth, this.playerStats.health + healAmount);
                        this.updateUI();
                    }
                    
                    if (enemy.health <= 0) {
                        this.createHitEffect(enemy.x + 25, enemy.y + 25);
                        this.createXPPopup(enemy.x + 25, enemy.y + 25, enemy.value);
                        this.gainXP(enemy.value);
                        this.gainCash(enemy.value * 2);
                        this.playEnemyDeathSound();
                        enemy.element.remove();
                        this.enemies.splice(enemyIndex, 1);
                    }
                    
                    bullet.element.remove();
                    this.bullets.splice(bulletIndex, 1);
                }
            });
        });
        
        // Goon bullets
        this.goonBullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                const dx = bullet.x - (enemy.x + 25);
                const dy = bullet.y - (enemy.y + 25);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 30) {
                    enemy.health -= bullet.damage;
                    
                    if (enemy.health <= 0) {
                        this.createHitEffect(enemy.x + 25, enemy.y + 25);
                        this.createXPPopup(enemy.x + 25, enemy.y + 25, Math.floor(enemy.value * 0.5));
                        this.gainXP(Math.floor(enemy.value * 0.5));
                        this.gainCash(enemy.value);
                        this.playEnemyDeathSound();
                        enemy.element.remove();
                        this.enemies.splice(enemyIndex, 1);
                    }
                    
                    bullet.element.remove();
                    this.goonBullets.splice(bulletIndex, 1);
                }
            });
        });
    }
    
    takeDamage(amount) {
        this.playerStats.health -= amount;
        this.playerStats.invulnerable = true;
        this.playerStats.invulnerableTime = 2000; // 2 seconds of invulnerability
        
        this.createHitEffect(this.playerStats.x + 30, this.playerStats.y + 30);
        
        if (this.playerStats.health <= 0) {
            this.gameOver();
        }
        
        this.updateUI();
    }
    
    createHitEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'hit-effect';
        effect.style.left = (x - 30) + 'px';
        effect.style.top = (y - 30) + 'px';
        this.gameArea.appendChild(effect);
        
        setTimeout(() => effect.remove(), 300);
    }
    
    playEnemyDeathSound() {
        // Play the enemy death sound with error handling
        this.enemyDeathSound.currentTime = 0; // Reset to start for rapid playback
        this.enemyDeathSound.play().catch(error => {
            console.log('Could not play enemy death sound:', error);
        });
    }
    
    updateTimeDifficulty() {
        // Calculate time elapsed in seconds
        const timeElapsed = (Date.now() - this.gameStartTime) / 1000;
        
        // Increase difficulty by 10% every 30 seconds
        // Formula: 1 + (timeElapsed / 30) * 0.1
        this.timeDifficultyMultiplier = 1 + (Math.floor(timeElapsed / 30) * 0.1);
    }
    
    createXPPopup(x, y, value) {
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = `+${value} XP`;
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
        this.gameArea.appendChild(popup);
        
        setTimeout(() => popup.remove(), 1000);
    }
    
    gainXP(amount) {
        this.playerStats.xp += amount;
        
        while (this.playerStats.xp >= this.playerStats.xpToNext) {
            this.playerStats.xp -= this.playerStats.xpToNext;
            this.playerStats.level++;
            this.playerStats.xpToNext = Math.floor(this.playerStats.xpToNext * 1.5);
            this.playerStats.damage += 2;
            this.playerStats.speed += 0.5;
        }
        
        this.updateUI();
    }
    
    gainCash(amount) {
        this.playerStats.cash += amount;
        this.updateUI();
    }
    
    purchaseUpgrade(type) {
        const upgrade = this.upgrades[type];
        
        if (this.playerStats.cash >= upgrade.cost && upgrade.owned < upgrade.maxLevel) {
            this.playerStats.cash -= upgrade.cost;
            upgrade.owned++;
            
            switch(type) {
                case 'goon':
                    this.addFamilyMember();
                    upgrade.cost = Math.floor(upgrade.cost * 1.5);
                    break;
                case 'weapon':
                    this.playerStats.damage += 5;
                    upgrade.cost = Math.floor(upgrade.cost * 1.8);
                    break;
                case 'speed':
                    this.playerStats.speed += 2;
                    upgrade.cost = Math.floor(upgrade.cost * 1.6);
                    break;
                case 'firerate':
                    this.playerStats.fireRate = Math.max(100, this.playerStats.fireRate - 50);
                    upgrade.cost = Math.floor(upgrade.cost * 1.7);
                    break;
                case 'health':
                    this.playerStats.maxHealth += 25;
                    this.playerStats.health += 25;
                    upgrade.cost = Math.floor(upgrade.cost * 1.9);
                    break;
                case 'critical':
                    this.playerStats.criticalChance += 0.15; // 15% chance per level
                    upgrade.cost = Math.floor(upgrade.cost * 2.0);
                    break;
                case 'lifesteal':
                    this.playerStats.lifestealAmount += 0.1; // 10% lifesteal per level
                    upgrade.cost = Math.floor(upgrade.cost * 1.8);
                    break;
                case 'multishot':
                    this.playerStats.multishotCount += 1;
                    upgrade.cost = Math.floor(upgrade.cost * 2.2);
                    break;
            }
            
            this.updateUI();
        }
    }
    
    addFamilyMember() {
        const rect = this.gameArea.getBoundingClientRect();
        
        // Generate random position within game area bounds
        const margin = 60; // Keep goons away from edges
        const randomX = margin + Math.random() * (rect.width - margin * 2);
        const randomY = margin + Math.random() * (rect.height - margin * 2);
        
        const member = {
            id: Date.now() + Math.random(), // Unique ID for each goon
            name: `Goon ${this.familyMembers.length + 1}`,
            level: 1,
            x: randomX,
            y: randomY,
            damage: 5,
            fireRate: 1000,
            lastShot: 0,
            range: 200,
            upgradeCost: 50,
            element: this.createGoonElement(randomX, randomY)
        };
        
        this.familyMembers.push(member);
        this.updateFamilyList();
    }
    
    createGoonElement(x, y) {
        const goon = document.createElement('div');
        goon.className = 'goon-turret';
        goon.style.left = x + 'px';
        goon.style.top = y + 'px';
        goon.innerHTML = `
            <div class="goon-base">🛡️</div>
            <div class="goon-weapon">🔫</div>
        `;
        this.gameArea.appendChild(goon);
        return goon;
    }
    
    updateFamilyList() {
        const container = document.getElementById('family-members');
        container.innerHTML = `
            <div class="family-member">
                <span class="member-name">You (Boss)</span>
                <span class="member-level">Lv.${this.playerStats.level}</span>
            </div>
        `;
        
        this.familyMembers.forEach((member, index) => {
            const div = document.createElement('div');
            div.className = 'family-member';
            div.innerHTML = `
                <div class="member-info">
                    <span class="member-name">${member.name}</span>
                    <span class="member-level">Lv.${member.level}</span>
                </div>
                <div class="member-stats">
                    <span class="member-damage">⚔️ ${member.damage}</span>
                    <span class="member-range">📏 ${member.range}</span>
                </div>
                <button class="goon-upgrade-btn" data-goon-index="${index}">
                    Upgrade ($${member.upgradeCost})
                </button>
            `;
            container.appendChild(div);
        });
        
        // Add event listeners for goon upgrade buttons
        document.querySelectorAll('.goon-upgrade-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const goonIndex = parseInt(e.target.dataset.goonIndex);
                this.upgradeGoon(goonIndex);
            });
        });
    }
    
    upgradeGoon(index) {
        const goon = this.familyMembers[index];
        if (!goon) return;
        
        if (this.playerStats.cash >= goon.upgradeCost && goon.level < 10) {
            this.playerStats.cash -= goon.upgradeCost;
            goon.level++;
            goon.damage += 3;
            goon.range += 20;
            goon.fireRate = Math.max(300, goon.fireRate - 50);
            goon.upgradeCost = Math.floor(goon.upgradeCost * 1.5);
            
            this.updateUI();
            this.updateFamilyList();
        }
    }
    
    updateParticles() {
    }
    
    updateUI() {
        document.getElementById('health').textContent = Math.max(0, this.playerStats.health);
        document.getElementById('xp').textContent = this.playerStats.xp;
        document.getElementById('level').textContent = this.playerStats.level;
        document.getElementById('family-size').textContent = this.familyMembers.length + 1;
        document.getElementById('cash').textContent = `$${this.playerStats.cash}`;
        
        // Update health color based on remaining health
        const healthElement = document.getElementById('health');
        const healthPercent = this.playerStats.health / this.playerStats.maxHealth;
        if (healthPercent > 0.6) {
            healthElement.style.color = '#90ee90'; // Green
        } else if (healthPercent > 0.3) {
            healthElement.style.color = '#ffd700'; // Yellow
        } else {
            healthElement.style.color = '#ff6347'; // Red
        }
        
        document.querySelectorAll('.upgrade-btn').forEach(btn => {
            const type = btn.dataset.upgrade;
            const upgrade = this.upgrades[type];
            btn.disabled = this.playerStats.cash < upgrade.cost || upgrade.owned >= upgrade.maxLevel;
            btn.parentElement.querySelector('.cost').textContent = `Cost: $${upgrade.cost}`;
        });
        
        this.updateFamilyList();
    }
    
    gameOver() {
        this.gameRunning = false;
        document.getElementById('final-score').textContent = this.playerStats.level * 100 + this.playerStats.cash;
        document.getElementById('game-over').style.display = 'flex';
    }
    
    restart() {
        // Clean up game elements
        if (this.gameArea) {
            this.enemies.forEach(enemy => enemy.element.remove());
            this.bullets.forEach(bullet => bullet.element.remove());
            this.goonBullets.forEach(bullet => bullet.element.remove());
            this.familyMembers.forEach(goon => goon.element.remove());
        }
        
        // Reset all game state variables
        this.gameRunning = false;
        this.gameStarted = false;
        this.enemies = [];
        this.bullets = [];
        this.goonBullets = [];
        this.familyMembers = [];
        this.particles = [];
        this.keys = {};
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 2000;
        
        // Reset upgrades
        this.upgrades = {
            goon: { cost: 100, owned: 0, maxLevel: 10 },
            weapon: { cost: 250, owned: 0, maxLevel: 5 },
            speed: { cost: 150, owned: 0, maxLevel: 5 },
            firerate: { cost: 200, owned: 0, maxLevel: 5 },
            health: { cost: 300, owned: 0, maxLevel: 5 },
            critical: { cost: 400, owned: 0, maxLevel: 3 },
            lifesteal: { cost: 350, owned: 0, maxLevel: 3 },
            multishot: { cost: 500, owned: 0, maxLevel: 3 }
        };
        
        // Hide game over screen and show start screen
        document.getElementById('game-over').style.display = 'none';
        this.startScreen.style.display = 'flex';
        this.gameContainer.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RatMafiaGame();
});
