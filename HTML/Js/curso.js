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
    let nome_curso = document.querySelector("#nome_curso").value;
    let duracao_curso = document.querySelector("#duracao_curso").value;
    let carga_horaria_total = document.querySelector("#carga_horaria_total").value;
    let id_escola = document.querySelector("#id_escola").value;


    const res = await fetch("php/curso/inserir_curso.php", {
        method: "POST",
        body: JSON.stringify({"nome_curso": nome_curso, "duracao_curso": duracao_curso, "carga_horaria_total": carga_horaria_total, "id_escola": id_escola }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        nome_curso = "";
        duracao_curso = "";
        carga_horaria_total = "";
        id_escola = "";

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
        const res = await fetch("php/curso/listar_curso.php", {
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
            <td>${output[i].id_curso}</td>
            <td>${output[i].nome_curso}</td>
            <td>${output[i].duracao_curso}</td>
            <td>${output[i].carga_horaria_total}</td>
            <td>${output[i].id_escola_campus}</td>
            <td><button onclick="editStudent(${output[i].id_curso})" class="btn btn-success"><i class="fa-solid fa-pen"></i>Edit</button></td>
            <td><button onclick="deleteStudent(${output[i].id_curso})"  class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button></td>
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

const editStudent = async (id_curso) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/curso/editar_curso.php?id_curso=${id_curso}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_curso").value = output[i].id_curso;
            document.querySelector("#edit_nome_curso").value = output[i].nome_curso;
            document.querySelector("#edit_duracao_curso").value = output[i].duracao_curso;
            document.querySelector("#edit_carga_horaria").value = output[i].carga_horaria_total;
            document.querySelector("#edit_id_escola").value = output[i].id_escola_campus;

        }
    }
}

// // Atualizar escola

update.addEventListener("click", async () => {

    let id_curso = document.querySelector("#edit_id_curso").value;
    let nome_curso = document.querySelector("#edit_nome_curso").value;
    let duracao_curso = document.querySelector("#edit_duracao_curso").value;
    let carga_horaria_total = document.querySelector("#edit_carga_horaria").value;
    let id_escola = document.querySelector("#edit_id_escola").value;
    

    console.log("Valores enviados:", { id_curso, nome_curso, duracao_curso, carga_horaria_total, id_escola });


    const res = await fetch("php/curso/atualizar_curso.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_curso": id_curso,
            "nome_curso": nome_curso,
            "duracao_curso": duracao_curso,
            "carga_horaria_total": carga_horaria_total,
            "id_escola": id_escola
        })

    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_id_curso").value = "";
        document.querySelector("#edit_nome_curso").value = "";
        document.querySelector("#edit_duracao_curso").value = "";
        document.querySelector("#edit_carga_horaria").value = "";
        document.querySelector("#edit_id_escola").value = "";
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

// // Deletar escola

const deleteStudent = async (id_curso) => {
    const res= await fetch("php/curso/delete_curso.php?id_curso=" + id_curso, {
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
    const res = await fetch("php/curso/contar_curso.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_cursos;
    
}
getTotalCount();