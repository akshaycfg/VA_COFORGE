import os



def list_configs():
    try:
        configs = os.listdir("config")
        print(configs)
        return configs
    except Exception as e:
        er_msg = f"Error in execution: {e}"
        print(er_msg)
        return {"status": er_msg}


