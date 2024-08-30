import json

def metadata_to_ddl(project_name):
    try:
        with open(f"projects.json", 'r') as json_file:
            projects = json.load(json_file)
        project_info=projects.get(project_name)
        ddls={}
        for config in project_info['list_of_configs']:
            with open(f"{project_name}/{config[:-3]}/metadata.json", 'r') as json_file:
                metadata = json.load(json_file)
                table_info=metadata.get('tables')
                for table in table_info:
                    ddl=f"CREATE TABLE {table.get('table_name')} ("
                    for field in table.get('schema').get('fields'):
                        ddl=ddl + field.get('name')
                        ddl=ddl + ' '
                        ddl=ddl + field.get('silver_data_type')
                        ddl = ddl + ','
                        ddl = ddl + '\n'
                    ddl = ddl[:-2] + ")" + "\n" + "USING DELTA"
                    ddl = ddl + "\n" + "LOCATION"
                    #print(ddl)
                    ddls[table.get('table_name')]=ddl
            with open(f"{project_name}/{config[:-3]}/ddls.json", "w") as outfile:
                json.dump(ddls, outfile, indent=4)
        return f"Mapping is successfully done for {project_info['list_of_configs']} "
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}

