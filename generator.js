function src_conv(string){
    let str = string.split(" ").join("_").toLowerCase();
    return str;
}

function sub_chart(data,index) {
    let main = document.getElementById("main");
    main.innerHTML = "";

    for(let i = 0; i < data[index].branches.length; i++){

        let el = document.createElement("div");
        el.classList.add("branch");

        let name = document.createElement("div");
        name.classList.add("b_title");
        name.innerText = data[index].branches[i].name;

        let sub = document.createElement("div");
        sub.classList.add("b_sub");
        sub.innerText = data[index].branches[i].sub;

        el.appendChild(name);
        el.appendChild(sub);
        main.appendChild(el);

        for (let j = 0; j < data[index].branches[i].units.length; j++) {

            let el2 = document.createElement("div");
            el2.classList.add("unit");

            let un = document.createElement("div");
            un.classList.add("u_title");
            un.innerText = data[index].branches[i].units[j].name;

            let us = document.createElement("div");
            us.classList.add("u_sub");
            us.innerText = data[index].branches[i].units[j].sub;

            let ui = document.createElement("img");
            ui.classList.add("u_illust");
            ui.src = "assets/svgs/homepage/tbd.svg";

            el2.appendChild(ui);
            el2.appendChild(un);
            el2.appendChild(us);
            main.appendChild(el2);

            let el3 = document.createElement("div");
            el3.classList.add("uc"); 
            for (let k = 0; k < data[index].branches[i].units[j].chapters.length; k++) {
                let el4 = document.createElement("div");
                el4.classList.add("chapter");

                let cb = document.createElement("div");
                cb.classList.add("c_box");

                let c_illust = document.createElement("img");
                c_illust.classList.add("c_illust");
                c_illust.src = "assets/svgs/homepage/tbd.svg";

                let c_title = document.createElement("div");
                c_title.classList.add("c_title");
                c_title.innerText = data[index].branches[i].units[j].chapters[k];

                cb.appendChild(c_illust);

                cb.addEventListener("click", () => {
                    stg = 1;
                    string = "hierarchy/" + src_conv(c_title.innerHTML) + ".json";
                    fetch(string)
                        .then(response => response.json())
                        .then(data => {
                            chapter_data(data);
                            sec_chart(data);
                        })
                        .catch(error => console.error('Error loading JSON:', error));
                });

                el4.appendChild(cb);
                el4.appendChild(c_title);
                el3.appendChild(el4);
            }

            main.appendChild(el3);

            let line = document.createElement("div");
            line.classList.add("line");
            main.appendChild(line);
        }
    }
}

function use_data(data) {

    // Nav Bar creation

    let nav_bar = document.getElementById("nav_bar");

    for(let i=0; i < data.length; i++){

        let el = document.createElement("div");
        el.classList.add("nav_el");
        el.addEventListener("click",()=>{
            for (let j = 0; j < 3; j++) {
                trans(j,2)
            }
            trans(i,0)
            cs = i;
            sub_chart(data,cs);
            window.scrollTo({
                top: 0
            })
            document.getElementById("main").style.display = "block";
            document.getElementById("chpt").style.display = "none";
            stg = 0;
            sec = 0;
        })
        el.addEventListener("mouseenter",()=>{
            hover(i)
        })
        el.addEventListener("mouseleave",()=>{
            leave(i)
        })

        let text = document.createElement("div");
        text.classList.add("nav_text");
        text.innerText = data[i].name;

        let img = document.createElement("img");
        img.src = "assets/svgs/homepage/nav_bar/" + data[i].name.toLowerCase() + ".svg";
        img.classList.add("nav_ico");
        el.appendChild(img);
        
        el.appendChild(text);
        nav_bar.appendChild(el);
    }

    // Main Content creation

    sub_chart(data,0);
    
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    use_data(data);
  })
  .catch(error => console.error('Error loading JSON:', error));