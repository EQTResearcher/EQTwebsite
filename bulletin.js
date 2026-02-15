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
    console.log("EQT System Initializing...");
    
    // 初始化公告
    initBulletin();

    // 强力重试寻找时钟元素（解决电脑端加载过快问题）
    const checkClockExist = setInterval(() => {
        const el = document.getElementById('real-time-clock');
        if (el) {
            updateClock();
            setInterval(updateClock, 1000);
            clearInterval(checkClockExist);
            console.log("Clock Activated.");
        }
    }, 100);


    // 解决平板不滚动的终极代码
    setTimeout(() => {
        const scrollEl = document.getElementById('js-bulletin-container');
        if (scrollEl) {
            // 1. 先彻底移除可能卡死的动画
            scrollEl.style.animation = 'none';
            
            // 2. 强制浏览器触发一次重绘 (OffsetHeight 触发)
            // 这一步在代码上看起来没意义，但在平板底层逻辑中相当于“拍了它一巴掌”
            void scrollEl.offsetHeight; 
            
            // 3. 重新注入动画指令
            // 使用 translate3d 强制开启显卡，60s 确保在平板上平稳
            scrollEl.style.animation = 'marquee 60s linear infinite';
            
            console.log("Tablet rendering forced to restart.");
        }
    }, 1000); // 延迟 1 秒，确保所有 CSS 和字体都加载完毕

}

// 5. 挂载启动
if (document.readyState === 'complete') {
    startSystem();
} else {
    window.addEventListener('load', startSystem);
}
