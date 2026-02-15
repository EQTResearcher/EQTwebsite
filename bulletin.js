/**
 * EQT Academic Portal - Integrated System
 * 包含：公告配置、初始化逻辑、以及强力时钟重试机制
 */

// 1. 公告数据配置
const bulletins = [
    {
        title: "", 
        desc: "Happy Chinese New Year! Wishing you a brilliant Year of the Horse in 2026. 🏮",
        link: "#",
        isSpecial: true,
        icon: "fas fa-lantern"
    },
    {
        title: "[Short Essay]",
        desc: "What Went Wrong with the 'Entity' as the Starting Point in Modern Physics? — Full text on PhilPapers",
        link: "https://philpeople.org/profiles/kaisheng-li/news"
    },
    {
        title: "[New Book]",
        desc: "Generative Ontology & Closure Dynamics (GOCD) — Preview on waterstones",
        link: "https://www.waterstones.com/book/generative-ontology-and-closure-dynamics-gocd/longji-li/kaisheng-li/9798244416459"
    },
    {
        title: "[New Book]",
        desc: "Planck's Unfinished Radiance: The Energy Quantum Theory and the Mass-Energy Unity Across Micro and Macro Scales — Preview on LEANPUB",
        link: "https://leanpub.com/plancksunfinishedradiance"
    },
    {
        title: "[New Book]",
        desc: "The Century Dilemma — Preview on Blackwell's",
        link: "https://blackwells.co.uk/bookshop/product/The-Century-Dilemma-by-Longji-Li-Kaisheng-Li/9798243236096"
    },
    {
        title: "[New Book]",
        desc: "Narrowband Prisoners — Preview on amazon",
        link: "https://www.amazon.com/Narrowband-Prisoners-Mishear-Symphony-Universe/dp/B0GD6TR37G"
    },
    {
        title: "[GitHub Sync]",
        desc: "Energy Quanta Theory (EQT): Building an Open, Collaborative, and AI-Driven New Paradigm for Scientific Research",
        link: "https://github.com/EQTResearcher/EnergyQuantumTheory"
    }
];

// 2. 初始化公告函数
function initBulletin() {
    const container = document.getElementById('js-bulletin-container');
    if (!container) return;

    container.innerHTML = bulletins.map(item => {
        const color = item.isSpecial ? "#d73a49" : "#003366";
        const fontWeight = item.isSpecial ? "bold" : "500";
        const iconHtml = item.icon ? `<i class="${item.icon}"></i> ` : "";
        const titleHtml = item.title ? `<strong>${item.title}</strong> ` : "";

        return `
            <a href="${item.link}" target="_blank" style="margin-right: 80px; font-size: 1em; color: ${color}; text-decoration: none; font-weight: ${fontWeight}; display: inline-block;">
                ${iconHtml}${titleHtml}${item.desc} &rarr;
            </a>
        `;
    }).join('');
}

// 3. 时间更新函数
function updateClock() {
    const clockElement = document.getElementById('real-time-clock');
    if (!clockElement) return;

    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    const timeString = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} (UTC/GMT+8)`;
    
    clockElement.style.color = "#444"; 
    clockElement.innerHTML = `<i class="far fa-clock"></i> ${timeString}`;
}

// 4. 强力启动机制
function startSystem() {
    initBulletin();
    
    // 1. 时钟正常启动，不要管它
    updateClock();
    setInterval(updateClock, 1000);

    const scrollEl = document.getElementById('js-bulletin-container');
    if (scrollEl) {
        // --- 核心定位修复：模拟锁屏重启的渲染逻辑 ---
        
        // 第一步：初始时彻底从显卡树中剥离，不让它参与“首帧快照”
        scrollEl.style.display = 'none';
        scrollEl.style.webkitTransform = 'translate3d(0,0,0)';
        
        // 第二步：使用双重帧同步。这会确保第一帧（时钟加载）完全结束后，再处理第二帧
        requestAnimationFrame(() => {
            // 此时主线程已经处理完了首屏布局
            requestAnimationFrame(() => {
                // 恢复显示，并强行改变一个无关痛痒的属性（比如字间距），迫使 GPU 重新扫描
                scrollEl.style.display = 'inline-block';
                scrollEl.style.letterSpacing = '0.1px'; 
                
                // 第三步：手动注入动画，此时的 GPU 环境是“解锁后”级别的纯净环境
                setTimeout(() => {
                    const animationName = 'marquee 50s linear infinite';
                    scrollEl.style.webkitAnimation = animationName;
                    scrollEl.style.animation = animationName;
                    
                    // 彻底修复：1秒后把字间距还原，再次抖动渲染引擎
                    setTimeout(() => { scrollEl.style.letterSpacing = 'normal'; }, 1000);
                }, 100); 
            });
        });
    }
}

// 5. 挂载启动
if (document.readyState === 'complete') {
    startSystem();
} else {
    window.addEventListener('load', startSystem);
}
