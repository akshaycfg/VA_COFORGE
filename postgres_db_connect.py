import configparser
import os
import psycopg2



def create_config(username,password,host,port,dbname,project_name):
    try:
        config = configparser.ConfigParser()
        os.makedirs(project_name,exist_ok=True)
        config.add_section('Database')
        config.set('Database', 'username', username)
        config.set('Database', 'password', password)
        config.set('Database', 'host', host)
        config.set('Database', 'port', port)
        config.set('Database', 'dbname', dbname)

        with open(f'{project_name}/source_config.ini', 'w') as configfile:
            config.write(configfile)
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


def pg_db_connect(project_name):
    try:
        config_path=f'{project_name}/source_config.ini'
        #config_path=f'{project_name}/config.ini'
        config = configparser.ConfigParser()
        config.read(config_path)
        username=config.get("Database","username")
        password = config.get("Database", "password")
        host = config.get("Database", "host")
        port = config.get("Database", "port")
        dbname = config.get("Database", "dbname")
        connection= psycopg2.connect(database=dbname, user=username, password=password, host=host, port=port)
        return connection
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}



def test_connection(username,password,dbname,host,port):
    try:

        connection= psycopg2.connect(database=dbname, user=username, password=password, host=host, port=port)
        connection.close()
        return {"status": "Connection Successful"}
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": "Connection UnSuccessful"}

