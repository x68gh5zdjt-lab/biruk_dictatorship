# Biruk Dictatorship

## Story

Long ago, the world was peaceful… mostly because nobody important was paying attention.

Then came Biruk.

Biruk had a dream. Not a normal dream like "be successful" or "help people." No. Biruk's dream was simple: **Become the world's greatest dictator.**

Armed with nothing but determination, questionable leadership skills, and a wallet full of cash, Biruk began hiring goons from every shady alley, underground gym, and suspicious job listing on the internet.

The plan was perfect… until Quint showed up.

Quint, Biruk's sworn enemy, had been preparing for years. Hidden deep within a secret laboratory, Quint built an unstoppable army… **Thousands of cloned versions of Phil Collins.**

Now the world faces its greatest conflict: A rising dictator with an army of goons vs. an unstoppable force of singing, drumming Phil Collins clones.

The battle for world domination begins now.

## How to Play

### Click to play: [Link](https://marcusceradini.github.io/biruk_dictatorship/)

### Controls
- **WASD** or **Arrow Keys** - Move Biruk
- **Mouse Click** - Shoot at Phil Collins clones
- **Tab Out** - Clears movement (prevents stuck movement)

### Objective
Play as Biruk. Hire goons. Defeat the Collins clones. Become the dictator. Or die trying. 💥

## Game Features

### Core Gameplay
- **Health System**: Start with 100 HP, take damage from enemy contact
- **Damage Cooldown**: 1.5 second invulnerability after taking damage
- **Invulnerability Frames**: Visual flashing when damaged
- **Enemy AI**: Phil Collins clones hunt you down relentlessly
- **Centered Start**: Player begins in the middle of the battlefield

### Enemy Types & Progressive Spawning
- **Regular Enemies** (90% at start): Standard Phil Collins clones with balanced stats
- **Shooter Enemies** (5% at start → 35% max): Attack from distance with projectiles
- **Tank Enemies** (5% at start → 25% max): Higher health and damage, slower movement
- **Progressive Difficulty**: Special enemy chances increase over 2 minutes
- **Visual Distinction**: Different border colors and sizes for each enemy type
- **Slower Spawning**: 3-second initial spawn rate for easier beginner experience

### Enhanced Progressive Difficulty System
- **Multi-Spawn Waves**: Enemy count increases based on level milestones
  - Levels 1-9: 1 enemy per wave
  - Levels 10-19: 2 enemies per wave  
  - Levels 20-29: 3 enemies per wave
  - Levels 30-39: 4 enemies per wave
  - Levels 40+: 5 enemies per wave (maximum)
- **Level-Based Enemy Scaling**: 
  - Health: `30 + (player level × 5)` base health
  - Damage: `10 + (player level × 2)` base damage
  - Rewards: `10 + (player level × 2)` base value
- **Time-Based Difficulty**: 10% enemy strength increase every 30 seconds
- **Dynamic Spawn Rate**: Starts at 3 seconds, reduces by 30ms per level (minimum 1.5 seconds)
- **Delayed Spawns**: 200ms delay between multiple enemies in same wave

### Combat System
- **Shooting Mechanics**: Click to shoot bullets at enemies
- **Cartoon Gun SFX**: Satisfying sound effects for player shots
- **Enemy Projectiles**: Shooter enemies fire bullets at the player
- **Smart Enemies**: Move faster when you're stationary
- **No Collision Kills**: Only bullets can defeat enemies

### Progression System
- **Experience Points**: Gain XP by defeating enemies
- **Level Up**: Increase stats and become stronger
- **Cash Economy**: Earn money to purchase upgrades

### Mafia Family System
- **Hire Goons**: Add automated turret helpers to your family
- **Turret AI**: Goons automatically shoot at nearby enemies
- **Strategic Defense**: Position goons for maximum coverage
- **Visual Update**: Goons now use mafia_asset.jpg with transparent background

### Power-Up System
- **Random Drops**: 8% chance for enemies to drop power-ups on defeat
- **7 Power-Up Types**: Health, Weapon, Speed, Fire Rate, Critical, Lifesteal, Multishot
- **Limited Lifetime**: Power-ups disappear after 15 seconds
- **Proximity Collection**: Must walk over power-ups to collect them
- **Visual Effects**: Glowing orbs with unique icons and collection animations
- **Strategic Value**: Risk vs reward gameplay for collecting power-ups

### Goon Progression
- **Individual Leveling**: Each goon can be upgraded separately
- **Goon Stats**: Damage, range, and fire rate improvements
- **Strategic Placement**: Position goons for optimal battlefield coverage
- **Upgrade Costs**: Scales with goon level

