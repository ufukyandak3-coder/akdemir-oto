#!/bin/bash
# Akdemir Dev Server — Temiz Başlatma
# Kullanım: ./restart.sh

echo "🔴 Eski next process'ler durduruluyor..."
pkill -9 -f "next dev" 2>/dev/null
pkill -9 -f "next-server" 2>/dev/null
sleep 1

echo "🗑  Cache temizleniyor..."
rm -rf .next node_modules/.cache

echo "🚀 Dev server başlatılıyor (Turbopack)..."
source ~/.nvm/nvm.sh
npm run dev
