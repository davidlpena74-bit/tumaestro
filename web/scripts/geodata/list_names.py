import json
with open('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/world-countries-50m.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    for feature in data['features']:
        name = feature['properties'].get('name', '')
        if 'Mexico' in name or 'Colombia' in name:
            print(name)