### Upgrades Shop
1. **Hire Goon** ($100+) - Adds automated turret to your family (max 10)
2. **Better Weapon** ($250+) - Increases bullet damage (max 5 levels)
3. **Speed Boost** ($150+) - Move faster around the battlefield (max 5 levels)
4. **Fire Rate** ($200+) - Shoot bullets more rapidly (max 5 levels)
5. **Health Boost** ($300+) - Increase maximum health (max 5 levels)
6. **Critical Hits** ($400+) - 15% chance for double damage per level (max 3)
7. **Lifesteal** ($350+) - Heal 10% of damage dealt per level (max 3)
8. **Multi-shot** ($500+) - 5% chance per level for additional bullets in spread pattern (max 3)

### Audio Features
- **Enemy Death Sounds**: Phil Collins "I Don't Care Anymore" plays on enemy defeat
- **Player Shoot Sounds**: Cartoon gun SFX for satisfying combat feedback
- **Volume Control**: Balanced audio levels for gameplay comfort

### Visual Features
- **Player Character**: Biruk's LinkedIn photo as the player avatar
- **Battlefield Background**: Capitol building setting for thematic dictatorship takeover
- **Enemy Faces**: Real images of Phil Collins clones
- **Visual Distinction**: Border colors differentiate enemy types (no boxes)
- **Smooth Animations**: Bullet trails, hit effects, movement
- **Health Indicators**: Color-coded health display (Green/Yellow/Red)
- **XP Popups**: Visual feedback for defeated enemies
- **No Text Selection**: Prevents highlighting in game area for better UX

### Easter Eggs
- **_____**: Do you know the konami code? At the start enter it besides the last input in the 
sequence to unlock a secret.

## Game Strategy

### Early Game (Levels 1-9)
- Focus on survival and earning initial cash
- Hire your first goon as soon as possible for defensive coverage
- Keep moving to avoid enemy swarms
- Prioritize weapon upgrades for faster kills
- Learn to identify different enemy types and their behaviors

### Mid Game (Levels 10-19)
- **Critical Milestone**: Level 10 brings 2x enemy spawns
- Build a balanced team of goons (2-4 recommended)
- Invest in health upgrades to survive increased damage
- Watch out for shooter enemies - dodge their projectiles
- Consider critical hits or lifesteal for sustained combat

### Late Game (Levels 20+)
- **Enemy Waves**: Face 3+ enemies per spawn wave
- Time-based difficulty makes enemies significantly stronger
- Multi-shot becomes essential for crowd control
- Tank enemies require more damage to defeat
- Max out health and damage upgrades
- Position goons strategically for maximum coverage

### Advanced Tactics
1. **Enemy Prioritization**: Focus on shooter enemies first to avoid projectiles
2. **Tank Management**: Save ammo for tank enemies with higher health
3. **Timing is Everything**: Complete levels quickly before time-scaling makes enemies too strong
4. **Economy Management**: Save cash for level milestones when difficulty spikes
5. **Goon Networks**: Create overlapping fields of fire with multiple goons
6. **Upgrade Synergy**: Combine lifesteal with multishot for maximum healing
7. **Critical Mass**: Stack critical hit chance with damage upgrades for burst damage
8. **Konami Code**: Discover the hidden Japanese mode for a unique experience

## Technical Details

### Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support

### Performance Notes
- Runs at 60 FPS on modern browsers
- Efficient collision detection
- Optimized particle effects
- No text selection in game area prevents UI interference

## Tips & Tricks

1. **Never Stop Moving**: Stationary targets take more damage from enemies
2. **Enemy Recognition**: Learn visual cues for different enemy types
3. **Goon Placement**: Hire goons early and spread them for maximum coverage
4. **Economy Management**: Balance between upgrades and hiring, save for level milestones
5. **Enemy Patterns**: Learn Phil Collins movement behaviors and spawn timing
6. **Health Management**: Use invulnerability frames strategically
7. **Level Milestones**: Prepare for difficulty spikes at levels 10, 20, 30...
8. **Time Pressure**: Complete objectives quickly - enemies get 10% stronger every 30 seconds
9. **Sound Cues**: Listen for enemy death and shoot sounds in chaotic battles
10. **Upgrade Priority**: Health → Weapon → Goons → Special abilities for balanced progression
11. **Multi-shot Mastery**: Use spread patterns to hit multiple enemies in tight groups
12. **Lifesteal Synergy**: Combine with multishot for massive healing in crowded situations
13. **Projectile Dodging**: Learn to dodge shooter enemy bullets for survival
14. **Secret Discovery**: Try classic gaming codes on the start screen...

## Credits

**Created by**: Biruk's Dictatorship Development Team  
**Enemy Design**: Quint's Secret Laboratory  
**Story**: Biruk's Manifesto  
**Player Character**: Biruk's LinkedIn Professional Photo  
**Battlefield**: United States Capitol Building  
**Audio**: Cartoon Gun Sound Effects 
**Music Credit**: Collins, Phil "I Don't Care Anymore". Hello, I Must Be Going.  1983

---
*統計メロで眠らないで*

*Remember: In the world of Biruk Dictatorship, only the ruthless survive. Will you become the world's greatest dictator, or will Phil Collins' clones bring your reign to an end?*
