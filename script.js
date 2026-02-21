var stg = 0;
var sec_stg = null;
var solution;
const arr = ["center","left","center","right"]

// Working of Nav Bar

var cs = 0;

function trans_2(el_id,state) {
    let el = document.querySelectorAll(".section")[el_id];
    switch (state) {
        case 0:
            el.style.boxShadow = "0 0px 0px #888"
            el.style.borderColor = "#888";
            el.style.transform = "translateY(4px)"
            break;
        case 1:
            el.style.boxShadow = "0 4px 0px #888"
            el.style.borderColor = "#888";
            break;
        case 2:
            el.style.boxShadow = "0 4px 0px #ddd"
            el.style.borderColor = "#eee";
            el.style.transform = "translateY(-4px)"
            break;
    }
}

function trans(el_id,state) {
    let el = document.querySelectorAll(".nav_el")[el_id];
    switch (state) {
        case 0:
            el.style.opacity = "1";
            el.style.fontWeight = "700";
            el.style.borderWidth = "2.5px";
            el.style.borderColor = "#000";
            break;
        case 1:
            el.style.opacity = "1";
            el.style.fontWeight = "500";
            el.style.borderWidth = "2.5px";
            el.style.borderColor = "#888";
            break;
        case 2:
            el.style.opacity = "0.5";
            el.style.fontWeight = "500";
            el.style.borderWidth = "0px";
            el.style.borderColor = "#888";
            break;
    }
}

function hover(i){
    if (i != cs) {
        trans(i,1);
    }
}

function hover_2(i){
    if (i != sec_stg) {
        trans_2(i,1);
    }
}

function leave_2(i){
    if (i != sec_stg) {
        trans_2(i,2);
    }
}

function leave(i){
    if (i != cs) {
        trans(i,2);
    }
}

// Data for chapter stage

function udata(dta,datat) {
    switch (datat) {
        case 0:
            solution = dta.sub;
            break;
        
        default:
                break;
    }
}

function sec_chart(data) {
    document.getElementById("cat").innerHTML = "";
    let md = data.sec[sec_stg];
    for (let i = 0; i < md.top.length; i++) {
        let tp = document.createElement("div");
        tp.classList.add("topic");  
        
        let tn = document.createElement("div");
        tn.classList.add("tn");
        tn.innerHTML = md.top[i].name;

        let tl = document.createElement("div");
        tl.classList.add("tl");
        tl.innerHTML = `TOPIC ${(i + 1)}`;

        tp.appendChild(tl);
        tp.appendChild(tn);

        document.getElementById("cat").appendChild(tp);

        for (let j = 0; j < md.top[i].sub.length; j++) {
            let sp = document.createElement("div");
            sp.classList.add("subtopic");
            sp.style.justifyContent = arr[j]  
        
            let si = document.createElement("img");
            si.classList.add("si");
            si.src = "assets/svgs/chapterpage/utility/sub.svg";

            let sn = document.createElement("div");
            sn.classList.add("sn");
            sn.innerHTML = md.top[i].sub[j];

            sp.appendChild(si);
            sp.appendChild(sn);

            document.getElementById("cat").appendChild(sp);
        }
    }
}

function chapter_data(str) {
    sec_stg = 0;
    window.scrollTo({
        top: 0
    })
    document.getElementById("main").style.display = "none";
    document.getElementById("chpt").style.display = "block";

    document.querySelector("#ci > img").src = "assets/svgs/homepage/tbd.svg";
    document.getElementById("ct").innerText = str.name;
    document.getElementById("cs").innerText = str.sub;

    for (let i = 0; i < 3; i++) {
        document.querySelectorAll(".n_n")[i].innerText = str.num[i];
    }

    let sec = document.getElementById("sec");
        sec.innerHTML = "";

    for (let i = 0; i < str.sec.length; i++) {

        let el2 = document.createElement("div");
        el2.classList.add("section");

        el2.addEventListener("click",()=>{
            for (let j = 0; j < str.sec.length; j++) {
                trans_2(j,2)
            }
            trans_2(i,0);
            sec_stg = i;
            sec_chart(str);
            document.getElementById("cat").scrollTo({
                top: 0,
            })
        })
        el2.addEventListener("mouseenter",()=>{
            hover_2(i)
        })
        el2.addEventListener("mouseleave",()=>{
            leave_2(i)
        })

        let un = document.createElement("div");
        un.classList.add("s_t");            
        un.innerText = str.sec[i].name;

        let us = document.createElement("div");
        us.classList.add("s_s");
        us.innerText = str.sec[i].sub;

        let ui = document.createElement("img");
        ui.classList.add("s_i");
        ui.src = "assets/svgs/homepage/tbd.svg";

        el2.appendChild(ui);
        el2.appendChild(un);
        el2.appendChild(us);
        sec.appendChild(el2);
    }
}

// Delay because of generator.js

setTimeout(() => {
    trans(0,0);
}, 50);