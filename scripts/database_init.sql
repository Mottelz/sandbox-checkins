CREATE TABLE Volunteers(
    cid unsigned int(12) not null UNIQUE,
    fname string not null,
    lname string not null,
    email string,
    sid unsigned int(8) not null UNIQUE,
    primary key(id)
);

CREATE TABLE Schedules(
    cid unsigned int(12) not null,
    day string not null,
    time string not null,
    term string not null,
    FOREIGN key (cid) REFERENCES Volunteer(cid)
);

CREATE TABLE Swipes(
    cid unsigned int(12) not null,
    checkintime sting not null,
    FOREIGN key (cid) REFERENCES Volunteer(cid)
);

CREATE TABLE Projects(
    pid unsigned int not null UNIQUE,
    description string not null,
    primary key(pid)
);

CREATE TABLE Working(
    pid unsigned int not null,
    cid unsigned int(12) not null,
    FOREIGN key (cid) REFERENCES Volunteer(cid),
    FOREIGN key (pid) REFERENCES Projects(pid)
);