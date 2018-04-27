CREATE TABLE show ( 
    show_id TEXT, 
    name TEXT unique not null, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    password TEXT,
    CONSTRAINT show_pk PRIMARY KEY (show_id)
);
CREATE TABLE step ( 
    step_id TEXT, 
    show_id TEXT,
    cueOrder INTEGER not null,
    name TEXT not null, 
    canal INT not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    UNIQUE (show_id, cueOrder),
    CONSTRAINT step_pk PRIMARY KEY (step_id),
    CONSTRAINT step_show_fk FOREIGN KEY (show_id) REFERENCES show(show_id) ON DELETE CASCADE
);