#!/usr/bin/env python3
"""Validate the portable LIFT skill package without third-party dependencies."""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills/lift-content-production'
errors = []
version = (ROOT / 'VERSION').read_text(encoding='utf-8').strip()
source = (SKILL / 'SKILL.md').read_text(encoding='utf-8')
if not re.fullmatch(r'\d+\.\d+\.\d+', version):
    errors.append('VERSION must contain a semantic version')
front = re.match(r'\A---\n(.*?)\n---\n', source, re.S)
if front is None:
    errors.append('Missing skill frontmatter')
else:
    fields = dict(re.findall(r'^(name|description):\s*(.+)$', front.group(1), re.M))
    if fields.get('name') != SKILL.name or not fields.get('description', '').strip():
        errors.append('Skill name or description is invalid')
if f'Versión {version} ·' not in source:
    errors.append('Skill version differs from VERSION')
if f'## {version} ·' not in (ROOT / 'CHANGELOG.md').read_text(encoding='utf-8'):
    errors.append('Version has no changelog entry')
config = json.loads((ROOT / 'lift.local.example.json').read_text(encoding='utf-8'))
if not isinstance(config.get('identity_root'), str) or not config['identity_root'].strip():
    errors.append('Identity example needs a nonempty identity_root')
files = list(ROOT.glob('*.md')) + list(SKILL.rglob('*.md'))
for path in files:
    text = path.read_text(encoding='utf-8')
    rel = path.relative_to(ROOT)
    if text.count('```') % 2:
        errors.append(f'{rel}: unclosed code fence')
    if re.search(r'/Users/|/private/var/|[A-Za-z]:\\Users\\', text):
        errors.append(f'{rel}: machine-specific path')
    if '\ufffd' in text:
        errors.append(f'{rel}: invalid replacement character')
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', text):
        if target.startswith(('https://', 'http://', '#', 'mailto:')):
            continue
        target_path = (path.parent / target.split('#', 1)[0]).resolve()
        if not target_path.is_relative_to(ROOT) or not target_path.is_file():
            errors.append(f'{rel}: broken/nonportable reference {target}')
print(json.dumps({'version': version, 'markdown_files': len(files), 'errors': errors}, ensure_ascii=False, indent=2))
sys.exit(bool(errors))
