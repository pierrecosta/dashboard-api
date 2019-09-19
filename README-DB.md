
# Retrieve the docker image
docker pull postgres

# Launch the container (port host:container)
docker run -d --name nodeBdd -p 6551:5432 -v ./postgres-data:/var/lib/postgresql -e POSTGRES_PASSWORD=MyNewPassword postgres

# Access to container
docker exec -ti [db-container] bash

# Configure SSH
apt-get update
apt-get install -y openssh-server openssh-client
sed -i 's|^PermitRootLogin.*|PermitRootLogin yes|g' /etc/ssh/sshd_config
sed -i 's|^#PermitRootLogin.*|PermitRootLogin yes|g' /etc/ssh/sshd_config
service ssh start
passwd
*** MyNewPassword

# Access to psql interface
su postgres
psql

#PSQL Init Scripts
## Create DB
CREATE DATABASE dashboard
	WITH ENCODING='UTF8';

## Add read user
GRANT CONNECT ON DATABASE dashboard TO readuser;
GRANT USAGE ON SCHEMA public TO readuser;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO readuser;

## Create tables
## Orga
CREATE TABLE plateform (
	plateform_id serial PRIMARY KEY,
	plateform_s_name VARCHAR (5) NOT NULL,
	plateform_l_name VARCHAR (25) NOT NULL,
	plateform_desc VARCHAR (100),
	PRIMARY KEY (plateform_id)
);

