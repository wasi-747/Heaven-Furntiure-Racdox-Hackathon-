import os

pages = [
    'index.html',
    'living.html',
    'bedroom.html',
    'dining.html',
    'office.html',
    'heritage.html',
    'showroom.html'
]

toggle_button_html = '''        <button type="button" class="theme-toggle-btn" aria-label="Toggle Color Theme" title="Switch Theme (Dark/Light)">
          <span class="theme-icon">🌙</span>
          <span class="theme-label">Dark Atelier</span>
        </button>
'''

script_tags = '''  <script src="products_data.js"></script>
  <script src="product_modal.js"></script>
</body>'''

for page in pages:
    if not os.path.exists(page):
        continue
    with open(page, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Insert theme toggle button if not present
    if 'theme-toggle-btn' not in html:
        # insert right before <button type="button" class="btn btn-gold"
        if '<button type="button" class="btn btn-gold"' in html:
            html = html.replace('<button type="button" class="btn btn-gold"', toggle_button_html + '        <button type="button" class="btn btn-gold"', 1)
        elif '<div class="header-actions">' in html:
            html = html.replace('<div class="header-actions">', '<div class="header-actions">\n' + toggle_button_html, 1)

    # 2. Insert product_modal.js and products_data.js before </body>
    if 'product_modal.js' not in html:
        html = html.replace('</body>', script_tags, 1)

    with open(page, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {page} successfully!")

print("All pages successfully equipped with Dual Theme Toggle & Product Modal!")
