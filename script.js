class RatMafiaGame {
    constructor() {
        this.gameStarted = false;
        this.startScreen = document.getElementById('start-screen');
        this.gameContainer = document.getElementById('game-container');
        this.startButton = document.getElementById('start-game-btn');
        
        // Konami code for Japanese storyline
        this.konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
        this.konamiIndex = 0;
        this.japaneseMode = false; // Start in English, switch to Japanese with konami code
        
        // Japanese text for game elements
        this.japaneseText = {
            health: "体力",
            xp: "経験値",
            level: "レベル",
            familySize: "家族のサイズ",
            cash: "現金",
            mafiaUpgrades: "マフィアアップグレード",
            yourFamily: "あなたの家族",
            hireGoon: "ゴーンを雇う",
            betterWeapon: "より良い武器",
            speedBoost: "スピードブースト",
            fireRate: "発射速度",
            healthBoost: "体力ブースト",
            criticalHits: "クリティカルヒット",
            lifesteal: "ライフスティール",
            multishot: "マルチショット",
            cost: "費用",
            hire: "雇う",
            upgrade: "アップグレード",
            gameOver: "ゲームオーバー",
            yourDictatorshipHasFallen: "あなたの独裁政権は崩壊しました",
            finalScore: "最終スコア",
            startNewRegime: "新しい体制を開始",
            youBoss: "あなた（ボス）",
            howToPlay: "遊び方",
            instructions: "WASDまたは矢印キーで移動。マウスクリックでフィル・コリンズのクローンを撃つ。タブアウトで移動をクリア。"
        };
        
        // Japanese storyline text
        this.japaneseStory = {
            title: "ビルク独裁政権",
            paragraphs: [
                "昔々、世界は平和でした…少なくとも、重要な人が注意を払っていなかったからです。",
                
                "そこにビルクが現れました。",
                
                "ビルクには夢がありました。「成功する」や「人々を助ける」といった普通の夢ではありません。いいえ、ビルクの夢はシンプルでした：**世界最高の独裁者になること**。",
                
                "決意と疑わしいリーダーシップスキル、そして現金でいっぱいの財布を武器に、ビルクはすべての薄汚い路地、地下ジム、インターネット上の怪しい求人広告からゴーンを雇い始めました。",
                
                "計画は完璧でした…クイントが現れるまで。",
                
                "クイント、ビルクの宿敵は、長年準備をしていました。秘密の研究所の奥深くで、クイントは無敵の軍隊を築きました…**フィル・コリンズのクローン数千体**。",
                
                "今、世界は最大の対決に直面しています：ゴーンの軍隊を持つ台頭する独裁者 vs. 歌い、ドラムを叩くフィル・コリンズのクローンの無敵の力。",
                
                "世界支配の戦いが今始まります。",
                
                "ビルクとしてプレイしてください。ゴーンを雇ってください。コリンズのクローンを倒してください。独裁者になってください。さもなければ死んでください。💥"
            ]
        };
        
        this.setupStartScreen();
    }
    
    setupStartScreen() {
        this.startButton.addEventListener('click', () => {
            this.startGame();
        });
        
        // Add konami code listener
        document.addEventListener('keydown', (e) => {
            if (!this.gameStarted) {
                this.checkKonamiCode(e.key.toLowerCase());
            }
        });
    }
    
    checkKonamiCode(key) {
        if (key === this.konamiCode[this.konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === this.konamiCode.length) {
                this.activateJapaneseMode();
                this.konamiIndex = 0;
            }
        } else {
            this.konamiIndex = 0;
        }
    }
    
    activateJapaneseMode() {
        this.japaneseMode = true;
        this.updateStoryText();
        
        // Update game title and start button
        const gameTitle = document.querySelector('.game-title');
        const startButton = document.getElementById('start-game-btn');
        
        if (gameTitle) {
            gameTitle.textContent = this.japaneseStory.title;
        }
        
        if (startButton) {
            startButton.textContent = 'あなたの支配を開始';
        }
    }
    
    updateUIText() {
        if (!this.japaneseMode) return;
        
        // Update game header
        const healthLabel = document.querySelector('.stat-label');
        if (healthLabel) healthLabel.textContent = this.japaneseText.health + ':';
        
        // Update upgrade section
        const upgradeTitles = document.querySelectorAll('.upgrade-item h3');
        const upgradeTexts = [
            this.japaneseText.hireGoon,
            this.japaneseText.betterWeapon,
            this.japaneseText.speedBoost,
            this.japaneseText.fireRate,
            this.japaneseText.healthBoost,
            this.japaneseText.criticalHits,
            this.japaneseText.lifesteal,
            this.japaneseText.multishot
        ];
        
        upgradeTitles.forEach((title, index) => {
            if (upgradeTexts[index]) {
                title.textContent = upgradeTexts[index];
            }
        });
        
        // Update cost labels
        const costLabels = document.querySelectorAll('.cost');
        costLabels.forEach(label => {
            const currentText = label.textContent;
            if (currentText.includes('Cost:')) {
                label.textContent = currentText.replace('Cost:', this.japaneseText.cost + ':');
            }
        });
        
        // Update upgrade buttons
        const upgradeButtons = document.querySelectorAll('.upgrade-btn');
        upgradeButtons.forEach(btn => {
            if (btn.textContent === 'Hire') {
                btn.textContent = this.japaneseText.hire;
            } else if (btn.textContent === 'Upgrade') {
                btn.textContent = this.japaneseText.upgrade;
            }
        });
        
        // Update family section
        const familyTitle = document.querySelector('.family-list h2');
        if (familyTitle) familyTitle.textContent = this.japaneseText.yourFamily;
        
        // Update game over screen
        const gameOverTitle = document.querySelector('.game-over-content h2');
        if (gameOverTitle) gameOverTitle.textContent = this.japaneseText.gameOver;
        
        const gameOverText = document.querySelector('.game-over-content p');
        if (gameOverText) gameOverText.textContent = this.japaneseText.yourDictatorshipHasFallen;
        
        const finalScoreLabel = document.querySelector('#final-score').parentElement;
        if (finalScoreLabel) {
            finalScoreLabel.innerHTML = `${this.japaneseText.finalScore}: <span id="final-score">0</span>`;
        }
        
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) restartBtn.textContent = this.japaneseText.startNewRegime;
        
        // Update instructions
        const instructionsTitle = document.querySelector('.instructions strong');
        if (instructionsTitle) instructionsTitle.textContent = this.japaneseText.howToPlay + ':';
        
        const instructionsText = document.querySelector('.instructions');
        if (instructionsText && instructionsText.childNodes.length > 1) {
            instructionsText.childNodes[1].textContent = ' ' + this.japaneseText.instructions;
        }
    }
    
    updateStoryText() {
        const storyText = document.querySelector('.story-text');
        const gameTitle = document.querySelector('.game-title');
    
        if (this.japaneseMode && storyText && gameTitle) {
            gameTitle.textContent = "ビルク独裁政権";
            
            let htmlContent = '';
            this.japaneseStory.paragraphs.forEach((paragraph, index) => {
                if (paragraph.includes('**')) {
                    // Highlight text
                    htmlContent += `<p class="highlight">${paragraph.replace(/\*\*/g, '')}</p>`;
                } else if (paragraph.includes('💥')) {
                    // Final line
                    htmlContent += `<p class="final-line">${paragraph}</p>`;
                } else {
                    htmlContent += `<p>${paragraph}</p>`;
                }
            });
            
            storyText.innerHTML = htmlContent;
        }
    }
    
    startGame() {
        this.gameStarted = true;
        this.startScreen.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        
        // Initialize game components
        this.gameArea = document.getElementById('game-area');
        this.player = document.getElementById('player');
        
        // Center player in the middle of the battlefield
        const rect = this.gameArea.getBoundingClientRect();
        const centerX = (rect.width - 60) / 2; // 60 is player width
        const centerY = (rect.height - 60) / 2; // 60 is player height
        
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
            multishotCount: 1,
            direction: 'down', // Track player direction for sprite orientation
            isMoving: false,
            animationFrame: 0, // Current animation frame
            animationTimer: 0 // Timer for frame switching
        };
        
        this.familyMembers = [];
        this.enemies = [];
        this.bullets = [];
        this.goonBullets = [];
        this.enemyBullets = [];
        this.particles = [];
        this.powerUps = []; // New array for dropped power-ups
        
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
        
        // Power-up drop configuration
        this.powerUpConfig = {
            dropChance: 0.05, // 5% chance to drop power-up on enemy kill
            types: {
                health: { chance: 0.3, color: '#ff6347', icon: '❤️', value: 25 },
                weapon: { chance: 0.2, color: '#ffd700', icon: '⚔️', value: 5 },
                speed: { chance: 0.15, color: '#4ecdc4', icon: '🪶', value: 1 },
                firerate: { chance: 0.15, color: '#ff69b4', icon: '🔫', value: 50 },
                critical: { chance: 0.1, color: '#ff1493', icon: '💥', value: 0.1 },
                lifesteal: { chance: 0.05, color: '#90ee90', icon: '🩸', value: 0.05 },
                multishot: { chance: 0.05, color: '#daa520', icon: '🎯', value: 1 }
            }
        };
        
        this.keys = {};
        this.gameRunning = true;
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 5000; // Start with 5 seconds for easier beginning
        
        // Time-based difficulty scaling
        this.gameStartTime = Date.now();
        this.timeDifficultyMultiplier = 1;
        
        // Enemy types configuration with base chances
        this.enemyTypes = {
            regular: {
                baseChance: 0.9, // 90% chance at start
                healthMultiplier: 1,
                damageMultiplier: 1,
                speedMultiplier: 1,
                valueMultiplier: 1,
                color: '#ff6b6b',
                canShoot: false
            },
            shooter: {
                baseChance: 0.05, // 5% chance at start
                healthMultiplier: 0.7,
                damageMultiplier: 0.5,
                speedMultiplier: 0.8,
                valueMultiplier: 1.5,
                color: '#4ecdc4',
                canShoot: true,
                shootRange: 250,
                shootCooldown: 2000
            },
            tank: {
                baseChance: 0.05, // 5% chance at start
                healthMultiplier: 2.5,
                damageMultiplier: 2,
                speedMultiplier: 0.6,
                valueMultiplier: 2,
                color: '#95e77e',
                canShoot: false
            }
        };
        
        // Special enemy progression settings
        this.specialEnemyProgression = {
            maxShooterChance: 0.35, // Max 35% shooter chance
            maxTankChance: 0.25,    // Max 25% tank chance
            progressionTime: 120000, // 2 minutes to reach max chances
            startTime: Date.now()
        };
        
        // Load sound effects
        this.enemyDeathSound = new Audio('I Don\'t Care Anymore (2016 Remaster) (mp3cut.net).mp3');
        this.enemyDeathSound.volume = 0.3; // Set volume to 30%
        
        this.playerShootSound = new Audio('Cartoon Gun SFX (mp3cut.net).mp3');
        this.playerShootSound.volume = 0.4; // Set volume to 40%
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUIText();
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
        this.updateEnemyBullets();
        this.updateParticles();
        this.updatePowerUps(); // Add power-up updates
        this.checkCollisions();
        this.checkPowerUpPickups(); // Check for power-up collection
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
        
        // Track if player is moving and update direction
        this.playerStats.isMoving = (dx !== 0 || dy !== 0);
        
        // Update direction based on movement
        if (this.playerStats.isMoving) {
            if (Math.abs(dy) > Math.abs(dx)) {
                this.playerStats.direction = dy > 0 ? 'down' : 'up';
            } else {
                this.playerStats.direction = dx > 0 ? 'right' : 'left';
            }
        }
        
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
        
        // Update sprite orientation based on direction
        this.updatePlayerSprite();
        
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
    
    playPlayerShootSound() {
        // Play the player shoot sound with error handling
        this.playerShootSound.currentTime = 0; // Reset to start for rapid playback
        this.playerShootSound.play().catch(error => {
            console.log('Could not play player shoot sound:', error);
        });
    }
    
    updatePlayerSprite() {
        const ratFace = this.player.querySelector('.rat-face');
        const birukSprite = ratFace.querySelector('.biruk-sprite');
        
        if (!birukSprite) return;
        
        // Update animation timer
        this.playerStats.animationTimer += 16; // Assuming 60 FPS (16ms per frame)
        
        // Determine frame based on movement state and direction
        let frameClass = '';
        
        if (this.playerStats.isMoving) {
            // Walking animation - switch frames every 100ms for smoother movement
            if (this.playerStats.animationTimer >= 100) {
                this.playerStats.animationFrame = (this.playerStats.animationFrame + 1) % 2;
                this.playerStats.animationTimer = 0;
            }
            
            // Use appropriate walking frame based on direction
            switch(this.playerStats.direction) {
                case 'down':
                    frameClass = this.playerStats.animationFrame === 0 ? 'walk-down-1' : 'walk-down-2';
                    break;
                case 'up':
                    frameClass = this.playerStats.animationFrame === 0 ? 'walk-up-1' : 'walk-up-2';
                    break;
                case 'left':
                    frameClass = this.playerStats.animationFrame === 0 ? 'walk-left-1' : 'walk-left-2';
                    break;
                case 'right':
                    frameClass = this.playerStats.animationFrame === 0 ? 'walk-right-1' : 'walk-right-2';
                    break;
            }
        } else {
            // Idle animation - reset to first frame
            this.playerStats.animationFrame = 0;
            this.playerStats.animationTimer = 0;
            
            // Use appropriate idle frame based on direction
            switch(this.playerStats.direction) {
                case 'down':
                    frameClass = 'idle-down';
                    break;
                case 'up':
                    frameClass = 'idle-up';
                    break;
                case 'left':
                    frameClass = 'idle-left';
                    break;
                case 'right':
                    frameClass = 'idle-right';
                    break;
            }
        }
        
        // Remove all sprite classes and add the current one
        birukSprite.className = 'biruk-sprite ' + frameClass;
        
        // Update gun rotation based on player direction
        const weapon = this.player.querySelector('.weapon');
        if (weapon) {
            switch(this.playerStats.direction) {
                case 'up':
                    weapon.style.transform = 'rotate(90deg)';
                    weapon.style.top = '5px';
                    weapon.style.right = '20px';
                    break;
                case 'down':
                    weapon.style.transform = 'rotate(-90deg)';
                    weapon.style.top = '35px';
                    weapon.style.right = '20px';
                    break;
                case 'left':
                    weapon.style.transform = 'rotate(0deg)';
                    weapon.style.top = '15px';
                    weapon.style.right = '35px';
                    break;
                case 'right':
                    weapon.style.transform = 'rotate(180deg)';
                    weapon.style.transform = 'scaleY(1)';
                    weapon.style.transform = 'scaleX(-1)';
                    weapon.style.top = '15px';
                    weapon.style.right = '-10px';
                    break;
            }
        }
    }
    
    shoot(e) {
        const now = Date.now();
        if (now - this.playerStats.lastShot < this.playerStats.fireRate) return;
        
        this.playerStats.lastShot = now;
        
        // Play shoot sound
        this.playPlayerShootSound();
        
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
            const levelTier = Math.floor(this.playerStats.level / 10); // How many 10-level milestones passed
            const baseEnemies = 1;
            const additionalEnemies = levelTier; // Add 1 enemy per 10 levels
            const enemiesToSpawn = Math.min(baseEnemies + additionalEnemies, 5); // Max 5 enemies at once
            
            // Spawn multiple enemies
            for (let i = 0; i < enemiesToSpawn; i++) {
                // Add small delay between spawns to prevent them all appearing at exact same spot
                setTimeout(() => {
                    this.spawnEnemy();
                }, i * 200); // 200ms delay between each enemy spawn
            }
            
            this.enemySpawnTimer = 0;
            
            // Slower spawn rate: 5 seconds base - 0.03 seconds per level
            const baseInterval = 3000; // 3 seconds in milliseconds
            const levelReduction = this.playerStats.level * 30; // 0.03 seconds = 30ms per level
            this.enemySpawnInterval = Math.max(1500, baseInterval - levelReduction); // Minimum 1.5 seconds
        }
    }
    
    getCurrentEnemyChances() {
        const elapsed = Date.now() - this.specialEnemyProgression.startTime;
        const progression = Math.min(elapsed / this.specialEnemyProgression.progressionTime, 1);
        
        const shooterChance = this.enemyTypes.shooter.baseChance + 
            (this.specialEnemyProgression.maxShooterChance - this.enemyTypes.shooter.baseChance) * progression;
        const tankChance = this.enemyTypes.tank.baseChance + 
            (this.specialEnemyProgression.maxTankChance - this.enemyTypes.tank.baseChance) * progression;
        
        return {
            shooter: shooterChance,
            tank: tankChance,
            regular: Math.max(0, 1 - shooterChance - tankChance)
        };
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
        
        // Randomly select enemy type using progressive chances
        const chances = this.getCurrentEnemyChances();
        const rand = Math.random();
        let enemyType;
        
        if (rand < chances.regular) {
            enemyType = 'regular';
        } else if (rand < chances.regular + chances.shooter) {
            enemyType = 'shooter';
        } else {
            enemyType = 'tank';
        }
        
        const typeConfig = this.enemyTypes[enemyType];
        
        // Apply time-based difficulty scaling with enemy type multipliers
        const baseHealth = (30 + (this.playerStats.level * 5)) * typeConfig.healthMultiplier;
        const scaledHealth = Math.floor(baseHealth * this.timeDifficultyMultiplier);
        const baseValue = (10 + (this.playerStats.level * 2)) * typeConfig.valueMultiplier;
        const enemy = {
            x: x,
            y: y,
            health: scaledHealth,
            maxHealth: scaledHealth,
            damage: Math.floor((10 + this.playerStats.level * 2) * typeConfig.damageMultiplier * this.timeDifficultyMultiplier),
            speed: typeConfig.speedMultiplier,
            type: enemyType,
            value: Math.floor(baseValue * this.timeDifficultyMultiplier),
            element: this.createEnemyElement(x, y, enemyType)
        };

        if (enemyType === 'shooter') {
            enemy.shootRange = typeConfig.shootRange;
            enemy.shootCooldown = typeConfig.shootCooldown;
            enemy.lastShot = 0;
        }
        
        this.enemies.push(enemy);
    }
    
    createEnemyElement(x, y, enemyType) {
        const enemy = document.createElement('div');
        const typeConfig = this.enemyTypes[enemyType];
        
        enemy.className = `enemy-rat enemy-${enemyType}`;
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';
        
        // Different visual styles for different enemy types
        let enemyContent = '';
        let sizeClass = '';
        
        switch(enemyType) {
            case 'shooter':
                sizeClass = 'enemy-small';
                enemyContent = `
                    <div class="phil-face">
                        <div class="enemy-indicator">🔫</div>
                        <img src="https://m.media-amazon.com/images/I/91MvvblZdsL._UF1000,1000_QL80_.jpg" alt="Phil Collins" class="phil-image">
                    </div>
                `;
                break;

            case 'tank':
                sizeClass = 'enemy-large';
                enemyContent = `
                    <div class="phil-face">
                        <div class="enemy-indicator">🛡️</div>
                        <img src="https://m.media-amazon.com/images/I/91MvvblZdsL._UF1000,1000_QL80_.jpg" alt="Phil Collins" class="phil-image">
                    </div>
                `;
                break;

            default: // regular
                sizeClass = 'enemy-normal';
                enemyContent = `
                    <div class="phil-face">
                        <img src="https://m.media-amazon.com/images/I/91MvvblZdsL._UF1000,1000_QL80_.jpg" alt="Phil Collins" class="phil-image">
                    </div>
                `;
        }
        
        enemy.innerHTML = enemyContent;
        enemy.classList.add(sizeClass);
        
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
            
            // Handle shooter enemy behavior
            if (enemy.type === 'shooter') {
                const now = Date.now();
                
                // Shoot at player if in range
                if (distance <= enemy.shootRange && now - enemy.lastShot >= enemy.shootCooldown) {
                    enemy.lastShot = now;
                    this.enemyShoot(enemy);
                }
                // Keep distance from player, move away if too close
                if (distance < enemy.shootRange - 50) {
                    // Move away from player
                    const moveSpeed = 1.5 * enemy.speed;
                    const moveX = -(dx / distance) * moveSpeed;
                    const moveY = -(dy / distance) * moveSpeed
                    enemy.x += moveX;
                    enemy.y += moveY;
                } else if (distance > enemy.shootRange) {
                    // Move towards player if too far
                    const moveSpeed = playerMoving ? 1.5 * enemy.speed : 2 * enemy.speed;
                    const moveX = (dx / distance) * moveSpeed;
                    const moveY = (dy / distance) * moveSpeed;
                    enemy.x += moveX;
                    enemy.y += moveY;
                }

            } else {
                // Regular and tank behavior: move towards player
                if (distance > 35) { // Keep distance from player
                    const moveSpeed = playerMoving ? (2 * enemy.speed) : (3 * enemy.speed);
                    const moveX = (dx / distance) * moveSpeed;
                    const moveY = (dy / distance) * moveSpeed;
                    enemy.x += moveX;
                    enemy.y += moveY;
                }
            }
            
            enemy.element.style.left = enemy.x + 'px';
            enemy.element.style.top = enemy.y + 'px';
            
            // Only attack if close enough (melee enemies only)
            if (distance < 35 && enemy.type !== 'shooter') {
                if (!this.playerStats.invulnerable && this.playerStats.damageCooldown <= 0) {
                    this.takeDamage(enemy.damage || 10);
                    this.playerStats.damageCooldown = 1500;
                }
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
    
    enemyShoot(enemy) {
        const angle = Math.atan2(
            (this.playerStats.y + 30) - (enemy.y + 25),
            (this.playerStats.x + 30) - (enemy.x + 25)
        );
        
        const bullet = {
            x: enemy.x + 25,
            y: enemy.y + 25,
            vx: Math.cos(angle) * 6,
            vy: Math.sin(angle) * 6,
            damage: enemy.damage,
            element: this.createEnemyBulletElement(enemy.x + 25, enemy.y + 25)
        };
        
        this.enemyBullets.push(bullet);
    }
    
    createEnemyBulletElement(x, y) {
        const bullet = document.createElement('div');
        bullet.className = 'enemy-bullet';
        bullet.style.left = x + 'px';
        bullet.style.top = y + 'px';
        this.gameArea.appendChild(bullet);
        return bullet;
    }
    
    updateEnemyBullets() {
        const rect = this.gameArea.getBoundingClientRect();
        
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;

            bullet.element.style.left = bullet.x + 'px';
            bullet.element.style.top = bullet.y + 'px';
            
            // Check collision with player
            const dx = bullet.x - (this.playerStats.x + 30);
            const dy = bullet.y - (this.playerStats.y + 30);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 25) {
                if (!this.playerStats.invulnerable && this.playerStats.damageCooldown <= 0) {
                    this.takeDamage(bullet.damage);
                    this.playerStats.damageCooldown = 500; // Shorter cooldown for bullets
                }
                bullet.element.remove();
                return false;
            }
            
            if (bullet.x < 0 || bullet.x > rect.width || bullet.y < 0 || bullet.y > rect.height) {
                bullet.element.remove();
                return false;
            }
            
            return true;
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
                        this.dropPowerUp(enemy.x + 25, enemy.y + 25); // Drop power-up chance
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
    
    dropPowerUp(x, y) {
        // Check if power-up should drop (15% chance)
        if (Math.random() > this.powerUpConfig.dropChance) return;
        
        // Select random power-up type based on chances
        const rand = Math.random();
        let cumulativeChance = 0;
        let selectedType = null;
        
        for (const [type, config] of Object.entries(this.powerUpConfig.types)) {
            cumulativeChance += config.chance;
            if (rand <= cumulativeChance) {
                selectedType = type;
                break;
            }
        }
        
        if (!selectedType) return;
        
        const powerUp = {
            x: x,
            y: y,
            type: selectedType,
            value: this.powerUpConfig.types[selectedType].value,
            color: this.powerUpConfig.types[selectedType].color,
            icon: this.powerUpConfig.types[selectedType].icon,
            element: this.createPowerUpElement(x, y, selectedType),
            lifetime: 5000, // 5 seconds before disappearing
            created: Date.now()
        };
        
        this.powerUps.push(powerUp);
    }
    
    createPowerUpElement(x, y, type) {
        const powerUp = document.createElement('div');
        powerUp.className = 'power-up';
        powerUp.style.left = x + 'px';
        powerUp.style.top = y + 'px';
        
        const config = this.powerUpConfig.types[type];
        powerUp.innerHTML = `
            <div class="power-up-icon" style="color: ${config.color};">
                ${config.icon}
            </div>
        `;
        
        this.gameArea.appendChild(powerUp);
        return powerUp;
    }
    
    updatePowerUps() {
        const now = Date.now();
        this.powerUps = this.powerUps.filter(powerUp => {
            // Remove expired power-ups
            if (now - powerUp.created > powerUp.lifetime) {
                powerUp.element.remove();
                return false;
            }
            
            // Floating animation
            const floatOffset = Math.sin((now - powerUp.created) / 200) * 5;
            powerUp.element.style.transform = `translateY(${floatOffset}px)`;
            
            return true;
        });
    }
    
    checkPowerUpPickups() {
        this.powerUps = this.powerUps.filter(powerUp => {
            const dx = (this.playerStats.x + 30) - powerUp.x;
            const dy = (this.playerStats.y + 30) - powerUp.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 40) { // Pickup range
                this.collectPowerUp(powerUp);
                powerUp.element.remove();
                return false;
            }
            
            return true;
        });
    }
    
    collectPowerUp(powerUp) {
        switch(powerUp.type) {
            case 'health':
                this.playerStats.health = Math.min(this.playerStats.maxHealth, this.playerStats.health + powerUp.value);
                break;
            case 'weapon':
                this.playerStats.damage += powerUp.value;
                break;
            case 'speed':
                this.playerStats.speed += powerUp.value;
                break;
            case 'firerate':
                this.playerStats.fireRate = Math.max(100, this.playerStats.fireRate - powerUp.value);
                break;
            case 'critical':
                this.playerStats.criticalChance = Math.min(1, this.playerStats.criticalChance + powerUp.value);
                break;
            case 'lifesteal':
                this.playerStats.lifestealAmount = Math.min(1, this.playerStats.lifestealAmount + powerUp.value);
                break;
            case 'multishot':
                this.playerStats.multishotCount += powerUp.value;
                break;
        }
        
        // Create pickup effect
        this.createPowerUpEffect(powerUp.x, powerUp.y, powerUp.color);
        
        // Show pickup notification
        this.showPowerUpNotification(powerUp.type);
        
        this.updateUI();
    }
    
    createPowerUpEffect(x, y, color) {
        const effect = document.createElement('div');
        effect.className = 'power-up-effect';
        effect.style.left = (x - 20) + 'px';
        effect.style.top = (y - 20) + 'px';
        effect.style.borderColor = color;
        this.gameArea.appendChild(effect);
        
        setTimeout(() => effect.remove(), 500);
    }
    
    showPowerUpNotification(type) {
        const notification = document.createElement('div');
        notification.className = 'power-up-notification';
        
        const config = this.powerUpConfig.types[type];
        const typeName = type.charAt(0).toUpperCase() + type.slice(1);
        
        notification.innerHTML = `${config.icon} ${typeName} +${config.value}`;
        notification.style.color = config.color;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
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
            <div class="goon-base">
                <img src="mafia_asset.jpg" alt="Goon" class="goon-image">
            </div>
        `;
        this.gameArea.appendChild(goon);
        return goon;
    }
    
    updateFamilyList() {
        const container = document.getElementById('family-members');
        const bossName = this.japaneseMode ? this.japaneseText.youBoss : 'You (Boss)';
        container.innerHTML = `
            <div class="family-member">
                <span class="member-name">${bossName}</span>
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

        

        // Update goon upgrade buttons text if in Japanese mode
        if (this.japaneseMode) {
            document.querySelectorAll('.goon-upgrade-btn').forEach(btn => {
                const currentText = btn.textContent;
                if (currentText.includes('Upgrade')) {
                    btn.textContent = currentText.replace('Upgrade', this.japaneseText.upgrade);
                }
            });
        }
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
        
        // Update stat labels if in Japanese mode
        if (this.japaneseMode) {
            const statLabels = document.querySelectorAll('.stat-label');
            const labelTexts = [this.japaneseText.health, this.japaneseText.xp, this.japaneseText.level, this.japaneseText.familySize, this.japaneseText.cash];
            statLabels.forEach((label, index) => {
                if (labelTexts[index]) {
                    label.textContent = labelTexts[index] + ':';
                }
            });
        }
        
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
        
        // Update cost labels and buttons if in Japanese mode
        if (this.japaneseMode) {
            document.querySelectorAll('.cost').forEach(label => {
                const currentText = label.textContent;
                if (currentText.includes('Cost:')) {
                    label.textContent = currentText.replace('Cost:', this.japaneseText.cost + ':');
                }
            });

            document.querySelectorAll('.upgrade-btn').forEach(btn => {
                if (btn.textContent === 'Hire') {
                    btn.textContent = this.japaneseText.hire;
                } else if (btn.textContent === 'Upgrade') {
                    btn.textContent = this.japaneseText.upgrade;
                }
            });
        }
        
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
            this.enemyBullets.forEach(bullet => bullet.element.remove());
            this.familyMembers.forEach(goon => goon.element.remove());
        }
        

        // Reset all game state variables
        this.gameRunning = false;
        this.gameStarted = false;
        this.enemies = [];
        this.bullets = [];
        this.goonBullets = [];
        this.enemyBullets = [];
        this.familyMembers = [];
        this.particles = [];
        this.keys = {};
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 5000; // Reset to 5 seconds
        
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
        

        // Maintain Japanese mode and update start screen text
        if (this.japaneseMode) {
            this.updateStoryText();
        } else {
            this.konamiIndex = 0;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RatMafiaGame();
});