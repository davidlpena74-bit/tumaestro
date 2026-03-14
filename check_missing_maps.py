import re
import os

with open(r'c:\Users\david\Desktop\Projects-Antigravity\Tu Maestro\web\src\components\ActividadesClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

hrefs = re.findall(r"href: '/actividades/([^']+)'", content)
hrefs = sorted(list(set(hrefs)))

base_path = r'c:\Users\david\Desktop\Projects-Antigravity\Tu Maestro\web\src\app\actividades'
missing = []
for h in hrefs:
    # Some paths might be deeper like /actividades/valoraciones/... but the regex captures the first part
    # But usually it's /actividades/slug
    if h.startswith('rankings') or h.startswith('valoraciones'):
        continue
    full_path = os.path.join(base_path, h)
    if not os.path.exists(full_path):
        missing.append(h)

print("Hrefs found in ActividadesClient.tsx (" + str(len(hrefs)) + "):")
for h in hrefs:
    print(h)

print("\nMissing directories in web/src/app/actividades (" + str(len(missing)) + "):")
for m in missing:
    print(m)
