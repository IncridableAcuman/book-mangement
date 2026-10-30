package com.book.library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;

@SpringBootApplication
public class LibraryApplication {

	public static void main(String[] args) {
		try {
			Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
			for (DotenvEntry entry : dotenv.entries()) {
				if (System.getProperty(entry.getKey()) == null && System.getenv(entry.getKey()) == null) {
					System.setProperty(entry.getKey(), entry.getValue());
				}
			}
		} catch (Exception ignored) {
		}

		// Agar Render yoki boshqa platforma DATABASE_URL bergan bo'lsa, JDBC formatga moslaymiz
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl != null && !databaseUrl.isBlank() && System.getProperty("DB_URL") == null && System.getenv("DB_URL") == null) {
			if (databaseUrl.startsWith("postgres://")) {
				databaseUrl = databaseUrl.replaceFirst("postgres://", "jdbc:postgresql://");
			} else if (databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("jdbc:postgresql://")) {
				databaseUrl = "jdbc:" + databaseUrl;
			}
			System.setProperty("DB_URL", databaseUrl);
		}

		SpringApplication.run(LibraryApplication.class, args);
	}

}
