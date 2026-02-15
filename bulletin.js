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
    initBulletin(); // 填入内容
    updateClock();
    setInterval(updateClock, 1000);

    const bar = document.getElementById('live-bulletin-bar');
    const scrollEl = document.getElementById('js-bulletin-container');

    if (bar && scrollEl) {
        // 1. 初始时，先给它一个“非正常”的布局状态
        bar.style.height = '44px'; 
        scrollEl.style.opacity = '0';

        // 2. 关键补丁：模拟“切 App / 缩放浏览器”的重绘冲动
        // 我们等 1.5 秒，避开初始加载的混乱期
        setTimeout(() => {
            // A. 强制改变尺寸（哪怕只有 1px），这会触发 Safari 的 Layout 重算
            bar.style.height = '45px'; 
            
            // B. 触发一次强行重绘（Reflow）
            void bar.offsetHeight; 
            
            // C. 此时赋予 3D 硬件加速，并让它可见
            scrollEl.style.webkitTransform = 'translate3d(0, 0, 0)';
            scrollEl.style.transform = 'translate3d(0, 0, 0)';
            scrollEl.style.opacity = '1';
            
            requestAnimationFrame(() => {
                // D. 启动动画
                // 此时 Safari 的状态和“缩放浏览器后”一模一样：清爽且正确
                scrollEl.style.webkitAnimation = 'marquee 50s linear infinite';
                scrollEl.style.animation = 'marquee 50s linear infinite';
                
                console.log("Forced dynamic re-layout: Simulating browser resize/switch.");
            });
        }, 1500);
    }
}

// 5. 挂载启动
if (document.readyState === 'complete') {
    startSystem();
} else {
    window.addEventListener('load', startSystem);
}
