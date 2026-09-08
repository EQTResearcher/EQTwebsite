/**
 * EQT Academic Portal - Integrated System
 * 包含：公告配置、初始化逻辑、以及强力时钟重试机制
 */

// 1. 公告数据配置
const bulletins = [
    {
        title: "", 
        desc: "Autumn is here! Wishing you a fruitful season full of beauty. 🍁",
        link: "#",
        isSpecial: true,
        icon: "fas fa-leaf"
        //style: "#e65100" // 👈 显式指定橙色（或 "orange"）
    },
    {
        title: "[Short Essay]",
        desc: "2026-09-08: Top 1% Downloads (6 past months)",
        link: "https://philpeople.org/profiles/kaisheng-li/news"
    },
    {
        title: "[New book]",
        desc: "Constrained Speculation : A Natural Philosophy of Energy Quantum Theory",
        link: "https://www.booksamillion.com/p/Constrained-Speculation/Kaisheng-Li/9798996139484"
    },
    {
        title: "[Revised edition]",
        desc: "Generative Ontology and Closure Dynamics : A Background-Free Event Theory",
        link: "https://www.booksamillion.com/p/Generative-Ontology-Closure-Dynamics/Kaisheng-Li/9798996139491"
    },
    {
        title: "[Revised edition]",
        desc: "Mind-Matter Unity : Consciousness and Subjectivity in EQT Process Philosophy of Nature",
        link: "https://www.booksamillion.com/p/Mind-Matter-Unity/Kaisheng-Li/9798996139477"
    },
    {
        title: "[Launch a Substack]",
        desc: "What Modern Physics Forgot: From Phase Closure to Generative Ontology",
        link: "https://gradientphysics.substack.com/"
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
        const color = item.isSpecial ? "#e65100" : "#003366";//修改四季显示的颜色 #e65100 橙色
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
    
    // 1. 正常初始化公告文字，但 CSS 里先把 animation 设为 none
    initBulletin();

    // 2. 启动时钟，并让时钟带任务
    let frameCount = 0;
    const clockTimer = setInterval(() => {
        const el = document.getElementById('real-time-clock');
        if (el) {
            updateClock();
            frameCount++;

            // --- 核心改动：利用时钟的“合法跳动”来偷渡公告的启动 ---
            // 在时钟跳动第 3 次（即 3 秒后，此时 iPad 已经完全稳定）
            if (frameCount === 3) {
                const scrollEl = document.getElementById('js-bulletin-container');
                if (scrollEl) {
                    // 绝招：不使用 class，直接修改 style，
                    // 并且加入一个微小的 z-index 变化，强制 Safari 重新进行分层计算
                    scrollEl.style.zIndex = "100";
                    scrollEl.style.webkitAnimation = 'marquee 60s linear infinite';
                    scrollEl.style.animation = 'marquee 60s linear infinite';
                    
                    console.log("Bulletin hijacked by clock pulse.");
                }
            }
        }
    }, 1000);
}

// 5. 挂载启动
if (document.readyState === 'complete') {
    startSystem();
} else {
    window.addEventListener('load', startSystem);
}
