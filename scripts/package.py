#!/usr/bin/env python3
"""Build the complete portable skill, including its executable recipe."""
from pathlib import Path
import hashlib
import json
import subprocess
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills' / 'lift-content-production'


def main():
    subprocess.run([sys.executable, str(ROOT / 'scripts' / 'validate.py')], check=True)
    version = (ROOT / 'VERSION').read_text(encoding='utf-8').strip()
    files = sorted(p for p in SKILL.rglob('*') if p.is_file()
                   and not any(part.startswith('.') or part == '__pycache__'
                               for part in p.relative_to(SKILL).parts)
                   and p.suffix != '.pyc')
    if any(p.is_symlink() or not p.resolve().is_relative_to(SKILL.resolve()) for p in files):
        raise ValueError('The skill package cannot contain linked external files')
    destination = ROOT / 'dist' / f'lift-content-production-v{version}.zip'
    destination.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(destination, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for file in files:
            archive.write(file, file.relative_to(SKILL.parent).as_posix())
    with zipfile.ZipFile(destination) as archive:
        if archive.testzip() is not None or len(archive.namelist()) != len(files):
            raise ValueError('Invalid ZIP')
        for file in files:
            if archive.read(file.relative_to(SKILL.parent).as_posix()) != file.read_bytes():
                raise ValueError(f'Package differs from source: {file.name}')
    print(json.dumps({'file': destination.name, 'files': len(files),
                      'sha256': hashlib.sha256(destination.read_bytes()).hexdigest()}, indent=2))


if __name__ == '__main__':
    main()
