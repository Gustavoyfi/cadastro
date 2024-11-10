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
    let data_sesao = document.querySelector("#data_sesao").value;
    let horario_inicio_sessao = document.querySelector("#horario_inicio_sessao").value;
    let horario_fim_sessao = document.querySelector("#horario_fim_sessao").value;
    let local_sessao = document.querySelector("#local_sessao").value;
    let descricao_sessao = document.querySelector("#descricao_sessao").value;
    let id_monitor = document.querySelector("#id_monitor").value;
    let id_projeto = document.querySelector("#id_projeto").value;

    const res = await fetch("php/sessao/inserir_sessao.php", {
        method: "POST",
        body: JSON.stringify({"data_sesao": data_sesao,
            "horario_inicio_sessao": horario_inicio_sessao,
            "horario_fim_sessao": horario_fim_sessao,
            "local_sessao": local_sessao,
            "descricao_sessao": descricao_sessao,
            "id_monitor": id_monitor,
            "id_projeto": id_projeto}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        data_sesao = "";
        horario_inicio_sessao = "";
        horario_fim_sessao = "";
        local_sessao = "";
        descricao_sessao = "";
        id_monitor = "";
        id_projeto = "";
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
        const res = await fetch("php/sessao/listar_sessao.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const output = await res.json();
        console.log(output);
        if(output.empty === "empty"){
            tr = "<tr>Não há registros de sessoes</tr>"
        }else{
            for (var i in output){
                tr += `
            <tr>
            <td>${output[i].id_sessoes}</td>
            <td>${output[i].data_sesao}</td>
            <td>${output[i].horario_inicio_sessao}</td>
            <td>${output[i].horario_fim_sessao}</td>
            <td>${output[i].local_sessao}</td>
            <td>${output[i].descricao_sessao}</td>
            <td>${output[i].id_monitor}</td>
            <td>${output[i].id_projeto}</td>
            <td><button onclick="editStudent(${output[i].id_sessoes})" class="btn btn-success"><i class="fa-solid fa-pen"></i>Edit</button></td>
            <td><button onclick="deleteStudent(${output[i].id_sessoes})" class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button></td>
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

const editStudent = async (id_sessoes) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/sessao/editar_sessao.php?id_sessoes=${id_sessoes}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_sessoes").value = output[i].id_sessoes;
            document.querySelector("#edit_data_sesao").value = output[i].data_sesao;
            document.querySelector("#edit_horario_inicio_sessao").value = output[i].horario_inicio_sessao;
            document.querySelector("#edit_horario_fim_sessao").value = output[i].horario_fim_sessao;
            document.querySelector("#edit_local_sessao").value = output[i].local_sessao;
            document.querySelector("#edit_descricao_sessao").value = output[i].descricao_sessao;
            document.querySelector("#edit_id_monitor").value = output[i].id_monitor;
            document.querySelector("#edit_id_projeto").value = output[i].id_projeto;

        }
    }
}

// // // Atualizar escola

update.addEventListener("click", async () => {


    let id_sessoes = document.querySelector("#edit_id_sessoes").value;
    let data_sesao = document.querySelector("#edit_data_sesao").value;
    let horario_inicio_sessao = document.querySelector("#edit_horario_inicio_sessao").value;
    let horario_fim_sessao = document.querySelector("#edit_horario_fim_sessao").value;
    let local_sessao = document.querySelector("#edit_local_sessao").value;
    let descricao_sessao = document.querySelector("#edit_descricao_sessao").value;
    let id_monitor = document.querySelector("#edit_id_monitor").value;
    let id_projeto = document.querySelector("#edit_id_projeto").value;

    console.log("Valores enviados:", { id_sessoes, data_sesao, horario_inicio_sessao, horario_fim_sessao, local_sessao, descricao_sessao, id_monitor, id_projeto });

    const res = await fetch("php/sessao/atualizar_sessao.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_sessoes": id_sessoes,
            "data_sesao": data_sesao,
            "horario_inicio_sessao": horario_inicio_sessao,
            "horario_fim_sessao": horario_fim_sessao,
            "local_sessao": local_sessao,
            "descricao_sessao": descricao_sessao,
            "id_monitor": id_monitor,
            "id_projeto": id_projeto
        })

    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_data_sesao").value = "";
        document.querySelector("#edit_id_sessao").value = "";
        document.querySelector("#edit_horario_inicio_sessao").value = "";
        document.querySelector("#edit_horario_fim_sessao").value = "";
        document.querySelector("#edit_local_sessao").value = "";
        document.querySelector("#edit_descricao_sessao").value = "";
        document.querySelector("#edit_id_monitor").value = "";
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

// // // Deletar escola

const deleteStudent = async (id_sessoes) => {
    const res= await fetch("php/sessao/delete_sessao.php?id_sessoes=" + id_sessoes, {
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
    const res = await fetch("php/sessao/contar_sessao.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_sessoes;
    
}
getTotalCount();