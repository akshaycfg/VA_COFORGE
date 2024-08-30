import list_business_files
import postgres_db_connect as pgdbconnect
import create_projects as createprj
import list_projects as listprj
import get_source_info_postgres as gsip
import generate_metadata_schema as gms
import metadata_to_ddl as mtd

from flask import Flask, request, render_template, session, redirect, url_for, Response, jsonify
import os
import json



app = Flask(__name__)
app.secret_key = os.urandom(12)




@app.route('/create_project', methods=['GET', 'POST'])
def create_project():
    try:
        inp=json.loads(request.data)
        project_creation_status=createprj.create_project(inp["project_name"],inp["description"],inp["source"],inp["target"],inp["created_by"],inp['list_of_configs'],inp['metadata_source'],inp["source_database_type"])
        if inp["source_database_type"] == "PostgreSQL":
            pgdbconnect.create_config(username=inp["username"],password=inp["password"],host=inp["host"],port=inp["port"],dbname=inp["dbname"],project_name=inp["project_name"])
        if inp['metadata_source']=='business_files':
            save_configs = gsip.save_configs(inp)
            return project_creation_status
        else:
            return project_creation_status

    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}

@app.route('/list_projects', methods=['GET', 'POST'])
def list_projects():
    try:
        projects=listprj.list_projects()
        return projects
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}

@app.route('/list_configs', methods=['GET'])
def list_configs():
    try:
        configs=list_business_files.list_configs()
        return configs
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}






@app.route('/project_info', methods=['GET', 'POST'])
def project_info():
    try:
        inp=json.loads(request.data)
        projects=listprj.project_info(inp["project_name"])
        return projects
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}

@app.route('/test_connection', methods=['GET', 'POST'])
def test_connection():
    try:
        inp=json.loads(request.data)
        if inp["database_type"] == "PostgreSQL":
            status=pgdbconnect.test_connection(username=inp["username"],password=inp["password"],host=inp["host"],port=inp["port"],dbname=inp["dbname"])
            return status
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


@app.route('/save_config', methods=['GET', 'POST'])
def create_config():
    try:
        inp=json.loads(request.data)
        print(inp["database_type"])
        if inp["database_type"] == "PostgreSQL":
            pgdbconnect.create_config(username=inp["username"],password=inp["password"],host=inp["host"],port=inp["port"],dbname=inp["dbname"],project_name=inp["project_name"])
        return {"Status":"Config file saved successfully"}
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}



@app.route('/list_inventory', methods=['GET', 'POST'])
def list_inventory():
    try:
        with open(f"projects.json", 'r') as json_file:
            projects = json.load(json_file)
        inp=json.loads(request.data)
        inf=projects.get(inp["project_name"])
        print(inp["project_name"])
        if inf["metadata_source"]=="source_db":
            con=pgdbconnect.pg_db_connect(inp["project_name"])
            cur = con.cursor()
            schema_list=gsip.get_schemas(cur)
            name=inp["project_name"]
            response={}
            response["name"]=name
            response["children"]=[]
            for schema in schema_list:
                response["children"].append({"name":schema,
                                             "children":[]})
            with open(f'src/backend_data/{inp["project_name"]}.json', 'w') as json_file:
                json.dump(response, json_file, indent=4)
            cur.close()
            con.close()
            return schema_list
        elif inf["metadata_source"]=="business_files":
            inventory=gms.get_inventory(inp["project_name"])
            name=inp["project_name"]
            response={}
            response["name"]=name
            response["children"]=[]
            for config in inventory:
                response["children"].append({"name":config,
                                             "children":[{"name": x} for x in inventory.get(config)]})
            with open(f'src/backend_data/{inp["project_name"]}.json', 'w') as json_file:
                json.dump(response, json_file, indent=4)

            return response
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


@app.route('/list_schemas', methods=['GET', 'POST'])
def get_source_schema_list():
    try:
        with open(f"projects.json", 'r') as json_file:
            projects = json.load(json_file)
        inp=json.loads(request.data)
        inf=projects.get(inp["project_name"])
        print(inp["project_name"])
        if inf["metadata_source"]=="source_db":
            con=pgdbconnect.pg_db_connect(inp["project_name"])
            cur = con.cursor()
            schema_list=gsip.get_schemas(cur)
            name=inp["project_name"]
            response={}
            response["name"]=name
            response["children"]=[]
            for schema in schema_list:
                response["children"].append({"name":schema,
                                             "children":[]})
            with open(f'src/backend_data/{inp["project_name"]}.json', 'w') as json_file:
                json.dump(response, json_file, indent=4)
            cur.close()
            con.close()
            return schema_list
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


@app.route('/prepare_metadata', methods=['GET', 'POST'])
def prepare_metadata():
    try:
        inp=json.loads(request.data)
        status=gms.get_metadata(inp["project_name"])
        return status
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


@app.route('/metadata_to_ddl', methods=['GET', 'POST'])
def metadata_to_ddl():
    try:
        inp=json.loads(request.data)
        status=mtd.metadata_to_ddl(inp["project_name"])
        return status
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}



if __name__ == "__main__":
    app.run(debug=True)
