package com.revenue.report.config;

import org.hibernate.dialect.DatabaseVersion;
import org.hibernate.dialect.Dialect;

public class SqliteJDBCDialect extends Dialect{
	
	public SqliteJDBCDialect() {
		super(DatabaseVersion.make(6));
	}

}
