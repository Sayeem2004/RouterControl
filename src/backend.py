from subprocess import check_output

GRAPH_FILENAME = "graph.json"
LIST_FILENAME = "list.json"
INFO_FILENAME = "info.json"

def station_dump():
    return check_output(["sudo", "iw", "dev", "wlan1", "station", "dump"])

def device_mac_addresses(dump):
    devices = dump.split("Station")
    return devices

def main():
    print(get_connected_devices())

if __name__ == "__main__":
    main()
