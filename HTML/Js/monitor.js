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
    try {
        let nome_monitor = document.querySelector("#nome_monitor").value;
        let periodo_monitor = document.querySelector("#periodo_monitor").value;
        let email_monitor = document.querySelector("#email_monitor").value;
        let senha_monitor = document.querySelector("#senha_monitor").value;
        let id_curso = document.querySelector("#id_curso").value;
        let id_disciplina = document.querySelector("#id_disciplina").value;
        let id_projeto = document.querySelector("#id_projeto").value;
    
        const res = await fetch("php/monitor/inserir_monitor.php", {
            method: "POST",
            body: JSON.stringify({
                "nome_monitor": nome_monitor,
                "periodo_monitor": periodo_monitor,
                "email_monitor": email_monitor,
                "id_curso": id_curso,
                "id_disciplina": id_disciplina,
                "id_projeto": id_projeto,
                "senha_monitor": senha_monitor
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        nome_monitor = "";
        periodo_monitor = "";
        email_monitor = "";
        id_curso = "";
        id_disciplina = "";
        id_projeto = "";
        senha_monitor = "";

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
        const res = await fetch("php/monitor/listar_monitor.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const output = await res.json();
        console.log(output)
        if(output.empty === "empty"){
            tr = "<td>Não há registros de cursos</td>"
        }else{
            for (var i in output){
                tr += `
            <tr>
                <td>${output[i].id_monitor}</td>
                <td>${output[i].nome_monitor}</td>
                <td>${output[i].periodo_monitor}</td>
                <td>${output[i].email_monitor}</td>
                <td>${output[i].senha_monitor}</td>
                <td>${output[i].id_curso}</td>
                <td>${output[i].id_projeto}</td>
                <td>${output[i].id_disciplina}</td>
                <td><button onclick="editStudent(${output[i].id_monitor})" class="btn btn-success" style="display: flex;"><i class="fa-solid fa-pen""></i> Edit</button></td>
                <td><button onclick="deleteStudent(${output[i].id_monitor})" class="btn btn-danger" style="display: flex;"><i class="fa-solid fa-trash" "></i> Delete</button></td>
            </tr>
            `
            }
        }

        tbody.innerHTML = tr;
    } catch (error) {
        console.log("Error " + error);
    }
}

getStudents();

// Editar Escola

const editStudent = async (id_monitor) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/monitor/editar_monitor.php?id_monitor=${id_monitor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_monitor").value = output[i].id_monitor;
            document.querySelector("#edit_nome_monitor").value = output[i].nome_monitor;
            document.querySelector("#edit_periodo_monitor").value = output[i].periodo_monitor;
            document.querySelector("#edit_email_monitor").value = output[i].email_monitor;
            document.querySelector("#edit_senha_monitor").value = output[i].senha_monitor;
            document.querySelector("#edit_id_curso").value = output[i].id_curso;
            document.querySelector("#edit_id_disciplina").value = output[i].id_disciplina;
            document.querySelector("#edit_id_projeto").value = output[i].id_projeto;

        }
    }
}

// // // // Atualizar escola

update.addEventListener("click", async () => {

    let id_monitor = document.querySelector("#edit_id_monitor").value; 
    let nome_monitor = document.querySelector("#edit_nome_monitor").value;
    let periodo_monitor = document.querySelector("#edit_periodo_monitor").value;
    let email_monitor = document.querySelector("#edit_email_monitor").value;
    let senha_monitor = document.querySelector("#edit_senha_monitor").value;
    let id_curso = document.querySelector("#edit_id_curso").value;
    let id_disciplina = document.querySelector("#edit_id_disciplina").value;
    let id_projeto = document.querySelector("#edit_id_projeto").value;

    console.log("Valores enviados:", { id_monitor, nome_monitor, periodo_monitor, email_monitor, id_curso, id_disciplina, id_projeto, senha_monitor });

    const res = await fetch("php/monitor/atualizar_monitor.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_monitor": id_monitor,
            "nome_monitor": nome_monitor,
            "periodo_monitor": periodo_monitor,
            "email_monitor": email_monitor,
            "id_curso": id_curso,
            "id_disciplina": id_disciplina,
            "id_projeto": id_projeto, 
            "senha_monitor": senha_monitor
        })
    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_id_monitor").value = "";
        document.querySelector("#edit_nome_monitor").value = "";
        document.querySelector("#edit_periodo_monitor").value = "";
        document.querySelector("#edit_email_monitor").value = "";
        document.querySelector("#edit_senha_monitor").value = "";
        document.querySelector("#edit_id_curso").value = "";
        document.querySelector("#edit_id_disciplina").value = "";
        document.querySelector("#edit_id_projeto").value = "";
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

// // // // Deletar escola

const deleteStudent = async (id_monitor) => {
    const res= await fetch("php/monitor/delete_monitor.php?id_monitor=" + id_monitor, {
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
    const res = await fetch("php/monitor/contar_monitor.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_monitores  ;
    
}
getTotalCount();