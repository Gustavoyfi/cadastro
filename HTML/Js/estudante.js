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
    let nome_estudante = document.querySelector("#nome_estudante").value;
    let email_estudante = document.querySelector("#email_estudante").value;
    let senha_estudante = document.querySelector("#senha_estudante").value;
    let periodo_estudante = document.querySelector("#periodo_estudante").value;
    let turma_estudante = document.querySelector("#turma_estudante").value;
    let id_curso = document.querySelector("#id_curso").value;
    let id_disciplina = document.querySelector("#id_disciplina").value;


    const res = await fetch("php/estudante/inserir_estudante.php", {
        method: "POST",
        body: JSON.stringify({"nome_estudante": nome_estudante,
            "email_estudante": email_estudante,
            "periodo_estudante": periodo_estudante,
            "turma_estudante": turma_estudante,
            "id_curso": id_curso,
            "id_disciplina": id_disciplina,
            "senha_estudante": senha_estudante }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        nome_estudante = "";
        email_estudante = "";
        periodo_estudante = "";
        turma_estudante = "";
        id_disciplina = "";
        id_curso = "";
        senha_estudante = "";

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
        const res = await fetch("php/estudante/listar_estudante.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const output = await res.json();
        console.log(output)
        if(output.empty === "empty"){
            tr = "<td colspan='9'>Não há registros de cursos</td>"
        }else{
            for (var i in output) {
                tr += `
            <tr>
            <td>${output[i].id_estudante}</td>
            <td>${output[i].nome_estudante}</td>
            <td>${output[i].email_estudante}</td>
            <td>${output[i].senha_estudante}</td>
            <td>${output[i].periodo_estudante}</td>
            <td>${output[i].turma_estudante}</td>
            <td>${output[i].id_disciplina}</td>
            <td>${output[i].id_curso}</td>
            <td><button onclick="editStudent(${output[i].id_estudante})" class="btn btn-success"><i class="fa-solid fa-pen"></i>Edit</button></td>
            <td><button onclick="deleteStudent(${output[i].id_estudante})" class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button></td>
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

// // Editar Escola

const editStudent = async (id_estudante) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/estudante/editar_estudante.php?id_estudante=${id_estudante}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_estudante").value = output[i].id_estudante;
            document.querySelector("#edit_nome_estudante").value = output[i].nome_estudante;
            document.querySelector("#edit_email_estudante").value = output[i].email_estudante;
            document.querySelector("#edit_senha_estudante").value = output[i].senha_estudante;
            document.querySelector("#edit_periodo_estudante").value = output[i].periodo_estudante;
            document.querySelector("#edit_turma_estudante").value = output[i].turma_estudante;
            document.querySelector("#edit_id_disciplina").value = output[i].id_disciplina;
            document.querySelector("#edit_id_curso").value = output[i].id_curso;

        }
    }
}

// // // // Atualizar escola

update.addEventListener("click", async () => {

    let id_estudante = document.querySelector("#edit_id_estudante").value;
    let nome_estudante = document.querySelector("#edit_nome_estudante").value;
    let email_estudante = document.querySelector("#edit_email_estudante").value;
    let senha_estudante = document.querySelector("#edit_senha_estudante").value;
    let periodo_estudante = document.querySelector("#edit_periodo_estudante").value;
    let turma_estudante = document.querySelector("#edit_turma_estudante").value;
    let id_disciplina = document.querySelector("#edit_id_disciplina").value;
    let id_curso = document.querySelector("#edit_id_curso").value;

    console.log("Valores enviados:", { id_estudante, nome_estudante, email_estudante, periodo_estudante, turma_estudante, id_disciplina, id_curso, senha_estudante });


    const res = await fetch("php/estudante/atualizar_estudante.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_estudante": id_estudante,
            "nome_estudante": nome_estudante,
            "email_estudante": email_estudante,
            "periodo_estudante": periodo_estudante,
            "turma_estudante": turma_estudante,
            "id_disciplina": id_disciplina,
            "id_curso": id_curso, 
            "senha_estudante": senha_estudante
        })

    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_id_estudante").value = "";
        document.querySelector("#edit_nome_estudante").value = "";
        document.querySelector("#edit_email_estudante").value = ""; 
        document.querySelector("#edit_senha_estudante").value = "";
        document.querySelector("#edit_periodo_estudante").value = "";
        document.querySelector("#edit_turma_estudante").value = "";
        document.querySelector("#edit_id_disciplina").value = "";
        document.querySelector("#edit_id_curso").value = "";
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

const deleteStudent = async (id_estudante) => {
    const res= await fetch("php/estudante/delete_estudante.php?id_estudante=" + id_estudante, {
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
    const res = await fetch("php/estudante/contar_estudante.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_estudantes;
    
}
getTotalCount();