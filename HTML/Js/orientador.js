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
    let nome_orientador = document.querySelector("#nome_orientador").value;
    let email_orientador = document.querySelector("#email_orientador").value;
    let telefone_orientador = document.querySelector("#telefone_orientador").value;
    let senha_orientador = document.querySelector("#senha_orientador").value;

    const res = await fetch("php/orientador/inserir_orientador.php", {
        method: "POST",
        body: JSON.stringify({"nome_orientador": nome_orientador, "email_orientador": email_orientador, "telefone_orientador": telefone_orientador, "senha_orientador": senha_orientador}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const output = await res.json();

    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        nome_orientador = "";
        email_orientador = "";
        telefone_orientador = "";
        senha_orientador = "";
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
        const res = await fetch("php/orientador/listar_orientador.php", {
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
            <td>${output[i].id_orientador}</td>
            <td>${output[i].nome_orientador}</td>
            <td>${output[i].email_orientador}</td>
            <td>${output[i].telefone_orientador}</td>
            <td>${output[i].senha_orientador}</td>
            <td><button onclick="editStudent(${output[i].id_orientador})" class="btn btn-success"><i class="fa-solid fa-pen"></i>Edit</button></td>
            <td><button onclick="deleteStudent(${output[i].id_orientador})"  class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button></td>
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

const editStudent = async (id_orientador) => {
    update_modal.style.display = "flex";

    const res = await fetch(`php/orientador/editar_orientador.php?id_orientador=${id_orientador}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const output = await res.json();
    if(output["empty"] !== "empty"){
        for (var i in output){
            document.querySelector("#edit_id_orientador").value = output[i].id_orientador;
            document.querySelector("#edit_nome_orientador").value = output[i].nome_orientador;
            document.querySelector("#edit_email_orientador").value = output[i].email_orientador;
            document.querySelector("#edit_telefone_orientador").value = output[i].telefone_orientador;
            document.querySelector("#edit_senha_orientador").value = output[i].senha_orientador;

        }
    }
}

// // Atualizar escola

update.addEventListener("click", async () => {


    let id_orientador = document.querySelector("#edit_id_orientador").value;
    let nome_orientador = document.querySelector("#edit_nome_orientador").value;
    let email_orientador = document.querySelector("#edit_email_orientador").value;
    let telefone_orientador = document.querySelector("#edit_telefone_orientador").value;
    let senha_orientador = document.querySelector("#edit_senha_orientador").value;

    console.log("Valores enviados:", { id_orientador, nome_orientador, email_orientador, telefone_orientador, senha_orientador });

    const res = await fetch("php/orientador/atualizar_orientador.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id_orientador": id_orientador,
            "nome_orientador": nome_orientador,
            "email_orientador": email_orientador,
            "telefone_orientador": telefone_orientador,
            "senha_orientador": senha_orientador
        })

    });

    const output = await res.json();
    if(output.success){
        success.style.display = "flex";
        success.innerText = output.message;
        document.querySelector("#edit_nome_orientador").value = "";
        document.querySelector("#edit_email_orientador").value = "";
        document.querySelector("#edit_telefone_orientador").value = "";
        document.querySelector("#edit_senha_orientador").value = "";
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

const deleteStudent = async (id_orientador) => {
    const res= await fetch("php/orientador/delete_orientador.php?id_orientador=" + id_orientador, {
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
    const res = await fetch("php/orientador/contar_orientador.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output.total_orientadores;
    
}
getTotalCount();