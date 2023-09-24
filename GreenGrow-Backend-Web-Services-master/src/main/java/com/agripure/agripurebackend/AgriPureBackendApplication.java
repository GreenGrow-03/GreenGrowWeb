package com.agripure.agripurebackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

@SpringBootApplication
public class AgriPureBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgriPureBackendApplication.class, args);
	}


	@Autowired
	private DataSource dataSource;

	@PostConstruct
	public void createDatabaseIfNotExist() throws SQLException {
		try (Connection conn = dataSource.getConnection()) {
			// Verificar si la base de datos ya existe
			ResultSet resultSet = conn.getMetaData().getCatalogs();
			boolean databaseExists = false;
			while (resultSet.next()) {
				String databaseName = resultSet.getString(1);
				if ("agripuredb".equalsIgnoreCase(databaseName)) {
					databaseExists = true;
					break;
				}
			}
			resultSet.close();

			// Si la base de datos no existe, crearla
			if (!databaseExists) {
				conn.createStatement().execute("CREATE DATABASE agripuredb");
			}
		}
	}
}
