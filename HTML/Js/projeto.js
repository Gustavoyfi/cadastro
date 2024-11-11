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
    
    let data_inicio_projeto = document.querySelector("#data_inicio_projeto").value;
    let status_monitor = document.querySelector("#status_monitor").value;
    let forma_atendimento = document.querySelector("#forma_atendimento").value;
    let horas_aula = document.querySelector("#horas_aula").value;
    let horas_extraclasse = document.querySelector("#horas_extraclasse").value;
    let modalidade = document.querySelector("#modalidade").value;
    let horas_bolsa = document.querySelector("#horas_bolsa").value;
    let horas_voluntario = document.querySelector("#horas_voluntario").value;
    let valor_bolsa = document.querySelector("#valor_bolsa").value;
    let id_disciplina = document.querySelector("#id_disciplina").value;
    let id_orientador = document.querySelector("#id_orientador").value;
    let id_escola = document.querySelector("#id_escola").value;
    let id_monitor = document.querySelector("#id_monitor").value;


    const res = await fetch("php/projeto/inserir_projeto.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data_inicio_projeto: data_inicio_projeto,
            status_monitor: status_monitor,
            forma_atendimento: forma_atendimento,
            horas_aula: horas_aula,
            horas_extraclasse: horas_extraclasse,
            modalidade: modalidade,
            horas_bolsa: horas_bolsa,
            horas_voluntario: horas_voluntario,
            valor_bolsa: valor_bolsa,
            id_disciplina: id_disciplina,
            id_orientador: id_orientador,
            id_escola: id_escola,
            id_monitor: id_monitor
        })
    });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#data_inicio_projeto").value = "";
        document.querySelector("#status_monitor").value = "";
        document.querySelector("#forma_atendimento").value = "";
        document.querySelector("#horas_aula").value = "";
        document.querySelector("#horas_extraclasse").value = "";
        document.querySelector("#modalidade").value = "";
        document.querySelector("#horas_bolsa").value = "";
        document.querySelector("#horas_voluntario").value = "";
        document.querySelector("#valor_bolsa").value = "";
        document.querySelector("#id_disciplina").value = "";
        document.querySelector("#id_orientador").value = "";
        document.querySelector("#id_escola").value = "";
        document.querySelector("#id_monitor").value = "";
        
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
        const res = await fetch("php/projeto/listar_projeto.php", {
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
            <td>${output[i].id_projeto}</td>
            <td>${output[i].data_inicio_projeto}</td>
            <td>${output[i].status_monitor}</td>
            <td>${output[i].forma_atendimento}</td>
            <td>${output[i].horas_aula}</td>
            <td>${output[i].horas_extraclasse}</td>
            <td>${output[i].modalidade}</td>
            <td>${output[i].horas_bolsa}</td>
            <td>${output[i].horas_voluntario}</td>
            <td>${output[i].valor_bolsa}</td>
            <td>${output[i].id_escola_campus}</td>
            <td>${output[i].id_disciplina}</td>
            <td><button onclick="editStudent(${output[i].id_projeto})" class="btn btn-success" style="display: flex;"><i class="fa-solid fa-pen""></i> Edit</button></td>
            <td><button onclick="deleteStudent(${output[i].id_projeto})" class="btn btn-danger" style="display: flex;"><i class="fa-solid fa-trash" "></i> Delete</button></td>
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

const editStudent = async (id_projeto) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/projeto/editar_projeto.php?id_projeto=${id_projeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_projeto").value = output[i].id_projeto;
            document.querySelector("#edit_data_inicio_projeto").value = output[i].data_inicio_projeto;
            document.querySelector("#edit_status_monitor").value = output[i].status_monitor;
            document.querySelector("#edit_forma_atendimento").value = output[i].forma_atendimento;
            document.querySelector("#edit_horas_aula").value = output[i].horas_aula;
            document.querySelector("#edit_horas_extraclasse").value = output[i].horas_extraclasse;
            document.querySelector("#edit_modalidade").value = output[i].modalidade;
            document.querySelector("#edit_horas_bolsa").value = output[i].horas_bolsa;
            document.querySelector("#edit_horas_voluntario").value = output[i].horas_voluntario;
            document.querySelector("#edit_valor_bolsa").value = output[i].valor_bolsa;
            document.querySelector("#edit_id_disciplina").value = output[i].id_disciplina;
            document.querySelector("#edit_id_escola").value = output[i].id_escola_campus;

        }
    }
}

// // // Atualizar escola

update.addEventListener("click", async () => {

    let id_projeto = document.querySelector("#edit_id_projeto").value;
    let data_inicio_projeto = document.querySelector("#edit_data_inicio_projeto").value;
    let status_monitor = document.querySelector("#edit_status_monitor").value;
    let forma_atendimento = document.querySelector("#edit_forma_atendimento").value;
    let horas_aula = document.querySelector("#edit_horas_aula").value;
    let horas_extraclasse = document.querySelector("#edit_horas_extraclasse").value;
    let modalidade = document.querySelector("#edit_modalidade").value;
    let horas_bolsa = document.querySelector("#edit_horas_bolsa").value;
    let horas_voluntario = document.querySelector("#edit_horas_voluntario").value;
    let valor_bolsa = document.querySelector("#edit_valor_bolsa").value;
    let id_disciplina = document.querySelector("#edit_id_disciplina").value;
    let id_escola = document.querySelector("#edit_id_escola").value; 
    

    console.log("Valores enviados:", {
        id_projeto,
        data_inicio_projeto,
        status_monitor,
        forma_atendimento,
        horas_aula,
        horas_extraclasse,
        modalidade,
        horas_bolsa,
        horas_voluntario,
        valor_bolsa,
        id_disciplina,
        id_escola,
    });


    const res = await fetch("php/projeto/atualizar_projeto.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_projeto": id_projeto,
            "data_inicio_projeto": data_inicio_projeto,
            "status_monitor": status_monitor,
            "forma_atendimento": forma_atendimento,
            "horas_aula": horas_aula,
            "horas_extraclasse": horas_extraclasse,
            "modalidade": modalidade,
            "horas_bolsa": horas_bolsa,
            "horas_voluntario": horas_voluntario,
            "valor_bolsa": valor_bolsa,
            "id_disciplina": id_disciplina,
            "id_escola": id_escola,
            
        })
    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_id_projeto").value = "";
        document.querySelector("#edit_data_inicio_projeto").value = "";
        document.querySelector("#edit_status_monitor").value = "";
        document.querySelector("#edit_forma_atendimento").value = "";
        document.querySelector("#edit_horas_aula").value = "";
        document.querySelector("#edit_horas_extraclasse").value = "";
        document.querySelector("#edit_modalidade").value = "";
        document.querySelector("#edit_horas_bolsa").value = "";
        document.querySelector("#edit_horas_voluntario").value = "";
        document.querySelector("#edit_valor_bolsa").value = "";
        document.querySelector("#edit_id_disciplina").value = "";
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

// // // Deletar escola

const deleteStudent = async (id_projeto) => {
    const res= await fetch("php/projeto/delete_projeto.php?id_projeto=" + id_projeto, {
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
    const res = await fetch("php/projeto/contar_projeto.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_projetos;
    
}

getTotalCount();