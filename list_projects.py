import json


def list_projects():
    try:
        with open(f'projects.json', 'r') as json_file:
            projects = json.load(json_file)
        lst=[]
        for prj in projects:
            lst.append({"project_name":prj,"description":projects.get(prj)["description"],"source":projects.get(prj)["source"],"target":projects.get(prj)["target"],"created_by":projects.get(prj)["created_by"],"created_date":projects.get(prj)["created_date"],"metadata_source":projects.get(prj)["metadata_source"]})
        return lst
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


def project_info(project_name):
    try:
        with open(f'projects.json', 'r') as json_file:
            projects = json.load(json_file)
        lst=[]
        for prj in projects:
            if prj==project_name:
                lst.append({"project_name":prj,"description":projects.get(prj)["description"],"source":projects.get(prj)["source"],"target":projects.get(prj)["target"]})
        return lst
    except Exception as e:
        er_msg=f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}