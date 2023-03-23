CREATE SEQUENCE task_seq START 1 INCREMENT 1;

create table task(
    id INT,
    title VARCHAR(50),
    description VARCHAR(100),
    completed BOOLEAN,
    PRIMARY KEY (id)
);
