<?php
    define('DB_SERVER', 'localhost:3306');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', ''); // Senha padrão do XAMPP MySQL é vazia
    define('DB_DATABASE', 'monitoria_pro');

    function conectar() {
		$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
		
		if ($conn->connect_error) {
			die("Falha na conexão: " . $conn->connect_error);
		}
		
		return $conn;
	}

    function fechar_conexao($conn) {
		$conn->close();
	}
?>