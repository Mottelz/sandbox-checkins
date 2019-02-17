CREATE TABLE Cards(
    cid unsigned int(12) not null UNIQUE,
    sid unsigned int(12) not null,
    primary key(cid),
    FOREIGN key (sid) REFERENCES Volunteers(sid)
);

CREATE TABLE Volunteers(
    sid unsigned int(8) not null UNIQUE,
    fname string not null,
    lname string not null,
    email string,
    primary key(sid)
);

CREATE TABLE Schedules(
    sid unsigned int(12) not null,
    day string not null,
    intime int(2) not null,
    outtime int(2) not null,
    term string not null,
    PRIMARY KEY (sid, term),
    FOREIGN key (sid) REFERENCES Volunteers(sid)
);

CREATE TABLE Checkins(
    sid unsigned int(12) not null,
    checkintime string not null,
    FOREIGN key (sid) REFERENCES Volunteers(sid)
);

CREATE TABLE Projects(
    pid unsigned int not null UNIQUE,
    description string not null,
    title string not null,
    primary key(pid)
);

CREATE TABLE Working(
    pid unsigned int not null,
    sid unsigned int(12) not null,
    FOREIGN key (sid) REFERENCES Volunteers(sid),
    FOREIGN key (pid) REFERENCES Projects(pid)
);