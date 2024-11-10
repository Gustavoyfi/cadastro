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
    let nome_disciplina = document.querySelector("#nome_disciplina").value;
    let carga_horaria_disciplina = document.querySelector("#carga_horaria_disciplina").value;
    let ementa_disciplina = document.querySelector("#ementa_disciplina").value;
    let id_curso = document.querySelector("#id_curso").value;


    const res = await fetch("php/disciplina/inserir_disciplina.php", {
        method: "POST",
        body: JSON.stringify({"nome_disciplina": nome_disciplina, "carga_horaria_disciplina": carga_horaria_disciplina, "ementa_disciplina": ementa_disciplina, "id_curso": id_curso }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        nome_disciplina = "";
        carga_horaria_disciplina = "";
        ementa_disciplina = "";
        id_curso = "";

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
        const res = await fetch("php/disciplina/listar_disciplina.php", {
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
            <td>${output[i].id_disciplina}</td>
            <td>${output[i].nome_disciplina}</td>
            <td>${output[i].carga_horaria_disciplina}</td>
            <td>${output[i].ementa_disciplina}</td>
            <td>${output[i].id_curso}</td>
            <td><button onclick="editStudent(${output[i].id_disciplina})" class="btn btn-success" style="display: flex;"><i class="fa-solid fa-pen""></i> Edit</button></td>
                <td><button onclick="deleteStudent(${output[i].id_disciplina})" class="btn btn-danger" style="display: flex;"><i class="fa-solid fa-trash" "></i> Delete</button></td>
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

const editStudent = async (id_disciplina) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/disciplina/editar_disciplina.php?id_disciplina=${id_disciplina}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_disciplina").value = output[i].id_disciplina;
            document.querySelector("#edit_nome_disciplina").value = output[i].nome_disciplina;
            document.querySelector("#edit_carga_horaria_disciplina").value = output[i].carga_horaria_disciplina;
            document.querySelector("#edit_ementa_disciplina").value = output[i].ementa_disciplina;
            document.querySelector("#edit_id_curso").value = output[i].id_curso;

        }
    }
}

// // // Atualizar escola

update.addEventListener("click", async () => {

    let id_disciplina = document.querySelector("#edit_id_disciplina").value;
    let nome_disciplina = document.querySelector("#edit_nome_disciplina").value;
    let carga_horaria_disciplina = document.querySelector("#edit_carga_horaria_disciplina").value;
    let ementa_disciplina = document.querySelector("#edit_ementa_disciplina").value;
    let id_curso = document.querySelector("#edit_id_curso").value;
    

    console.log("Valores enviados:", { id_disciplina, nome_disciplina, carga_horaria_disciplina, ementa_disciplina, id_curso });


    const res = await fetch("php/disciplina/atualizar_disciplina.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_disciplina": id_disciplina,
            "nome_disciplina": nome_disciplina,
            "carga_horaria_disciplina": carga_horaria_disciplina,
            "ementa_disciplina": ementa_disciplina,
            "id_curso": id_curso
        })

    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_id_curso").value = "";
        document.querySelector("#edit_nome_disciplina").value = "";
        document.querySelector("#edit_carga_horaria_disciplina").value = "";
        document.querySelector("#edit_ementa_disciplina").value = "";
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

// // // Deletar escola

const deleteStudent = async (id_disciplina) => {
    const res= await fetch("php/disciplina/delete_disciplina.php?id_disciplina=" + id_disciplina, {
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
    const res = await fetch("php/disciplina/contar_disciplina.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_disciplinas  ;
    
}
getTotalCount();