import re
import os

filepath = r'c:\Users\david\Desktop\Projects-Antigravity\Tu Maestro\web\src\components\ActividadesClient.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Match href and also the title to be helpful
pattern = r"title: ([^,]+),[\s\S]*?href: '/actividades/([^']+)'"
matches = re.findall(pattern, content)

base_path = r'c:\Users\david\Desktop\Projects-Antigravity\Tu Maestro\web\src\app\actividades'
missing = []
found_count = 0

for title_expr, slug in matches:
    found_count += 1
    full_path = os.path.join(base_path, slug)
    if not os.path.exists(full_path):
        missing.append((title_expr.strip(), slug))

print(f"Total activities links found: {found_count}")
print("\nMissing activities (No directory in src/app/actividades):")
for title, slug in missing:
    print(f"- {slug} ({title})")
