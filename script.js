document.addEventListener('DOMContentLoaded', function() {
    // 初始化標題動畫效果
    initMagicTitle();
    
    // 定義卡牌數據
    const cardData = {
        planet: [
            { id: 1, name: '太陽 (Sun)' },
            { id: 2, name: '月亮 (Moon)' },
            { id: 3, name: '水星 (Mercury)' },
            { id: 4, name: '金星 (Venus)' },
            { id: 5, name: '火星 (Mars)' },
            { id: 6, name: '木星 (Jupiter)' },
            { id: 7, name: '土星 (Saturn)' },
            { id: 8, name: '天王星 (Uranus)' },
            { id: 9, name: '海王星 (Neptune)' },
            { id: 10, name: '冥王星 (Pluto)' },
            { id: 11, name: '北交點 (North Node)' },
            { id: 12, name: '南交點 (South Node)' }
        ],
        star: [
            { id: 1, name: '白羊座 (Aries)' },
            { id: 2, name: '金牛座 (Taurus)' },
            { id: 3, name: '雙子座 (Gemini)' },
            { id: 4, name: '巨蟹座 (Cancer)' },
            { id: 5, name: '獅子座 (Leo)' },
            { id: 6, name: '處女座 (Virgo)' },
            { id: 7, name: '天秤座 (Libra)' },
            { id: 8, name: '天蠍座 (Scorpio)' },
            { id: 9, name: '射手座 (Sagittarius)' },
            { id: 10, name: '摩羯座 (Capricorn)' },
            { id: 11, name: '水瓶座 (Aquarius)' },
            { id: 12, name: '雙魚座 (Pisces)' }
        ],
        house: [
            { id: 1, name: '第一宮' },
            { id: 2, name: '第二宮' },
            { id: 3, name: '第三宮' },
            { id: 4, name: '第四宮' },
            { id: 5, name: '第五宮' },
            { id: 6, name: '第六宮' },
            { id: 7, name: '第七宮' },
            { id: 8, name: '第八宮' },
            { id: 9, name: '第九宮' },
            { id: 10, name: '第十宮' },
            { id: 11, name: '第十一宮' },
            { id: 12, name: '第十二宮' }
        ]
    };

    // 初始化魔幻標題效果
    function initMagicTitle() {
        const title = document.getElementById('magic-title');
        const starsContainer = title.querySelector('.title-stars');
        
        // 創建星星元素
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'title-star';
            star.style.width = (Math.random() * 4 + 1) + 'px';
            star.style.height = star.style.width;
            starsContainer.appendChild(star);
        }
        
        // 標題點擊動畫
        title.addEventListener('click', function() {
            // 為每個字母添加浮動動畫
            const letters = title.querySelectorAll('.magic-letter');
            letters.forEach((letter, index) => {
                anime({
                    targets: letter,
                    translateY: [0, -20, 0],
                    scale: [1, 1.2, 1],
                    rotate: () => anime.random(-10, 10) + 'deg',
                    duration: 800,
                    easing: 'easeInOutQuad',
                    delay: index * 100
                });
            });
            
            // 觸發星星動畫
            animateStars();
        });
        
        // 初始觸發一次動畫
        setTimeout(() => {
            title.click();
        }, 1000);
        
        // 定期觸發星星動畫
        setInterval(subtleStarAnimation, 3000);
    }
    
    // 星星動畫
    function animateStars() {
        const stars = document.querySelectorAll('.title-star');
        const title = document.getElementById('magic-title');
        const titleRect = title.getBoundingClientRect();
        
        stars.forEach((star, index) => {
            // 隨機位置
            const x = Math.random() * titleRect.width;
            const y = Math.random() * titleRect.height;
            
            // 設置星星位置和大小
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            
            // 動畫
            anime({
                targets: star,
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                duration: anime.random(1000, 2000),
                easing: 'easeOutQuad',
                delay: index * 20
            });
        });
    }
    
    // 微妙的星星動畫
    function subtleStarAnimation() {
        const stars = document.querySelectorAll('.title-star');
        const title = document.getElementById('magic-title');
        const titleRect = title.getBoundingClientRect();
        
        // 隨機選擇一些星星
        const starCount = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < starCount; i++) {
            const index = Math.floor(Math.random() * stars.length);
            const star = stars[index];
            
            // 隨機位置
            const x = Math.random() * titleRect.width;
            const y = Math.random() * titleRect.height;
            
            // 設置星星位置
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            
            // 動畫
            anime({
                targets: star,
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                duration: anime.random(1000, 2000),
                easing: 'easeOutQuad'
            });
        }
    }

    // 用於隨機排列陣列的函數
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // 跟踪已選擇的卡牌
    const selectedCards = {
        planet: null,
        star: null,
        house: null
    };

    // 初始化卡牌
    initializeCards('planet');
    initializeCards('star');
    initializeCards('house');

    // 設置重置按鈕
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetAllCards);
    
    // 設置複製按鈕
    const copyButton = document.getElementById('copy-button');
    copyButton.addEventListener('click', copyResultText);

    // 檢查是否所有卡牌都已選
    function checkAllCardsSelected() {
        if (selectedCards.planet && selectedCards.star && selectedCards.house) {
            showResult();
            // 顯示重置按鈕
            resetButton.style.display = 'inline-block';
        }
    }
    
    // 複製結果文字
    function copyResultText() {
        const planetName = cardData.planet.find(p => p.id === selectedCards.planet).name;
        const starName = cardData.star.find(s => s.id === selectedCards.star).name;
        const houseName = cardData.house.find(h => h.id === selectedCards.house).name;
        
        const resultText = `我的占星卡牌結果：
行星：${planetName}
星座：${starName}
宮位：${houseName}

這個獨特的組合揭示了我的宇宙能量軌跡...
`;
        
        // 複製到剪貼簿
        navigator.clipboard.writeText(resultText)
            .then(() => {
                // 添加動畫效果
                copyButton.classList.add('copy-animation');
                copyButton.innerHTML = '<i class="fas fa-check"></i> 已複製';
                
                // 2秒後恢復原樣
                setTimeout(() => {
                    copyButton.classList.remove('copy-animation');
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> 複製結果';
                }, 2000);
            })
            .catch(err => {
                console.error('複製失敗: ', err);
                alert('複製失敗，請手動複製文字');
            });
    }

    // 顯示結果
    function showResult() {
        const planetName = cardData.planet.find(p => p.id === selectedCards.planet).name;
        const starName = cardData.star.find(s => s.id === selectedCards.star).name;
        const houseName = cardData.house.find(h => h.id === selectedCards.house).name;
        
        const resultText = `您抽到的卡片組合是：<br>
                           行星：${planetName}<br>
                           星座：${starName}<br>
                           宮位：${houseName}<br><br>
                           這個獨特的組合揭示了您的宇宙能量軌跡...`;
        
        document.getElementById('result-text').innerHTML = resultText;
        
        // 顯示結果區域
        const results = document.getElementById('results');
        results.style.display = 'block';
        
        // 添加展示動畫
        anime({
            targets: '#results',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    // 重置所有卡牌
    function resetAllCards() {
        // 隱藏結果和重置按鈕
        document.getElementById('results').style.display = 'none';
        resetButton.style.display = 'none';
        
        // 清空選擇的卡牌
        selectedCards.planet = null;
        selectedCards.star = null;
        selectedCards.house = null;
        
        // 重置卡牌名稱
        document.getElementById('planet-name').textContent = '';
        document.getElementById('star-name').textContent = '';
        document.getElementById('house-name').textContent = '';
        
        // 隱藏已選卡牌
        const selectedPlanet = document.getElementById('selected-planet');
        const selectedStar = document.getElementById('selected-star');
        const selectedHouse = document.getElementById('selected-house');
        
        selectedPlanet.style.opacity = '0';
        selectedPlanet.style.transform = 'translateX(-50%) scale(0)';
        selectedPlanet.style.backgroundImage = '';
        
        selectedStar.style.opacity = '0';
        selectedStar.style.transform = 'translateX(-50%) scale(0)';
        selectedStar.style.backgroundImage = '';
        
        selectedHouse.style.opacity = '0';
        selectedHouse.style.transform = 'translateX(-50%) scale(0)';
        selectedHouse.style.backgroundImage = '';
        
        // 移除選中樣式
        document.getElementById('planet-cards').classList.remove('selected');
        document.getElementById('star-cards').classList.remove('selected');
        document.getElementById('house-cards').classList.remove('selected');
        
        // 重新初始化卡牌
        setTimeout(() => {
            initializeCards('planet');
            initializeCards('star');
            initializeCards('house');
        }, 500);
    }

    // 初始化特定類型的卡牌
    function initializeCards(type) {
        const container = document.getElementById(`${type}-cards`);
        const cards = [];
        
        // 清空容器
        container.innerHTML = '';
        
        // 創建隨機順序的索引陣列
        const shuffledIndices = shuffleArray([...Array(12).keys()]);
        
        // 創建12張卡牌並排列
        for (let i = 0; i < 12; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            
            // 使用隨機順序的索引來設置卡牌ID
            const shuffledIndex = shuffledIndices[i];
            const cardId = cardData[type][shuffledIndex].id;
            card.dataset.id = cardId;
            
            // 計算行和列
            const row = Math.floor(i / 4);
            const col = i % 4;
            
            // 設置卡牌位置，以網格形式排列
            card.style.left = `calc(25% * ${col})`;
            card.style.top = `calc(80px * ${row})`;
            card.style.transform = `rotate(${(Math.random() * 10) - 5}deg)`;
            card.style.zIndex = i;
            
            // 添加簡單的陰影和邊框，使卡牌更容易識別
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
            card.style.border = '2px solid rgba(255, 215, 0, 0.3)';
            
            // 點擊事件
            card.addEventListener('click', function() {
                if (selectedCards[type]) return;  // 如果已經選過卡，不再允許選擇
                
                // 獲取卡牌ID
                const cardId = parseInt(this.dataset.id);
                selectedCards[type] = cardId;
                
                // 添加選中樣式
                container.classList.add('selected');
                
                // 移除其他卡牌
                const allCards = container.querySelectorAll('.card');
                allCards.forEach(c => {
                    if (c !== this) {
                        anime({
                            targets: c,
                            opacity: 0,
                            scale: 0,
                            rotate: function() {
                                return anime.random(-360, 360);
                            },
                            translateX: function() {
                                return anime.random(-500, 500);
                            },
                            translateY: function() {
                                return anime.random(-500, 500);
                            },
                            duration: 1000,
                            easing: 'easeOutQuad',
                            complete: function(anim) {
                                c.remove();
                            }
                        });
                    }
                });
                
                // 翻轉選中的卡牌
                anime({
                    targets: this,
                    scale: [1, 1.5, 1],
                    rotateY: '180deg',
                    duration: 1000,
                    easing: 'easeInOutSine',
                    complete: function(anim) {
                        // 顯示選中的卡牌圖像
                        const selectedCard = document.getElementById(`selected-${type}`);
                        selectedCard.style.backgroundImage = `url(${type}/${type}_${String(cardId).padStart(2, '0')}.png)`;
                        selectedCard.style.opacity = 1;
                        selectedCard.style.transform = 'translateX(-50%) scale(1)';
                        
                        // 顯示卡牌名稱
                        document.getElementById(`${type}-name`).textContent = cardData[type].find(c => c.id === cardId).name;
                        
                        // 移除原卡牌
                        this.remove();
                        
                        // 檢查是否所有卡牌都已選
                        checkAllCardsSelected();
                    }
                });
            });
            
            container.appendChild(card);
            cards.push(card);
        }
        
        // 初始動畫
        anime({
            targets: cards,
            opacity: [0, 1],
            scale: [0, 1],
            delay: anime.stagger(50),
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
}); 