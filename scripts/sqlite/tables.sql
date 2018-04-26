CREATE TABLE IF NOT EXISTS show ( 
    show_id TEXT, 
    name TEXT unique not null, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    password TEXT,
    CONSTRAINT show_pk PRIMARY KEY (show_id)
);
CREATE TABLE IF NOT EXISTS step ( 
    step_id TEXT, 
    show_id TEXT,
    cueOrder INTEGER not null,
    name TEXT unique not null, 
    canal INT not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    CONSTRAINT step_pk PRIMARY KEY (step_id),
    CONSTRAINT step_show_fk FOREIGN KEY (show_id) REFERENCES show(show_id)
);