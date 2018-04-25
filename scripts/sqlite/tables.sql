CREATE TABLE IF NOT EXISTS show ( 
    show_id TEXT, 
    name TEXT unique not null, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    password TEXT,
    CONSTRAINT show_pk PRIMARY KEY (show_id)
);
CREATE TABLE IF NOT EXISTS showStep ( 
    showStep_id TEXT, 
    show_id TEXT,
    cueOrder INTEGER not null,
    name TEXT unique not null, 
    canal INT not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    CONSTRAINT showStep_pk PRIMARY KEY (showStep_id),
    CONSTRAINT showStep_show_fk FOREIGN KEY (show_id) REFERENCES show(show_id)
);