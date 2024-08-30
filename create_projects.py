import json
import os

from datetime import datetime
import get_source_info_postgres as gsip

def create_project(project_name,description,source,target,created_by,list_of_configs,metadata_source,source_database_type):
    try:
        with open(f'projects.json', 'r') as json_file:
            projects = json.load(json_file)
        projects[project_name]={}
        projects[project_name]["description"]=description
        projects[project_name]["source_database_type"]=source_database_type
        projects[project_name]["source"] = source
        projects[project_name]["target"] = target
        projects[project_name]["created_by"] = created_by
        projects[project_name]["created_date"] = str(datetime.now())
        projects[project_name]["list_of_configs"] = list_of_configs
        projects[project_name]["metadata_source"] = metadata_source
        if not os.path.exists(project_name):
            os.mkdir(project_name)

        with open(f"projects.json", "w") as outfile:
            json.dump(projects, outfile, indent=4)
        return {"status":"Project Saved Successfully"}
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": f"{e}"}
