#!/usr/bin/env sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
LIB_DIR="$ROOT_DIR/.cache/playwright-libs/usr/lib/x86_64-linux-gnu"
DEB_DIR="$ROOT_DIR/.cache/playwright-debs"

if [ "$(uname -s)" != "Linux" ]; then
  echo "Storybook browser libs helper is only needed on Linux."
  exit 0
fi

if [ -f "$LIB_DIR/libnspr4.so" ] && [ -f "$LIB_DIR/libnss3.so" ] && [ -f "$LIB_DIR/libnssutil3.so" ] && [ -f "$LIB_DIR/libasound.so.2" ]; then
  echo "Local Playwright browser libs already prepared in .cache/playwright-libs."
  exit 0
fi

if ! command -v apt >/dev/null 2>&1; then
  echo "apt is required to download local Linux libraries for Storybook browser tests."
  exit 1
fi

if ! command -v dpkg-deb >/dev/null 2>&1; then
  echo "dpkg-deb is required to extract local Linux libraries for Storybook browser tests."
  exit 1
fi

mkdir -p "$ROOT_DIR/.cache/playwright-libs" "$DEB_DIR"

cd "$DEB_DIR"
apt download libnspr4 libnss3 libasound2t64

for package_file in ./*.deb; do
  dpkg-deb -x "$package_file" "$ROOT_DIR/.cache/playwright-libs"
done

echo "Local Playwright browser libs prepared in .cache/playwright-libs."
