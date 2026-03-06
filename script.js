const overlay = document.getElementById("overlay");
const bgm = document.getElementById("bgm");
const main = document.getElementById("main");
const volume = document.getElementById("volume");
const trails = document.getElementById("trails");
const discord = document.getElementById("discord");
const bgSwitch = document.getElementById("bgSwitch");

overlay.addEventListener("click", () => {
    overlay.classList.add("fade");

    bgm.volume = 0;
    bgm.play();

    let vol = 0;
    const fade = setInterval(() => {
        vol += 0.02;
        bgm.volume = vol;

        if (vol >= 0.2) clearInterval(fade);
    }, 100);


    setTimeout(()=>{
        overlay.remove();
        main.style.display = "block";
    },800);
});


volume.addEventListener("input", e=>{
    bgm.volume = e.target.value;
});

const mouse = { x: 0, y: 0 };
const dots = [];

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function trail(){
    const dot = document.createElement("div");
    dot.className = "trail";

    const obj = {
        el: dot,
        x: mouse.x,
        y: mouse.y,
        life: 0
    };

    dot.style.left = obj.x + "px";
    dot.style.top = obj.y + "px";

    trails.appendChild(dot);
    dots.push(obj);
}

function loop(){

    trail();

    dots.forEach((d,i)=>{
        d.x += (mouse.x - d.x) * 0.02;
        d.y += (mouse.y - d.y) * 0.02;

        d.el.style.left = d.x + "px";
        d.el.style.top = d.y + "px";

        d.life += 1;

        if(d.life > 24){
            d.el.remove();
            dots.splice(i,1);
        }

    });

    requestAnimationFrame(loop);
}

loop();

discord.addEventListener("click", () => {

    navigator.clipboard.writeText("unsnipeable");

    discord.dataset.tooltip = "Copied!";

    setTimeout(() => {
        discord.dataset.tooltip = "Discord";
    }, 1000);

});

let bgIndex = 1;
const maxBg = 4;

bgSwitch.addEventListener("click", () => {

    bgIndex++;

    if(bgIndex > maxBg){
        bgIndex = 1;
    }

    document.body.style.setProperty(
        "--bg",
        `url("./images/bg${bgIndex}.jpg")`
    );

});


let i = 0;
const titleText = "matanku";

setInterval(() => {
    const frames = [
        ...Array.from(titleText, (_, i) => titleText.slice(0, i + 1)),
        ...Array.from(titleText, (_, i) => titleText.slice(0, titleText.length - i - 1)),
        ""
    ];

    document.title = `@${frames[i]}`;
    i = (i + 1) % frames.length;
}, 300);