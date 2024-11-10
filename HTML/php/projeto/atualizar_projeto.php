<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    $input = file_get_contents("php://input");
    $decode = json_decode($input, true);

    // Define os dados que serão atualizados
    $id_projeto = $decode["id_projeto"]; // Parâmetro adicional para identificar o projeto a ser atualizado
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
    $id_curso = $decode["id_curso"]; // Incluído para o parâmetro do curso

    try {
        $conn = conectar();

        // Prepara a chamada para a procedure sp_atualizar_projeto
        $stmt = $conn->prepare("CALL sp_atualizar_projeto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        // Associa os parâmetros aos respectivos tipos e valores
        $stmt->bind_param(
            'iiisssiiiiiidiii', 
            $id_projeto,
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

        // Executa a procedure
        $stmt->execute();
        
        // Retorna uma resposta de sucesso
        echo json_encode(["status" => "success", "message" => "Projeto atualizado com sucesso"]);
    } catch (mysqli_sql_exception $e) {
        // Retorna uma mensagem de erro
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    } finally {
        // Fecha a conexão e a declaração preparada
        $stmt->close();
        $conn->close();
    }

?>
