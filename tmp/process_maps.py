import requests
import json

urls = {
    "Belize": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/BLZ.geojson",
    "Costa Rica": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/CRI.geojson",
    "El Salvador": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/SLV.geojson",
    "Guatemala": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/GTM.geojson",
    "Honduras": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/HND.geojson",
    "Nicaragua": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/NIC.geojson",
    "Panama": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/PAN.geojson",
    "Mexico": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/MEX.geojson",
    "Colombia": "https://raw.githubusercontent.com/LonnyGomes/CountryGeoJSONCollection/master/geojson/COL.geojson"
}

# Values deduced to match current SVG coordinate system
scale = 1.8
offset_x = 91.2
offset_y = 140

def project(lon, lat):
    x = (lon + 180) * scale + offset_x
    y = (90 - lat) * scale + offset_y
    return f"{x:.3f},{y:.3f}"

def geojson_to_svg_path(geometry):
    paths = []
    if geometry['type'] == 'Polygon':
        for ring in geometry['coordinates']:
            path = "M" + "L".join([project(p[0], p[1]) for p in ring]) + "Z"
            paths.append(path)
    elif geometry['type'] == 'MultiPolygon':
        for poly in geometry['coordinates']:
            for ring in poly:
                path = "M" + "L".join([project(p[0], p[1]) for p in ring]) + "Z"
                paths.append(path)
    return "".join(paths)

results = {}
for name, url in urls.items():
    print(f"Processing {name}...")
    try:
        r = requests.get(url)
        data = r.json()
        results[name] = geojson_to_svg_path(data['geometry'])
    except Exception as e:
        print(f"Error processing {name}: {e}")

# Separate into main paths and background paths
main_countries = ["Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panama"]
bg_countries = ["Mexico", "Colombia"]

main_paths = {k: results[k] for k in main_countries if k in results}
bg_paths = {k: results[k] for k in bg_countries if k in results}

# Write output files
with open('central_america_paths_new.ts', 'w', encoding='utf-8') as f:
    f.write("export const CENTRAL_AMERICA_PATHS: Record<string, string> = " + json.dumps(main_paths, indent=4, ensure_ascii=False) + ";\n")

with open('central_america_bg_paths_new.ts', 'w', encoding='utf-8') as f:
    f.write("export const CENTRAL_AMERICA_BG_PATHS: Record<string, string> = " + json.dumps(bg_paths, indent=4, ensure_ascii=False) + ";\n")

print("Finished!")
