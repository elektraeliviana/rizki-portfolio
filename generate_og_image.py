import os
import urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance, ImageFilter, ImageChops

base_dir = os.path.dirname(os.path.abspath(__file__))
assets_dir = os.path.join(base_dir, "assets")
os.makedirs(assets_dir, exist_ok=True)

ink_path = os.path.join(assets_dir, "ink.jpg")
jb_mono_path = os.path.join(assets_dir, "JetBrainsMono.ttf")
inter_path = os.path.join(assets_dir, "Inter.ttf")
out_path = os.path.join(assets_dir, "og-image.png")

if not os.path.exists(jb_mono_path):
    print("Downloading JetBrainsMono...")
    urllib.request.urlretrieve("https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf", jb_mono_path)

if not os.path.exists(inter_path):
    print("Downloading Inter...")
    urllib.request.urlretrieve("https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf", inter_path)

WIDTH, HEIGHT = 1200, 630
base = Image.new("RGBA", (WIDTH, HEIGHT), (18, 19, 22, 255))  # #121316

# 1. Subtle Architectural Grid (96px spacing like in styles.css)
grid_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
grid_draw = ImageDraw.Draw(grid_layer)
grid_size = 80
for x in range(0, WIDTH, grid_size):
    grid_draw.line([(x, 0), (x, HEIGHT)], fill=(255, 255, 255, 14), width=1)
for y in range(0, HEIGHT, grid_size):
    grid_draw.line([(0, y), (WIDTH, y)], fill=(255, 255, 255, 14), width=1)

# Inset technical frame (24px margin)
grid_draw.rectangle([24, 24, WIDTH - 24, HEIGHT - 24], outline=(255, 255, 255, 30), width=1)

# Corner ticks
corner_len = 16
for (cx, cy, dx, dy) in [
    (24, 24, 1, 1),
    (WIDTH - 24, 24, -1, 1),
    (24, HEIGHT - 24, 1, -1),
    (WIDTH - 24, HEIGHT - 24, -1, -1)
]:
    grid_draw.line([(cx, cy), (cx + dx * corner_len, cy)], fill=(255, 255, 255, 100), width=2)
    grid_draw.line([(cx, cy), (cx, cy + dy * corner_len)], fill=(255, 255, 255, 100), width=2)

base = Image.alpha_composite(base, grid_layer)

# 2. Ink Wash Artwork on the Right Side
if os.path.exists(ink_path):
    print("Found ink path:", ink_path)
    ink_raw = Image.open(ink_path).convert("L")
    
    # Invert: white paper becomes dark, dark ink strokes become bright luminous strokes
    ink_inv = ImageOps.invert(ink_raw)
    
    # Enhance contrast and brightness of the ink strokes
    contrast_enhancer = ImageEnhance.Contrast(ink_inv)
    ink_inv = contrast_enhancer.enhance(1.7)
    
    # Scale to cover full height on right side
    target_h = 640
    w_scale = target_h / ink_inv.height
    target_w = int(ink_inv.width * w_scale)
    ink_resized = ink_inv.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Create smooth multi-directional fade mask (left edge, top edge, bottom edge)
    fade_mask = Image.new("L", (target_w, target_h), 255)
    for fx in range(target_w):
        progress_x = fx / target_w
        # Left fade
        if progress_x < 0.15:
            alpha_x = 0.0
        elif progress_x < 0.55:
            alpha_x = ((progress_x - 0.15) / 0.40) ** 1.6
        else:
            alpha_x = 1.0
            
        for fy in range(target_h):
            # Top & bottom subtle edge fade
            alpha_y = 1.0
            if fy < 40:
                alpha_y = fy / 40.0
            elif fy > target_h - 40:
                alpha_y = (target_h - fy) / 40.0
                
            val = alpha_x * alpha_y * 0.72 # Max opacity 72% for tasteful atmospheric depth
            fade_mask.putpixel((fx, fy), int(val * 255))
            
    # Combine ink brightness with the fade mask
    stroke_alpha = ImageChops.multiply(ink_resized, fade_mask)
    
    # Tint the ink stroke into misty silver-slate (#CFD4E0)
    ink_tint = Image.new("RGBA", (target_w, target_h), (205, 210, 222, 255))
    ink_transparent = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    ink_layer = Image.composite(ink_tint, ink_transparent, stroke_alpha)
    
    pos_x = WIDTH - target_w + 30
    pos_y = -5
    base.alpha_composite(ink_layer, (pos_x, pos_y))
else:
    print("Ink path not found!")

# 3. Typography & Badges
draw = ImageDraw.Draw(base)