CREATE TABLE squad (
	squad_id serial PRIMARY KEY,
	squad_name VARCHAR (20) NOT NULL,
	squad_email VARCHAR (30) NOT NULL,
	plateform_id integer NOT NULL,
	CONSTRAINT plateform_id_fkey FOREIGN KEY (plateform_id)
		REFERENCES plateform (plateform_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	PRIMARY KEY (squad_id, plateform_id)
);

INSERT INTO plateform (plateform_s_name, plateform_l_name, plateform_desc) VALUES
   ('PFD', 'Plateforme Data', 'Projets de la tribu data'),
   ('PDT', 'Plateforme Digitale', 'Projets dans un cadre digital');
   
INSERT INTO squad (squad_name, squad_email, plateform_id) VALUES
   ('Socle', 'socle at ca' 1),
   ('Data', 'data at ca', 1),
   ('IFRS17', 'IFRS17 at ca', 1),
   ('Perf Op', 'Perf at ca', 1),
   ('Conn Client', 'Client at ca', 1);

## Appli
CREATE TABLE application (
	application_id serial PRIMARY KEY,
	application_name VARCHAR (10) NOT NULL,
	application_git_url VARCHAR (250) NOT NULL,
	application_jenkins_url VARCHAR (250) NOT NULL,
	application_nexus_url VARCHAR (250) NOT NULL,
	application_synergy_groupement VARCHAR (20) NOT NULL,
	application_end_url VARCHAR (20) NOT NULL,
	PRIMARY KEY (application_id)
);

INSERT INTO application (application_name, application_git_url, application_jenkins_url, application_nexus_url, application_synergy_groupement, application_end_url) VALUES
   ('myFirstApp', 'http://git/myFirstApp', 'http://jenkins/myFirstApp', 'http://nexus/myFirstApp', 'xGC_myFirstApp', '/myFirstApp/home/'),
   ('mySecondApp', 'http://git/mySecondApp', 'http://jenkins/mySecondApp', 'http://nexus/mySecondApp', 'xGC_mySecondApp', '/mySecondApp/home/');

## Environment
CREATE TABLE environment (
	env_id serial PRIMARY KEY,
	env_name VARCHAR (10) NOT NULL,
	env_desc VARCHAR (100),
	PRIMARY KEY (env_id));
	
INSERT INTO environment (env_name, env_desc) VALUES
   ('synergy', 'Application depose dans Synergy'),
   ('d1d', 'Environnement de dev Socle'),
   ('d2d', 'Environnement de dev Usage'),
   ('d3d', 'Environnement de dev Usage'),
   ('d4d', 'Environnement de dev Usage'),
   ('d5d', 'Environnement de dev Data'),
   ('itd', 'Environnement d integration socle et data'),
   ('rtd', 'Environnement de recette metier');

## Server
CREATE TABLE server (
	server_id serial PRIMARY KEY,
	server_name VARCHAR (10) NOT NULL,
	server_desc VARCHAR (100),
	env_id integer NOT NULL,
	CONSTRAINT env_id_fkey FOREIGN KEY (env_id)
		REFERENCES environment (env_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	PRIMARY KEY (server_id));
	
INSERT INTO server (server_name, server_desc, env_id) VALUES
   ('vx-xxx-001', 'Node1', '2'),
   ('vx-xxx-002', 'Node2', '2'),
   ('vx-xxx-003', 'Node3', '2'),
   ('vx-xxy-001', 'Node1', '3'),
   ('vx-xxx-002', 'Node2', '3'),
   ('vx-xxx-003', 'Node3', '3');

## Relation Squad Environment
CREATE TABLE t_squad_environment (
	t_squad_environment_id serial PRIMARY KEY,
	squad_id INTEGER NOT NULL,
	env_id integer NOT NULL,
	order integer NOT NULL,	
	CONSTRAINT squad_id_fkey FOREIGN KEY (squad_id)
		REFERENCES squad (squad_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT env_id_fkey FOREIGN KEY (env_id)
		REFERENCES environment (env_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	PRIMARY_KEY (env_id, squad_id)
);

INSERT INTO t_squad_environment (squad_id, env_id, order) VALUES
   (1, 1, 1),
   (1, 6, 2),
   (1, 5, 3),
   (1, 2, 4),
   (1, 3, 5),
   (1, 4, 6),
   (1, 7, 7),
   (2, 5, 1),
   (2, 6, 2),
   (3, 2, 1),
   (3, 7, 2),
   (4, 3, 1),
   (4, 7, 2),
   (5, 4, 1),
   (5, 7, 2);
   
## Relation Application Environment
CREATE TABLE t_application_environment (
	t_application_environment_id serial PRIMARY KEY,
	application_id INTEGER NOT NULL,
	env_id integer NOT NULL,
	health_status integer DEFAULT 1,	
	CONSTRAINT squad_id_fkey FOREIGN KEY (squad_id)
		REFERENCES squad (squad_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT env_id_fkey FOREIGN KEY (env_id)
		REFERENCES environment (env_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	PRIMARY_KEY (env_id, squad_id)
);

INSERT INTO t_application_environment (application_id, env_id, health_status) VALUES
	(1, 1, 1),
	(2, 1, 1),
	(1, 1, 1),
	(1, 7, 1);

## Insert data

('synergy', 'Application depose dans Synergy'),
   ('d1d', 'Environnement de dev Socle'),
   ('d2d', 'Environnement de dev Usage'),
   ('d3d', 'Environnement de dev Usage'),
   ('d4d', 'Environnement de dev Usage'),
   ('d5d', 'Environnement de dev Data'),
   ('itd', 'Environnement d integration socle et data'),
   ('rtd', 'Environnement de recette metier');
   
   
 ('synergy', 'Application depose dans Synergy'),
   ('d1d', 'Environnement de dev Socle'),
   ('d2d', 'Environnement de dev Usage'),
   ('d3d', 'Environnement de dev Usage'),
   ('d4d', 'Environnement de dev Usage'),
   ('d5d', 'Environnement de dev Data'),
   ('d0d', 'Environnement de dev Maintenance');
   
INSERT INTO environment (env_name, plateform_id, plateform_desc)
VALUES
   ('dod', 1, 'Projets dans un cadre data'),
   ('d1d', 1, 'Projets dans un cadre digital'); 
## Quit
\q