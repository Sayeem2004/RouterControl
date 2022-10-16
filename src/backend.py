import json
import time
from subprocess import check_output

GRAPH_FILENAME = "graph.json"
LIST_FILENAME = "list.json"
INFO_FILENAME = "info.json"

DATA_PATH = "/home/jemz/Desktop/RouterControl/data/"

GRAPH_PATH = DATA_PATH + GRAPH_FILENAME
LIST_PATH = DATA_PATH + LIST_FILENAME
INFO_PATH = DATA_PATH + INFO_FILENAME

STRONG_SIGNAL = -40
WEAK_SIGNAL = -70

LOOP_PERIOD = 0.5

def station_dump():
    return check_output(["sudo", "iw", "dev", "wlan1", "station", "dump"]).rstrip()

def dump_to_devices(dump):
    devices = dump.split(b"Station ")
    devices = filter(lambda a: a, devices)
    devices = list(devices)
    tmp = [d.splitlines() for d in devices]
    devices = dict()
    for device in tmp:
        res = dict()
        for d in device[1:]:
            l = d.split(b':')
            c = [w.strip() for w in l]
            res[c[0]] = c[1]
        devices[device[0]] = res
    return devices

def max_signal(devices):
    sig = -100000000 # sufficiently small such that all signal strengths higher
    for v in devices.values():
        new_sig = v[b'signal avg'].split()[0]
        sig = max(sig, int(new_sig))
        sig = int(sig) 
    return sig

# returns a number from 0 to 100 inclusive, 0 representing the min intensity 
# and 100 representing the maximum intensity 
def intensity_from_max_signal(sig): 
    interval = STRONG_SIGNAL - WEAK_SIGNAL
    above_weak = STRONG_SIGNAL - sig
    above_weak = min(interval, above_weak)
    above_weak = max(0, above_weak)
    intensity = 100 * above_weak // interval
    return intensity

# this function is not implemented due to hardware limitations
# intensity is from 0 to 100 and corrolates with a stronger signal
# thinking about the person always in an anulus of a certain width
# movement width is how thick that anulus is
# another way to think about this is movement_width being a sort of
# buffer region for a person to move in before txpower must be changed
def set_txpower(intensity, movement_width):
    pass

def loop():
    dump = station_dump()
    devices = dump_to_devices(dump)
    ms = max_signal(devices)
    
    movement_width = 0
    with open(INFO_PATH, 'w') as f:
        s = json.loads(f)
        movement_width = s['info']

    intensity = intensity_from_max_signal(ms)
    
    set_txpower(intensity, movement_width)

    graph_json = dict()
    graph_json['graph'] = intensity
    with open(GRAPH_PATH, 'w') as f:
        json.dump(graph_json, f)
    
    list_json = []
    for k, v in devices.items():
        d = dict()
        mac_addr = k.decode('utf-8')
        mac_addr = mac_addr.split()[0]
        d['MAC'] = mac_addr
        d['signal'] = v[b'signal avg'].decode('utf-8')
        list_json.append(d)
    with open(LIST_PATH, 'w') as f:
        json.dump(list_json, f)

def main():
    while True:
        loop()
        time.sleep(LOOP_PERIOD)

if __name__ == "__main__":
    main()
