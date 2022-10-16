from subprocess import check_output

GRAPH_FILENAME = "graph.json"
LIST_FILENAME = "list.json"
INFO_FILENAME = "info.json"

def get_connected_devices():
    devices = check_output(["arp", "-a"])
    devices = devices.splitlines()
    devices = [d.split()[0:2] for d in devices]
    return devices

def main():
    print(get_connected_devices())

if __name__ == "__main__":
    main()
