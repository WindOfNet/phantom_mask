use test;

create table
	if not exists pharmacy (
		name varchar(50),
		cashBalance decimal(12, 2) not null,
		primary key (name)
	);

create table
	if not exists pharmacyOpeningInfo (
		pharmacyName varchar(50),
		dayOfWeek int,
		openTime char(4) not null,
		closeTime char(4) not null,
		primary key (pharmacyName, dayOfWeek),
		constraint FK_PharmacyOpeningInfo_PharmacyName foreign key (pharmacyName) references pharmacy (name)
	);

create table
	if not exists pharmacyMask (
		pharmacyName varchar(50),
		maskName varchar(200),
		price decimal(5, 2) not null,
		primary key (pharmacyName, maskName),
		constraint FK_PharmacyMask_PharmacyName foreign key (pharmacyName) references pharmacy (name)
	);

create table
	if not exists user (
		name varchar(50),
		cashBalance decimal(5, 2) not null,
		primary key (name)
	);

create table
	if not exists userPurchaseHistory (
		userName varchar(50),
		pharmacyName varchar(50),
		maskName varchar(200),
		transactionAmount decimal(5, 2),
		transactionDate timestamp,
		primary key (userName, pharmacyName, maskName, transactionDate),
		constraint FK_UserPurchaseHistory_UserName foreign key (userName) references user (name),
		constraint FK_UserPurchaseHistory_PharmacyMask foreign key (pharmacyName, maskName) references pharmacyMask (pharmacyName, maskName)
	);