package io.magelssen.repositories;

import io.magelssen.entities.Task;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface TaskRepository extends CrudRepository<Task, Long> {
}