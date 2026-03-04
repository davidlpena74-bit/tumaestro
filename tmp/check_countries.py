import json

with open('ne_10m_admin_0_countries.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)

for feature in data['features']:
    props = feature['properties']
    if props.get('NAME') == 'Spain': # Check Spain as reference for Spanish name
        print(props.keys())
        break
