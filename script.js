console.log('Happy developing ✨')

let p = []; //ARRAY PROCESSI
let at = []; //ARRAY TEMPO DI ARRIVO
let bt = []; //ARRAY TEMPO DI BURST
let rbt = []; //ARRAY TEMPO DI BURST RIMANENTE
let pr = []; //ARRAY PRIORITÀ

function caricaProcessi() {
    p = ["P1", "P2", "P3"];
    at = [0, 2, 5];
    bt = [6, 5, 3];
    pr = [1, 1, 1];
}

function sjfScheduling() {
    let n = p.length;
    let completato = Array(n).fill(false);
    let tempo = 0;
    let grafico = [];

    for (let i = 0; i < n; i++) {
        let contaProcesso = -1;
        let burstMin = Infinity;

        for (let j = 0; j < n; j++) {
            if (!completato[j] && at[j] <= tempo && bt[j] < burstMin) {
                burstMin = bt[j];
                contaProcesso = j;
            }
        }

        if (contaProcesso === -1) {
            tempo++;
            done--;
            continue;
        }
        completato[contaProcesso] = true;
        grafico.push({
            process: p[contaProcesso],
            start: tempo,
            burst: bt[contaProcesso]
        });

        tempo += bt[contaProcesso];
    }

    return grafico;
}

function mostraGrafico(grafico) {
    let output = document.getElementById("output");
    output.innerHTML = "<p>Di seguito l'evoluzione dei processi:</p><div class='progress' id='ganttBar'></div>";

    let totalTime = grafico.reduce((sum, g) => sum + g.burst, 0);
    let ganttBar = document.getElementById("ganttBar");

    grafico.forEach(g => {
        let div = document.createElement("div");
        div.className = "progress-bar";
        div.style.width = (g.burst / totalTime * 100) + "%";
        div.textContent = g.process;
        ganttBar.appendChild(div);
    });
}

function reset(){
   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement('tbody');

   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "none";
}

function start(){
   caricaProcessi();
   rbt = [...bt]; 

   let gantt = sjfScheduling();
   mostraGrafico(gantt);

   let i;
   rbt = bt; 
   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement("tbody");
   for(i=0; i<p.length; i++) {
       const trEl = newTBodyEl.insertRow();
       let tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(p[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(at[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(bt[i]));
       tdEl = trEl.insertCell();
       tdEl.id = "idP" + i;
       tdEl.appendChild(document.createTextNode(rbt[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(pr[i]));
   }

   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "block";
}
