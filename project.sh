find . -type f \
  ! -path "*/node_modules/*" \
  ! -path "*/.next/*" \
  ! -path "*/.git/*" \
  ! -path "*/dist/*" \
  ! -path "*/.vercel/*" \
  -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.css" | \
while read -r file; do
  echo "========================================" >> codigo_completo.txt
  echo "ARQUIVO: $file" >> codigo_completo.txt
  echo "========================================" >> codigo_completo.txt
  cat "$file" >> codigo_completo.txt
  echo -e "\n\n" >> codigo_completo.txt
done
