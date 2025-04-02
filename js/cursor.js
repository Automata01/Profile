const cursorEffect = document.createElement("div");
cursorEffect.style.position = "fixed";
cursorEffect.style.width = "50px";
cursorEffect.style.height = "50px";
cursorEffect.style.backgroundColor = "green";
cursorEffect.style.borderRadius = "50%";
cursorEffect.style.pointerEvents = "none";
cursorEffect.style.filter = "blur(10px)";
cursorEffect.style.zIndex = "-1";
document.body.appendChild(cursorEffect);

document.addEventListener("mousemove", (e) => {
    cursorEffect.style.left = `${e.clientX - 25}px`;
    cursorEffect.style.top = `${e.clientY - 25}px`;
});