font_tag = ImageFont.truetype(jb_mono_path, 13)
font_eyebrow = ImageFont.truetype(jb_mono_path, 13)
font_title = ImageFont.truetype(inter_path, 60)
font_sub = ImageFont.truetype(inter_path, 20)
font_bottom = ImageFont.truetype(jb_mono_path, 11)

# Status Pill Badge: [SYS.ARCH] · Open for high-stakes narrative sprints
badge_text = "[SYS.ARCH]  ·  Open for high-stakes narrative sprints"
pill_x, pill_y = 64, 58
pill_padding_x, pill_padding_y = 16, 7
bbox = font_tag.getbbox(badge_text)
pill_w = (bbox[2] - bbox[0]) + pill_padding_x * 2 + 18
pill_h = (bbox[3] - bbox[1]) + pill_padding_y * 2 + 2

draw.rounded_rectangle(
    [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
    radius=pill_h // 2,
    fill=(24, 26, 32, 230),
    outline=(255, 255, 255, 45),
    width=1
)
# Glowing green dot
dot_cx, dot_cy = pill_x + 16, pill_y + pill_h // 2
draw.ellipse([dot_cx - 4, dot_cy - 4, dot_cx + 4, dot_cy + 4], fill=(61, 192, 120, 255))
draw.text((pill_x + 30, pill_y + pill_padding_y), badge_text, font=font_tag, fill=(168, 172, 184, 255))

# Eyebrow
eyebrow_text = "SYSTEMS NARRATIVE ARCHITECT · RESEARCH & STRATEGY"
draw.text((64, 132), eyebrow_text, font=font_eyebrow, fill=(142, 142, 152, 255))

# Main Title: RIZKY MAULANA
title_text = "RIZKY MAULANA"
draw.text((64, 168), title_text, font=font_title, fill=(247, 246, 241, 255))

# Thin accent line under title
draw.line([(64, 252), (180, 252)], fill=(247, 246, 241, 200), width=2)
draw.line([(180, 252), (640, 252)], fill=(255, 255, 255, 30), width=1)

# Subtext
sub_line1 = "Bridging epistemic rigor, sociological depth, and"
sub_line2 = "behavioral systems to architect unassailable brand narratives."
draw.text((64, 276), sub_line1, font=font_sub, fill=(205, 207, 215, 255))
draw.text((64, 308), sub_line2, font=font_sub, fill=(205, 207, 215, 255))

# Four Pillar Boxes / Indicators
pillars = [
    ("P.01", "Epistemic Rigor & Analytical Thinking"),
    ("P.02", "Sociological & Contextual Decoding"),
    ("P.03", "Steelmanning Dialectics"),
    ("P.04", "Gen-Z & Millennial Dynamics")
]
font_p_idx = ImageFont.truetype(jb_mono_path, 11)
font_p_name = ImageFont.truetype(inter_path, 13)

start_py = 376
box_w = 270
box_h = 56
gap_x = 14
gap_y = 12

for i, (pidx, pname) in enumerate(pillars):
    col = i % 2
    row = i // 2
    bx = 64 + col * (box_w + gap_x)
    by = start_py + row * (box_h + gap_y)
    
    draw.rectangle([bx, by, bx + box_w, by + box_h], fill=(22, 24, 28, 220), outline=(255, 255, 255, 30), width=1)
    draw.text((bx + 12, by + 9), pidx, font=font_p_idx, fill=(142, 142, 152, 255))
    draw.text((bx + 12, by + 27), pname, font=font_p_name, fill=(235, 235, 240, 255))

# Bottom bar metadata
draw.line([(64, HEIGHT - 76), (WIDTH - 64, HEIGHT - 76)], fill=(255, 255, 255, 20), width=1)
draw.text((64, HEIGHT - 56), "PORTFOLIO · VER. 2026.1", font=font_bottom, fill=(120, 122, 130, 255))
draw.text((360, HEIGHT - 56), "CANVAS: EAST ASIAN INK & TECHNICAL CODE", font=font_bottom, fill=(120, 122, 130, 255))
url_text = "rizki-portfolio-seven.vercel.app"
url_bbox = font_bottom.getbbox(url_text)
draw.text((WIDTH - 64 - (url_bbox[2] - url_bbox[0]), HEIGHT - 56), url_text, font=font_bottom, fill=(210, 212, 220, 255))

# Save PNG
base.convert("RGB").save(out_path, format="PNG", quality=95)
print("Saved og-image.png successfully! Size:", os.path.getsize(out_path))

# Copy to artifact folder for inspection
artifact_dst = r"C:\Users\ASUS PC\.gemini\antigravity\brain\058388c0-6a1d-4ac2-9a75-805d297ebe18\og-image.png"
import shutil
shutil.copyfile(out_path, artifact_dst)
print("Copied to artifact dir:", artifact_dst)
