<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    // if(isset($_POST["nome_orientador"]) || isset($_POST["carga_horaria_disciplina"]) isset($_POST["telefone_orientador"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);


        $data_inicio_projeto = $decode["data_inicio_projeto"];
        $status_monitor = $decode["status_monitor"];
        $forma_atendimento = $decode["forma_atendimento"];
        $horas_aula = $decode["horas_aula"];
        $horas_extraclasse = $decode["horas_extraclasse"];
        $modalidade = $decode["modalidade"];
        $horas_bolsa = $decode["horas_bolsa"];
        $horas_voluntario = $decode["horas_voluntario"];
        $valor_bolsa = $decode["valor_bolsa"];
        $id_disciplina = $decode["id_disciplina"];
        $id_orientador = $decode["id_orientador"];
        $id_escola_campus = $decode["id_escola"];
        $id_monitor = $decode["id_monitor"];

        $conn = conectar();

        try {
            $conn = conectar();
        
            $stmt = $conn->prepare("CALL sp_inserir_projeto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
            $stmt->bind_param(
                'iiisssiiiiiidi', 
                $id_escola_campus,
                $id_disciplina,
                $id_orientador,
                $data_inicio_projeto,
                $status_monitor,
                $forma_atendimento,
                $horas_aula,
                $horas_extraclasse,
                $modalidade,
                $horas_bolsa,
                $horas_voluntario,
                $valor_bolsa,
                $id_monitor,
                $id_curso
            );
        

            $stmt->execute();
        
            
            echo json_encode(["status" => "success", "message" => "Projeto inserido com sucesso"]);
        } catch (mysqli_sql_exception $e) {

            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        } finally {
       
            $stmt->close();
            $conn->close();
        }

        fechar_conexao($conn);
    

?>