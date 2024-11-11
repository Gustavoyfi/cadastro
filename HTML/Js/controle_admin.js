const getStudents = async () => {
    try {
        const tbody = document.querySelector("#tbody");
        let tr = "";
        const res = await fetch("php/administrador/controle_monitor.php", {
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
                <td>${output[i].nome_monitor}</td>
                <td>${output[i].nome_curso}</td>
                <td>${output[i].nome_disciplina}</td>
                <td>${output[i].id_projeto}</td>
                <td>${output[i].status_monitor}</td>
                <td>${output[i].horas_bolsa}</td>
                <td>${output[i].valor_bolsa}</td>
                <td>${output[i].nome_orientador}</td>
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