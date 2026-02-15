/**
 * EQT Academic Portal - Bulletin Data Configuration
 * 以后更新公告，只需修改或增减下面的 bulletins 数组即可。
 */
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

function initBulletin() {
    const container = document.getElementById('js-bulletin-container');
    if (!container) return;

    container.innerHTML = bulletins.map(item => {
        // 根据是否是特殊条目（新年问候）决定颜色
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

function updateClock() {
    const now = new Date();
    
    // 自动补零函数
    const pad = (num) => String(num).padStart(2, '0');
    
    const timeString = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} (UTC/GMT+8)`;
    
    const clockElement = document.getElementById('real-time-clock');
    if (clockElement) {
        clockElement.innerHTML = `<i class="far fa-clock"></i> ${timeString}`;
    }
}

// 核心初始化函数
function startAcademicPortal() {
    initBulletin();
    // 立即执行一次时间更新
    updateClock();
    // 启动定时器
    setInterval(updateClock, 1000);
}

// 解决电脑端不显示和平板延迟的核心：
// 使用 complete 判断，如果页面已加载则直接跑，否则等加载完
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startAcademicPortal();
} else {
    // 监听 DOMContentLoaded 确保 HTML 结构已就绪
    document.addEventListener('DOMContentLoaded', startAcademicPortal);
    // 额外监听 window load 作为后备，确保所有样式都计算完毕
    window.addEventListener('load', startAcademicPortal);
}
