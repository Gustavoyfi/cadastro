const getStudents = async () => {
    try {
        const tbody = document.querySelector("#tbody");
        let tr = "";
        const res = await fetch("php/orientador/controle_monitor.php", {
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
                <td>${output[i].data_sesao}</td>
                <td>${output[i].horario_inicio_sessao}</td>
                <td>${output[i].horario_fim_sessao}</td>
                <td>${output[i].local_sessao}</td>
                <td>${output[i].id_projeto}</td>
                <td>${output[i].nome_monitor}</td>
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