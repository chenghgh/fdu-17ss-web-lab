let select1=document.getElementById("select1");
let select2=document.getElementById("select2");
let btn =document.getElementById("btn");

let hold1=document.getElementById("hold1");
let hold2=document.getElementById("hold2");
let holdTable=document.getElementById("holdTable");

let table=document.getElementById("table");
let tables=[];

let cols  =[];
let colNumber = document.getElementById("colNumber");
let classes = ["grey", ""];

hold1.style.display="none";
btn.style.display="none";
//第一个选框
select1.onchange = function() {
     switch (this.value){
         case "SELECT ONE":
             hold1.style.display="none";
             hold2.style.display="none";
             btn.style.display="none";

             break;
         case "CREATE TABLE":
             hold1.style.display="block";
             hold2.style.display="none";
             btn.style.display="none";

             hold1.children[0].value="";
             hold1.children[1].value="";

             break;
         case "ADD ROW":
             hold1.style.display="none";
             hold2.style.display="block";
             addRow();

             break;
         case"DELETE ROW":
            hold1.style.display="none";
            hold2.style.display="block";
             if(select2.value != "select")
                 displayInput(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
            break;

         case "DELETE TABLE":
             hold1.style.display="none";
             hold2.style.display="none";
             break
     }

}
//第二个选框
select2.onchange=function () {
    if(select2.value == "SELECT ONE")
        return;
    if(select1.value == "ADD ROW" || "DELETE ROW")
        displayInput(tables[select2.value].getElementsByTagName("th").length, numbers = tables[select2.value].getElementsByTagName("th"));
    displayTable(tables[select2.value]);
}

//点击按钮
btn.onclick = function () {
    if(select1.value==="CREATE TABLE"){
        let tableName=document.getElementById("tableName").value;
        addOption(tableName);
        tables[tableName]=document.createElement("table");
        let thead = document.createElement("thead");
        for(let i = 0; i < parseInt(colNumber.value); i++){
            let th = document.createElement("th");
            th.innerHTML = cols[i].value || "Attribute";
            thead.appendChild(th);
        }
        tables[tableName].appendChild(thead);
        displayTable(tables[tableName]);
        //清空表格创建信息
        hold1.getElementsByTagName("input")[0].value = "";
        hold1.getElementsByTagName("input")[1].value = "";
        displayInput(0);

    }
    else if(select1.value==="ADD ROW"){
        let empty=false;
        let tr=document.createElement("tr");
        let inputs=document.getElementById("hold2").getElementsByTagName("input");
        for(let i = 0; i < inputs.length; i++){
            let td = document.createElement("td");
            td.innerHTML = inputs[i].value;
            td.className = classes[tables[select2.value].getElementsByTagName("tr").length % 2];
            tr.appendChild(td);
            if(td.innerHTML !== "")
                empty = true;
        }
        if(!empty){
            return false;
        }
        tables[select2.value].appendChild(tr);
        displayInput(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
    }
    else if(select1.value==="DELETE ROW"){
        let trs = tables[select2.value].getElementsByTagName("tr");
        for(let i=0;i<trs.length;i++){
            let count=0;
            let tds = trs[i].getElementsByTagName("td");
            for(let j=0;j<tds.length;j++){
                if(tds[j].innerHTML === hold2.getElementsByTagName("input")[j].value || !hold2.getElementsByTagName("input")[j].value){
                    count++;
                }else{
                    break;
                }
            }
            if(count===tds.length){
                tables[select2.value].removeChild(trs[i]);

                displayInput(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
                return false;
            }
        }
    }
    else if(select1.value === "DELETE TABLE") {
        delOption();
        holdTable.removeAll();
    }
    return false;

}
//展示input元素
function displayInput(number,ths=[]) {

    while(hold2.hasChildNodes()) //当还存在子节点时 循环继续
    {
       hold2.removeChild(hold2.firstChild);
    }

    for(let i=0;i<number;i++){
        cols[i]=document.createElement("input");
        cols[i].type="text";
        cols[i].placeholder="Attribute";
        hold2.appendChild(cols[i]);
    }
}

//展示table
function displayTable(tablename) {
    if(holdTable.firstChild)
        holdTable.removeChild(holdTable.firstChild);
    // if(select2.value == "select")
    //     return;
    holdTable.appendChild(tablename);
}

//colNumber改变，也就是table列数变
colNumber.onchange=function () {
    let number = parseInt(colNumber.value);
    if(number <= 0){
        return;
    }else {
        btn.style.display = "inline";
        hold2.style.display = "block";
        displayInput(number,);
    }
}

//加行时显示input
function addRow(){
    let numbers = 0;
    if(select2.value != "select")
        numbers = tables[select2.value].getElementsByTagName("th").length;
    else {
        return;
    }
    displayInput(numbers,numbers = tables[select2.value].getElementsByTagName("th"));
}

function addOption(value) {
    let option = document.createElement("option");
    select2.appendChild(option);
    option.innerHTML = value;
    option.value = value;
    option.selected = true;
}

function delOption() {
    let options = select2.getElementsByTagName("option");

    if(select2.value == "select")
        return;

    for(let option of options){
        if(option.selected){
            select2.removeChild(option);
            tables[option.value] = "";
            if(select2.getElementsByTagName("option")[1]){
                select2.getElementsByTagName("option")[1].selected = true;
                displayTable(tables[select2.getElementsByTagName("option")[1].value]);
            }
            return;
        }
    }
}

