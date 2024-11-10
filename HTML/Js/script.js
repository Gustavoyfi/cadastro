let cadastrar = document.querySelector("#cadastrar");
let modal = document.querySelector("#create-student");
let update_modal = document.querySelector("#update-student");
let close = document.querySelector("#close");
let update = document.querySelector("#update");
let update_close = document.querySelector("#update_close");
let save = document.querySelector("#save");
let success = document.querySelector(".alert-success")
let error = document.querySelector(".alert-danger")

cadastrar.addEventListener("click", () => {
    modal.style.display = "flex";
});

close.addEventListener("click", () => {
    modal.style.display = "none";
});


update_close.addEventListener("click", () => {
    update_modal.style.display = "none";
});

// Create escola

save.addEventListener( "click", async () => {
  try{
    let nome_escola = document.querySelector("#nome_escola").value;
    let local_escola = document.querySelector("#local_escola").value;
    let bloco_escola = document.querySelector("#bloco_escola").value;

    const res = await fetch("php/insert-data.php", {
        method: "POST",
        body: JSON.stringify({"nome_escola": nome_escola, "local_escola": local_escola, "bloco_escola": bloco_escola}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        nome_escola = "";
        local_escola = "";
        bloco_escola = "";
        modal.style.display = "none";
        getStudents();
        getTotalCount();
        setTimeout(() => {
            success.style.display = "none";
            success.innerText = "";

        }, 1000)
    }else{
        error.style.display = "flex";
        error.innerText = output.message;
        setTimeout(() => {
            error.style.display = "none";
            error.innerText = "";

        }, 1000)
    }
    console.log(output)
  } catch (error) {
    error.style.display = "flex";
        error.innerText = error.message;
        setTimeout(() => {
            error.style.display = "none";
            error.innerText = "";

        }, 1000)
    }
});



const getStudents = async () => {
    try {
        const tbody = document.querySelector("#tbody");
        let tr = "";
        const res = await fetch("php/select-data.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const output = await res.json();
        console.log(output)
        if(output.empty === "empty"){
            tr = "<tr>Não há registros de escola</tr>"
        }else{
            for (var i in output){
                tr += `
            <tr>
            <td>${output[i].id_escola_campus}</td>
            <td>${output[i].nome_escola}</td>
            <td>${output[i].local_escola}</td>
            <td>${output[i].bloco_escola}</td>
            <td><button onclick="editStudent(${output[i].id_escola_campus})" class="btn btn-success"><i class="fa-solid fa-pen"></i>Edit</button></td>
            <td><button onclick="deleteStudent(${output[i].id_escola_campus})"  class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button></td>
            </tr>
            `
            }
        }

        tbody.innerHTML = tr;
    } catch (error) {
        console.log("Error " + error)
        
    }
}

getStudents();

// Editar Escola

const editStudent = async (id_escola_campus) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/edit-data.php?id_escola_campus=${id_escola_campus}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_escola_campus").value = output[i].id_escola_campus;
            document.querySelector("#edit_nome").value = output[i].nome_escola;
            document.querySelector("#edit_local").value = output[i].local_escola;
            document.querySelector("#edit_bloco").value = output[i].bloco_escola;

        }
    }
}

// Atualizar escola

update.addEventListener("click", async () => {


    let id_escola_campus = document.querySelector("#edit_id_escola_campus").value;
    let nome_escola = document.querySelector("#edit_nome").value;
    let local_escola = document.querySelector("#edit_local").value;
    let bloco_escola = document.querySelector("#edit_bloco").value;

    console.log("Valores enviados:", { id_escola_campus, nome_escola, local_escola, bloco_escola });

    const res = await fetch("php/update-data.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_escola_campus": id_escola_campus,
            "nome_escola": nome_escola,
            "local_escola": local_escola,
            "bloco_escola": bloco_escola 
        })

    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_nome").value = "";
        document.querySelector("#edit_local").value = "";
        document.querySelector("#edit_bloco").value = "";
        update_modal.style.display = "none";
        getStudents();
        setTimeout(() => {
            success.style.display = "none";
            success.innerText = "";

        }, 1000)
    }else{
        error.style.display = "flex";
        error.innerText = output.message;
        setTimeout(() => {
            error.style.display = "none";
            error.innerText = "";
        }, 1000)
    }
})

// Deletar escola

const deleteStudent = async (id_escola_campus) => {
    const res= await fetch("php/delete-data.php?id_escola_campus=" + id_escola_campus, {
        method: "GET",    
    });
    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        setTimeout(() => {
            success.style.display = "none";
            success.innerText = "";
        }, 1000)
        getStudents();
        getTotalCount();
    }else{
        error.style.display = "flex";
        error.innerText = output.message;
        setTimeout(() => {
            error.style.display = "none";
            error.innerText = "";
        }, 1000)
    }
}

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await fetch("php/get-total-count.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_escolas;
    
}
getTotalCount();