import json
import re
def get_schemas(cursor):
    try:
        cursor.execute("SELECT schema_name FROM information_schema.schemata;")
        schemas=[row[0] for row in cursor.fetchall()]
        return schemas
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}



def save_schemas(selected_schema,project_name):
    try:
        with open(f"{project_name}/selected_schema.json", "w") as outfile:
            json.dump(selected_schema, outfile, indent=4)
        return selected_schema
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}

def save_configs(inp):
    try:
        project_name=inp['project_name']
        selected_configs = {}
        selected_configs[inp["project_name"]] = {}
        selected_configs[inp["project_name"]]["config_slct"] = inp["list_of_configs"]
        with open(f"{project_name}/selected_configs.json", "w") as outfile:
            json.dump(selected_configs, outfile, indent=4)
        return f"Successfully Saved Config files: {inp['list_of_configs']}"
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


def get_tables(cursor, schema_name):
    try:
        cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = %(schema_name)s AND table_type = 'BASE TABLE';",
                       {"schema_name":schema_name})
        tables=[row[0] for row in cursor.fetchall()]
        return tables
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}



def get_table_info(cursor, schema_name, table_name):
    try:
        data = {"columns": [], "primary_key": None, "foreign_keys": []}
        cursor.execute("""
        SELECT column_name, data_type, is_nullable, character_maximum_length
          FROM information_schema.columns
          WHERE table_schema = %(schema_name)s AND table_name = %(table_name)s
          """, {"schema_name" : schema_name, "table_name" : table_name})
        for col_name, data_type, nullable, data_length in cursor.fetchall():
            data["columns"].append({
                "name": col_name,
                "data_type": data_type,
                "nullable": nullable == "Y",
                "max_length": data_length
            })

        cursor.execute("""
          SELECT column_name
          FROM information_schema.constraint_column_usage c
          JOIN information_schema.table_constraints cons ON c.constraint_name = cons.constraint_name
          WHERE cons.constraint_type = 'PRIMARY KEY'
          AND cons.table_name = %(table_name)s
          AND cons.table_schema = %(schema_name)s
          """, {"schema_name" : schema_name, "table_name" : table_name})
        primary_key = [row[0] for row in cursor.fetchall()]
        if primary_key:
            data["primary_key"] = primary_key
        print(schema_name,table_name)
        query=f"""select conrelid::regclass AS table_name,
           conname AS foreign_key_name,
           pg_get_constraintdef(oid) AS constraint_definition,
           confrelid::regclass AS ref_table
           FROM pg_constraint
            WHERE contype = 'f'
            AND connamespace = '{schema_name}'::regnamespace
              AND conrelid = '{schema_name}.{table_name}'::regclass
            ORDER BY conrelid::regclass::text, contype DESC;"""
        '''cursor.execute("""
           select conrelid::regclass AS table_name,
           conname AS foreign_key_name,
           pg_get_constraintdef(oid) AS constraint_definition,
           confrelid::regclass AS ref_table
           FROM pg_constraint
            WHERE contype = 'f'
            AND connamespace = %(schema_name)s::regnamespace
              AND conrelid = %(conrelid)s::regclass
            ORDER BY conrelid::regclass::text, contype DESC;
          """, {"schema_name" : schema_name,"conrelid":f"{schema_name}.{table_name}"})'''
        #print(query)
        cursor.execute(query)
        F_KEYS=cursor.fetchall()
        if F_KEYS:
            for a, b, c, d in F_KEYS:
                data["foreign_keys"].append({
                    "column": re.search(r"_(.*?)_fkey", b).group(1),
                    "references": {
                        "schema":re.search(r"^(.*?)\.", d).group(1),
                        "table": re.search(r"\.(.*?)$", d).group(1),
                        "column": re.search(r".*\(([^()]*)\)\s*$", c).group(1)
                    }
                })

        return data
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


def create_schema_data(cursor,schemas):
    try:
        data = {}
        for schema in schemas:
            data[schema] = get_tables(cursor, schema)
        return data
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


def create_metadata_data(cursor,schemas):
    try:
        data = {}
        for schema in schemas:
            tables = {}
            for table in get_tables(cursor, schema):
                tables[table] = get_table_info(cursor=cursor, schema_name=schema, table_name=table)
            data[schema] = tables
        return data
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}

def save_info(cursor,project_name):
    try:
        with open(f'{project_name}/selected_schema.json', 'r') as json_file:
            selected_schema = json.load(json_file)
        list_of_schema=selected_schema[project_name]["schema_slct"]
        schema_info=create_schema_data(cursor,list_of_schema)
        metadata_info=create_metadata_data(cursor,list_of_schema)
        with open(f"{project_name}/schema_data.json", "w") as outfile:
            json.dump(schema_info, outfile, indent=4)

        with open(f"{project_name}/metadata.json", "w") as outfile:
            json.dump(metadata_info, outfile, indent=4)
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}




