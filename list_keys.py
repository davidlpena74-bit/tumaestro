import re

with open('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/north-america-paths.ts', 'r', encoding='utf-8') as f:
    content = f.read()

keys = re.findall(r'\"([^\"]+)\":', content)
print(keys)
