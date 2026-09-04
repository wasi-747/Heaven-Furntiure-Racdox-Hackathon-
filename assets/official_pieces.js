/* ==========================================================================
   Heaven Furniture Mart — single source of truth for all pieces.
   Every collection page, piece page, AR page and the order board read this.

   TWO FLAGS THAT MATTER:

   `hasModel` — true only where a .glb exists. Pieces without one are shown
   as photography and do NOT advertise AR, because claiming an AR badge on a
   piece that can't open AR is worse than not claiming it at all.

   `arVerified` — false everywhere at present. The GLB meshes are NOT
   normalised to the dimensions below (measured error 0.40x to 1.46x), so AR
   places furniture at the wrong real-world size. `dims` are the figures from
   the existing live site; they must be replaced with workshop measurements
   and the GLBs scaled to match. Until then every piece page shows a caveat.
   ========================================================================== */

export const CATEGORIES = [
  { slug: 'living-room', name: 'Living Room',      blurb: 'Carved sofa sets, bouclé sectionals and occasional seating.' },
  { slug: 'bedroom',     name: 'Bedroom',          blurb: 'Upholstered and panelled beds built to your mattress, not to a standard.' },
  { slug: 'dining',      name: 'Dining',           blurb: 'Marble-top tables, carved chairs and glass display showcases.' },
  { slug: 'office',      name: 'Office & Study',   blurb: 'Executive seating and study furniture built for long hours.' },
  { slug: 'bespoke',     name: 'Bespoke / Custom', blurb: 'Commissions drawn, carved and finished to your brief.' },
];

/* ==========================================================================
   FIXED DIMENSIONS

   A dimension can carry a fourth element describing how it may be specified.
   Without one it is a slider, which is the default and covers most of the
   catalogue. `{ fixed, note }` makes it a stated fact instead.

   THIS EXISTS BECAUSE THE SLIDERS WERE OFFERING SIZES NOBODY CAN BUILD. Every
   piece got three ±25% sliders regardless of what it is, so the configurator
   invited — and priced, and put in the order email — an 85cm-wide executive chair
   that will not fit under a desk, a 156cm-tall office chair taller than most
   adults, and a 58cm-high dining table. Measured: up to +৳16,000 for a chair the
   workshop cannot make.

   The clamp in js/pricing.js cannot catch these, because they are inside the
   published band. Only the data can say a dimension is not a variable.

   `note` is shown to the customer in place of the slider, so a locked row
   explains itself rather than looking like a missing control.
   ========================================================================== */

/** Seat height on a gas-lift chair is set by whoever sits in it. */
const FIXED_GASLIFT = { fixed: true, note: 'Adjusts on the gas lift' };
/** Moulded frames and bought-in five-star bases come in one size. */
const FIXED_FRAME = { fixed: true, note: 'Set by the frame and base' };
/** Every dining table in the catalogue is 78cm. That is not a coincidence. */
const FIXED_TABLE_H = { fixed: true, note: 'Standard dining height' };
/** A dining chair's height follows the table it sits under. */
const FIXED_CHAIR_H = { fixed: true, note: 'Set by the table it sits under' };
/** Bed frames are built to the customer's mattress, which the site cannot know.
    A slider here offered 143 / 148 / 153cm — no mattress is any of those. */
const FIXED_MATTRESS = { fixed: true, note: 'Built to your mattress — tell us the size' };

export const PIECES = [
  /* ---------------------------- LIVING ROOM ---------------------------- */
  {
    id: 'royal_blue_gold_luxury_sofa_pair',
    name: 'Royal Sofa Pair',
    cat: 'living-room',
    tagline: 'Hand-carved gilded frame, royal blue velvet, four colourways.',
    desc: 'A matched set in the classical Chattogram idiom: solid hardwood frames hand-carved and gilded in our own workshop, then upholstered in deep royal blue velvet with woven damask seat panels. Supplied as a pair with armchairs and a mirrored coffee table, or singly.',
    materials: ['Seasoned mahogany frame', 'Hand-carved and gilded detail', 'Cotton-backed velvet', 'Woven damask panels'],
    dims: [['Width', 220, 'cm'], ['Depth', 92, 'cm'], ['Height', 104, 'cm']],
    variants: ['Royal Blue', 'Emerald', 'Burgundy', 'Ivory'],
    lead: '6–8 weeks', hasModel: false, arVerified: false,
    price: { min: 120000, max: 180000 }, matGroup: 'upholstery',
    addons: ['cushions', 'piping'],
    alt: 'Royal blue and gold hand-carved luxury sofa pair with matching armchairs and gilded coffee table',
  },
  {
    id: 'minimalist_cream_modular_sectional_sofa',
    name: 'Modular Sectional',
    cat: 'living-room',
    tagline: 'Bouclé modules you can rearrange. Four colourways.',
    desc: 'Our contemporary line. Three independent modules plus a chaise, upholstered in a chunky cream bouclé over a plinth base. Rearrange the modules as your room changes — there is no fixed left or right hand.',
    materials: ['Kiln-dried pine plinth', 'Chunky bouclé upholstery', 'Pocket-sprung seat units', 'Removable covers'],
    dims: [['Width', 280, 'cm'], ['Depth', 160, 'cm'], ['Height', 78, 'cm']],
    variants: ['Cream', 'Oat', 'Charcoal', 'Clay'],
    lead: '5–7 weeks', hasModel: true, arVerified: false,
    price: { min: 85000, max: 130000 }, matGroup: 'upholstery',
    addons: ['cushions', 'module'],
    alt: 'Minimalist cream bouclé modular sectional sofa with right-hand chaise',
  },
  {
    id: 'classic_wooden_cream_cushion_sofa_set',
    name: 'Classic Sofa Set',
    cat: 'living-room',
    tagline: 'Exposed carved hardwood with cream damask cushions.',
    desc: 'A five-piece set — two sofas, an armchair, a fretwork coffee table and a brass side table. The exposed frame shows the joinery rather than hiding it: pegged mortise-and-tenon throughout, with a carved crest on every back rail.',
    materials: ['Solid teak frame', 'Pegged mortise-and-tenon joints', 'Cream woven damask', 'Fretwork panel table'],
    dims: [['Width', 210, 'cm'], ['Depth', 85, 'cm'], ['Height', 95, 'cm']],
    variants: [],
    lead: '6–8 weeks', hasModel: false, arVerified: false,
    price: { min: 150000, max: 220000 }, matGroup: 'hardwood',
    addons: ['cushions', 'piping'],
    alt: 'Classic carved wooden sofa set with cream damask cushions and fretwork coffee table',
  },

  /* ------------------------------ BEDROOM ------------------------------ */
  {
    id: 'luxury_wooden_bed_teal_velvet_headboard',
    name: 'Teal Velvet Bed',
    cat: 'bedroom',
    tagline: 'Carved posts, gilded crest, velvet headboard. Three velvets.',
    desc: 'A four-post bed with turned and carved finials, a gilded acanthus crest and a velvet headboard panel. Built to your mattress rather than to a standard size, so the frame fits exactly.',
    materials: ['Solid mahogany posts', 'Gilded carved crest', 'Cotton-backed velvet panel', 'Slatted base'],
    dims: [['Width', 193, 'cm', FIXED_MATTRESS], ['Length', 215, 'cm', FIXED_MATTRESS], ['Headboard height', 130, 'cm']],
    variants: ['Teal Velvet', 'Charcoal Velvet', 'Blush Velvet'],
    lead: '7–9 weeks', hasModel: false, arVerified: false,
    price: { min: 90000, max: 140000 }, matGroup: 'upholstery',
    addons: ['bedside', 'drawers'],
    alt: 'Carved wooden four-post bed with teal velvet headboard and gilded crest',
  },
  {
    id: 'majesty_glame_emerald_green_velvet_bed',
    name: 'Emerald Bed',
    cat: 'bedroom',
    tagline: 'Channel-tufted emerald velvet with a wood-capped crest.',
    desc: 'The Majesty Glame. A channel-tufted emerald velvet headboard capped in dark polished hardwood, with a diamond-quilted footboard that reads as a bench from the foot of the bed. Our most requested contemporary bed.',
    materials: ['Channel-tufted velvet', 'Polished hardwood cap', 'Diamond-quilted footboard', 'Sprung slat base'],
    dims: [['Width', 200, 'cm', FIXED_MATTRESS], ['Length', 220, 'cm', FIXED_MATTRESS], ['Headboard height', 140, 'cm']],
    variants: [],
    lead: '6–8 weeks', hasModel: true, arVerified: false,
    price: { min: 75000, max: 115000 }, matGroup: 'upholstery',
    addons: ['bedside', 'drawers'],
    alt: 'Emerald green channel-tufted velvet bed with dark wood trim and quilted footboard',
  },
  {
    id: 'royal_navy_gold_velvet_bed',
    name: 'Navy & Gold State Bed',
    cat: 'bedroom',
    tagline: 'Buttoned navy velvet, silvered carving, fluted posts.',
    desc: 'A state bed with fluted and reeded posts, ball finials and a deep-buttoned navy velvet headboard centred on a silvered and gilded carved cresting. The heaviest frame we build.',
    materials: ['Solid hardwood fluted posts', 'Silver and gold leaf carving', 'Deep-buttoned navy velvet', 'Reinforced slat base'],
    dims: [['Width', 200, 'cm', FIXED_MATTRESS], ['Length', 220, 'cm', FIXED_MATTRESS], ['Headboard height', 165, 'cm']],
    variants: [],
    lead: '9–11 weeks', hasModel: false, arVerified: false,
    price: { min: 140000, max: 210000 }, matGroup: 'upholstery',
    addons: ['bedside', 'drawers'],
    alt: 'Navy velvet and gold state bed with fluted posts and silvered carved cresting',
  },
  {
    id: 'white_wooden_panel_bed',
    name: 'Panelled Bed',
    cat: 'bedroom',
    tagline: 'Dark cherry frame, fretwork inserts, linen headboard panel.',
    desc: 'A quieter bed. A dark cherry-finished frame with carved fretwork inserts either side of a channel-stitched linen headboard panel, and a solid panelled footboard. Reads traditional without the gilding.',
    materials: ['Cherry-finished hardwood', 'Carved fretwork inserts', 'Channel-stitched linen', 'Panelled footboard'],
    dims: [['Width', 180, 'cm', FIXED_MATTRESS], ['Length', 210, 'cm', FIXED_MATTRESS], ['Headboard height', 120, 'cm']],
    variants: [],
    lead: '5–7 weeks', hasModel: false, arVerified: false,
    price: { min: 60000, max: 95000 }, matGroup: 'hardwood',
    addons: ['bedside', 'drawers'],
    alt: 'Dark cherry panelled bed with linen headboard and carved fretwork inserts',
  },

  /* ------------------------------- DINING ------------------------------ */
  {
    id: 'royal_gold_carved_dining_chair',
    name: 'Carved Dining Chair',
    cat: 'dining',
    tagline: 'Gilded frame, oval back, hand-embroidered floral panel.',
    desc: 'A Louis-form armchair with a gilded and fluted frame, oval padded back and a hand-embroidered floral panel. The brass nailhead trim is set by hand, one stud at a time. Two finishes.',
    materials: ['Carved beech frame', 'Water-gilded gold finish', 'Hand-embroidered panel', 'Brass nailhead trim'],
    dims: [['Width', 52, 'cm'], ['Depth', 58, 'cm'], ['Height', 112, 'cm', FIXED_CHAIR_H]],
    variants: ['Gold on Ivory', 'Ivory on Ivory'],
    lead: '4–6 weeks', hasModel: true, arVerified: false,
    price: { min: 18000, max: 28000 }, matGroup: 'hardwood',
    addons: ['seatpad'],
    alt: 'Royal gold hand-carved dining armchair with floral embroidered oval back',
  },
  {
    id: 'carved_wooden_glass_display_showcase',
    name: 'Carved Showcase',
    cat: 'dining',
    tagline: 'Burl panels, pierced crown, gilded rope mouldings.',
    desc: 'A four-door vitrine in figured walnut with burl-matched door panels, twisted rope mouldings picked out in gold, and a pierced carved crown pediment. Glass shelves throughout; interior lighting optional.',
    materials: ['Figured walnut', 'Burl-matched panels', 'Gilded rope moulding', 'Toughened glass shelves'],
    dims: [['Width', 120, 'cm'], ['Depth', 45, 'cm'], ['Height', 190, 'cm']],
    variants: [],
    lead: '8–10 weeks', hasModel: true, arVerified: false,
    price: { min: 110000, max: 165000 }, matGroup: 'hardwood',
    addons: ['led', 'mirror'],
    alt: 'Hand-carved walnut and glass display showcase with gilded pierced crown',
  },
  {
    id: 'luxury_cream_gold_glass_showcase',
    name: 'Cream Gold Showcase',
    cat: 'dining',
    tagline: 'Arched centre bay in cream with gold-picked carving.',
    desc: 'A three-bay vitrine with a curved arched centre section, finished in hand-rubbed cream with the carved ornament picked out in gold. The glass on the centre bay is formed to the curve of the frame, not cut flat.',
    materials: ['Poplar and beech carcass', 'Hand-rubbed cream finish', 'Gold-picked carving', 'Curved toughened glass'],
    dims: [['Width', 110, 'cm'], ['Depth', 42, 'cm'], ['Height', 185, 'cm']],
    variants: [],
    lead: '8–10 weeks', hasModel: true, arVerified: false,
    price: { min: 95000, max: 145000 }, matGroup: 'hardwood',
    addons: ['led', 'mirror'],
    alt: 'Cream and gold three-bay glass display showcase with arched centre section',
  },
  {
    id: 'luxury_marble_dining_table_leather_chairs',
    name: 'Marble Dining Set · Six',
    cat: 'dining',
    tagline: 'Cream marble top, carved cabriole legs, oxblood leather chairs.',
    desc: 'A six-seat set. A cream marble top with a shaped and moulded edge over hand-carved cabriole legs, with six chairs in oxblood leather, brass nailhead trimmed and pierced-carved across the crest rail.',
    materials: ['Cream marble top', 'Carved cabriole hardwood legs', 'Oxblood bonded leather', 'Brass nailhead trim'],
    dims: [['Width', 180, 'cm'], ['Depth', 95, 'cm'], ['Height', 78, 'cm', FIXED_TABLE_H]],
    variants: [],
    lead: '7–9 weeks', hasModel: false, arVerified: false,
    price: { min: 160000, max: 240000 }, matGroup: 'stone',
    addons: ['chairs2', 'pads'],
    alt: 'Cream marble-top dining table with six oxblood leather carved dining chairs',
  },
  {
    id: 'luxury_cream_marble_dining_table_set',
    name: 'Ivory Marble Dining Set · Eight',
    cat: 'dining',
    tagline: 'Ivory and gold, carved crestings, floral seat panels.',
    desc: 'An eight-seat set in hand-rubbed ivory with gold-picked carving. Each chair carries a carved floral cresting above a shaped back panel, with woven floral seat upholstery. The table apron is carved in relief on all four sides.',
    materials: ['Ivory hand-rubbed finish', 'Gold-picked carved cresting', 'Marble top', 'Woven floral upholstery'],
    dims: [['Width', 200, 'cm'], ['Depth', 100, 'cm'], ['Height', 78, 'cm', FIXED_TABLE_H]],
    variants: [],
    lead: '9–11 weeks', hasModel: false, arVerified: false,
    price: { min: 220000, max: 320000 }, matGroup: 'stone',
    addons: ['chairs2', 'pads'],
    alt: 'Ivory and gold marble-top dining table set with eight carved floral chairs',
  },
  {
    id: 'luxury_carved_dining_table_cream_chairs',
    name: 'Gilt Dining Set · Eight',
    cat: 'dining',
    tagline: 'Full gilt frames, onyx-figured top, oval tapestry backs.',
    desc: 'Our most ornate dining set. Fully water-gilded frames, an onyx-figured stone top and eight oval-back chairs upholstered in a woven floral tapestry with brass nailhead trim. Built for a formal room.',
    materials: ['Water-gilded hardwood', 'Onyx-figured stone top', 'Woven floral tapestry', 'Brass nailhead trim'],
    dims: [['Width', 210, 'cm'], ['Depth', 105, 'cm'], ['Height', 78, 'cm', FIXED_TABLE_H]],
    variants: [],
    lead: '10–12 weeks', hasModel: false, arVerified: false,
    price: { min: 280000, max: 420000 }, matGroup: 'stone',
    addons: ['chairs2', 'pads', 'lazy'],
    alt: 'Fully gilded carved dining table set with eight oval tapestry-back cream chairs',
  },

  /* --------------------------- OFFICE & STUDY -------------------------- */
  {
    id: 'executive_brown_leather_tufted_chair',
    name: 'Executive Chair · Brown',
    cat: 'office',
    tagline: 'Diamond-tufted brown leather on a polished chrome base.',
    desc: 'A high-back executive chair in diamond-tufted brown leather with padded chrome-framed arms, gas lift and a five-star polished base. Three leather colours.',
    materials: ['Full-grain brown leather', 'Diamond button tufting', 'Polished chrome frame', 'Class-4 gas lift'],
    dims: [['Width', 68, 'cm', FIXED_FRAME], ['Depth', 72, 'cm', FIXED_FRAME], ['Height', 118, 'cm', FIXED_GASLIFT]],
    variants: ['Brown', 'Black', 'Oxblood'],
    lead: '3–4 weeks', hasModel: true, arVerified: false,
    price: { min: 32000, max: 48000 }, matGroup: 'leather',
    addons: ['headrest', 'alubase'],
    alt: 'Executive diamond-tufted brown leather office chair on polished chrome base',
  },
  {
    id: 'executive_black_leather_tufted_chair',
    name: 'Executive Chair · Black',
    cat: 'office',
    tagline: 'Buttoned black leather, contrast tan stitch.',
    desc: 'The same chassis as our brown executive chair, in black leather with a contrasting tan saddle stitch along every seam. Deep buttoned back, chrome-framed arms, five-star base.',
    materials: ['Full-grain black leather', 'Contrast tan saddle stitch', 'Polished chrome frame', 'Class-4 gas lift'],
    dims: [['Width', 68, 'cm', FIXED_FRAME], ['Depth', 72, 'cm', FIXED_FRAME], ['Height', 118, 'cm', FIXED_GASLIFT]],
    variants: [],
    lead: '3–4 weeks', hasModel: true, arVerified: false,
    price: { min: 30000, max: 46000 }, matGroup: 'leather',
    addons: ['headrest', 'alubase'],
    alt: 'Executive buttoned black leather office chair with contrast tan stitching',
  },
  {
    id: 'executive_black_padded_wood_chair',
    name: 'Director Chair · Wood Arm',
    cat: 'office',
    tagline: 'Channelled black leather with solid rosewood arm caps.',
    desc: 'A director-height chair with a channel-stitched black leather back, contrast tan topstitch and solid rosewood arm caps over polished chrome supports. The most traditional of our office line.',
    materials: ['Channelled black leather', 'Solid rosewood arm caps', 'Polished chrome supports', 'Class-4 gas lift'],
    dims: [['Width', 70, 'cm', FIXED_FRAME], ['Depth', 74, 'cm', FIXED_FRAME], ['Height', 122, 'cm', FIXED_GASLIFT]],
    variants: [],
    lead: '4–5 weeks', hasModel: false, arVerified: false,
    price: { min: 35000, max: 52000 }, matGroup: 'leather',
    addons: ['headrest', 'alubase'],
    alt: 'Black channelled leather director chair with rosewood arm caps and chrome base',
  },
  {
    id: 'ergonomic_black_mesh_highback_chair',
    name: 'Mesh Highback Chair',
    cat: 'office',
    tagline: 'Breathable mesh, adjustable headrest and lumbar.',
    desc: 'Our one concession to pure ergonomics. A tensioned black mesh back with independently adjustable headrest, height-and-depth adjustable arms and a synchro-tilt mechanism. For clients who sit for ten hours.',
    materials: ['Tensioned polyester mesh', 'Adjustable headrest', 'Synchro-tilt mechanism', 'Polished aluminium base'],
    dims: [['Width', 65, 'cm', FIXED_FRAME], ['Depth', 68, 'cm', FIXED_FRAME], ['Height', 125, 'cm', FIXED_GASLIFT]],
    variants: [],
    lead: '2–3 weeks', hasModel: false, arVerified: false,
    price: { min: 22000, max: 34000 }, matGroup: 'mesh',
    /* NO ADD-ONS OF ITS OWN, deliberately. This piece used to carry `headrest`
       and `alubase` like the other three office chairs — but its own materials
       list already reads "Adjustable headrest" and "Polished aluminium base", and
       its tagline says "adjustable headrest and lumbar". So the configurator was
       charging ৳4,800 and ৳6,200 for two features the page sells as standard:
       ৳11,000 of upgrades on the catalogue's cheapest piece.
       tests/logic.test.js now fails if any add-on's label reappears in the copy
       of a piece offering it. */
    addons: [],
    /* `protection` is "Fabric & timber protection treatment" and this chair is
       tensioned polyester on a polished aluminium base — there is no fabric and no
       timber on it to treat. It is the one piece in the catalogue where a
       UNIVERSAL add-on genuinely does not apply. */
    omitAddons: ['protection'],
    alt: 'Ergonomic black mesh high-back office chair with adjustable headrest',
  },

  /* ------------------------------ BESPOKE ------------------------------ */
  {
    id: 'minimalist_black_gold_shoe_cabinet',
    name: 'Black & Brass Cabinet',
    cat: 'bespoke',
    tagline: 'Matte black with brass. Built to your opening.',
    desc: 'Our bespoke line in its simplest form: a matte black lacquer carcass with a thin brass top edge, brass bar pulls and open shelving to one side. Drawn to your wall, your ceiling height and your storage.',
    materials: ['Matte black lacquer on MDF core', 'Solid brass hardware', 'Brass top edge trim', 'Soft-close runners'],
    dims: [['Width', 100, 'cm'], ['Depth', 35, 'cm'], ['Height', 120, 'cm']],
    variants: [],
    lead: '5–7 weeks', hasModel: true, arVerified: false,
    price: { min: 42000, max: 65000 }, matGroup: 'lacquer',
    addons: ['shelf', 'softclose'],
    alt: 'Minimalist matte black cabinet with brass handles and open shelving',
  },
];

/* ==========================================================================
   PRICING — estimates in BDT, driven by specification.

   Every piece carries `price: { min, max }` transcribed from the workshop's own
   price table. That range is NOT uncertainty; it is the SPEC BAND:

     min        the piece exactly as listed (standard size, base materials)
     max        the same piece at the top material tier and larger dimensions
     below min  a piece made smaller than standard, floored at -15%
     above max  add-ons, which sit on top of the band because a mirrored back
                or interior lighting genuinely is extra work

   Measured across all 18, the band is remarkably uniform — max/min runs 1.45x
   to 1.58x, mean 1.52x — which is why one model calibrates the whole catalogue
   without per-piece tuning. scripts/check-price-table.py re-derives that.

   USD figures were supplied alongside and are deliberately NOT stored: the site
   is BDT-only, so a second currency would be a value nothing reads and nobody
   maintains.

   THE PRICE IS AN ESTIMATE, EVERYWHERE. Pieces are made to order and quoted per
   commission, so the site says "estimated" and the checkout says the workshop
   confirms the final figure. That is both the honest position and the client's
   own wording. The maths lives in js/pricing.js; this file holds only numbers.
   ========================================================================== */

export const PRICING = {
  currency: 'BDT',
  symbol: '\u09F3',            /* ৳ BENGALI RUPEE SIGN */

  /* Dimension sliders travel this far either side of standard: a real bespoke
     range without offering a sofa that cannot be built. */
  sizeRange: 0.25,

  /* Bespoke furniture does not scale with volume. Doubling every dimension is
     8x the volume but nowhere near 8x the price, because cost tracks the frame,
     the joinery hours and the covered surface, not the air inside. 0.6 makes a
     single dimension behave roughly linearly:
       +25% width alone   ->  +14% of the band
       +25% on all three  ->  +55%, which with a material upgrade reaches max
     Tune this one number and the whole catalogue moves together. */
  volumeExponent: 0.6,

  /* How much of the band each axis can claim. Material 0.75 means a top-tier
     material at standard size lands at 75% of the band — you have to go larger
     as well to reach the quoted maximum, which is what that figure represents. */
  sizeWeight: 1.1,
  materialWeight: 0.75,

  /* Smaller than standard gets cheaper, but not indefinitely: the joinery hours
     barely move. */
  floor: -0.15,

  /* Estimates ending in odd taka read as false precision. */
  roundTo: 500,
};

/** "৳1,20,000" — LAKH grouping, which is how money is written in Bangladesh.

    This was 'en-US' and produced ৳120,000. The client's own price table is
    written that way, which is what the earlier comment justified itself with —
    but a spreadsheet's formatting is not the market's, and nobody in Chattogram
    writes four lakh twenty thousand as 420,000. It is also the most repeated
    string on the site.

    'en-IN' rather than 'bn-BD': bn-BD renders Bengali numerals (৳৪,২০,০০০), which
    is a separate decision about the whole site's language, not a number-format
    fix. en-IN gives the correct lakh/crore grouping with Western digits. */
export const taka = (n) => PRICING.symbol + Math.round(n).toLocaleString('en-IN');

/* ---- Material ladders --------------------------------------------------
   Keyed by a piece's `matGroup`, which names the COST DRIVER rather than every
   material present: the Classic Sofa Set has damask cushions but its price
   moves with the exposed teak frame, so it is 'hardwood'.

   Three tiers each at 0 / 0.5 / 1 on the material axis. The first tier is the
   specification the listed minimum price buys, which is why it reads "As
   listed" — the configurator must open on it. */
export const MATERIAL_TIERS = {
  upholstery: [
    { name: 'Cotton-backed velvet', note: 'As listed', level: 0 },
    { name: 'Premium Italian velvet', note: 'Denser pile, better recovery', level: 0.5 },
    { name: 'Imported bouclé', note: 'Heaviest weight, longest wear', level: 1 },
  ],
  hardwood: [
    { name: 'Seasoned mahogany', note: 'As listed', level: 0 },
    { name: 'Figured walnut', note: 'Burl-matched panels', level: 0.5 },
    { name: 'Solid Burma teak', note: 'Densest grain, water resistant', level: 1 },
  ],
  leather: [
    { name: 'Bonded leather', note: 'As listed', level: 0 },
    { name: 'Full-grain leather', note: 'Ages rather than wears', level: 0.5 },
    { name: 'Aniline full-grain', note: 'Dyed through, no surface coat', level: 1 },
  ],
  stone: [
    { name: 'Cream marble', note: 'As listed', level: 0 },
    { name: 'Statuario marble', note: 'Whiter ground, grey veining', level: 0.5 },
    { name: 'Onyx-figured stone', note: 'Translucent, book-matched', level: 1 },
  ],
  mesh: [
    { name: 'Standard tensioned mesh', note: 'As listed', level: 0 },
    { name: 'Reinforced breathable mesh', note: 'Higher tension, less sag', level: 0.5 },
    { name: 'High-tensile Italian mesh', note: 'Holds tension for years', level: 1 },
  ],
  lacquer: [
    { name: 'Matte lacquer on MDF core', note: 'As listed', level: 0 },
    { name: 'Matte lacquer on ply core', note: 'Better screw retention', level: 0.5 },
    { name: 'Hand-rubbed lacquer on hardwood', note: 'Solid throughout', level: 1 },
  ],
};

/* ---- Add-ons ----------------------------------------------------------
   Each piece lists the keys that apply to it; UNIVERSAL_ADDONS are appended to
   every piece automatically.

   `pct` add-ons take a share of the configured unit price, which is the only
   sane way to price a warranty: a flat ৳6,000 is nothing on a ৳420,000 dining
   set and absurd on an ৳18,000 chair.

   `group` marks mutually exclusive options — the two delivery lines render as
   one choice, not two checkboxes a customer could both tick. `preset: true` is
   the one selected by default. */
export const ADDONS = {
  /* delivery — exactly one of these is always selected */
  delivery_ctg: { label: 'Delivery & installation — Chattogram city', amount: 0, group: 'delivery', preset: true },
  delivery_out: { label: 'Delivery & installation — outside Chattogram', amount: 4500, group: 'delivery' },
  /* universal extras */
  protection:   { label: 'Fabric & timber protection treatment', amount: 3500 },
  warranty:     { label: 'Extended 5-year structural warranty', pct: 0.05 },
  /* living room */
  cushions:     { label: 'Additional scatter cushions (pair)', amount: 2500 },
  piping:       { label: 'Contrast piping on all seams', amount: 3000 },
  module:       { label: 'One additional seat module', pct: 0.22 },
  /* bedroom */
  bedside:      { label: 'Matching bedside pair', amount: 16000 },
  drawers:      { label: 'Under-bed storage drawers', amount: 12000 },
  /* dining */
  seatpad:      { label: 'Removable seat pad in matching fabric', amount: 1800 },
  chairs2:      { label: 'Two additional chairs', pct: 0.18 },
  pads:         { label: 'Fitted felt table pads', amount: 4200 },
  lazy:         { label: 'Inset revolving centre (lazy susan)', amount: 9500 },
  /* showcases */
  led:          { label: 'Interior LED lighting, dimmable', amount: 7500 },
  mirror:       { label: 'Mirrored back panel', amount: 5500 },
  /* office */
  headrest:     { label: 'Adjustable headrest', amount: 4800 },
  alubase:      { label: 'Polished aluminium base upgrade', amount: 6200 },
  /* bespoke cabinet */
  shelf:        { label: 'Additional internal shelf', amount: 2200 },
  softclose:    { label: 'Soft-close on every door and drawer', amount: 3800 },
};

/** Appended to every piece's own `addons`, in this order. */
export const UNIVERSAL_ADDONS = ['delivery_ctg', 'delivery_out', 'protection', 'warranty'];

/* ---- Derived helpers ------------------------------------------------------ */
export const bySlug  = (id)   => PIECES.find((p) => p.id === id);
export const inCat   = (slug) => PIECES.filter((p) => p.cat === slug);
export const catName = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).name || slug;
export const withAR  = ()     => PIECES.filter((p) => p.hasModel);

/** Formats dims as "220 × 92 × 104 cm" */
export const dimLine = (p) => p.dims.map((d) => d[1]).join(' × ') + ' ' + p.dims[0][2];

/** Business contact — single place to change it. */
export const WHATSAPP = '8801960481983';
export const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/* ORDERS_WHATSAPP USED TO BE A SECOND, DIFFERENT LINE, so the workshop could tell at
   a glance whether a message needed a quote or an answer. The company brief gives one
   number, so it now aliases WHATSAPP rather than holding its own digits — a second
   real line can be restored by changing this one value, and every order path already
   flows through orderWaLink(). */
export const ORDERS_WHATSAPP = WHATSAPP;
export const orderWaLink = (text) =>
  `https://wa.me/${ORDERS_WHATSAPP}?text=${encodeURIComponent(text)}`;

/* ---- Web3Forms ---------------------------------------------------------
   The order endpoint. No backend: the checkout is a real <form> posting here,
   and Web3Forms emails the order to the address registered against this key.

   THE KEY IS PUBLIC BY DESIGN. It is not a secret like an API token — it only
   permits submitting to this one form, and Web3Forms requires it client-side
   (a server-side POST is rejected with "Use our API in client side"). It will be
   visible in the page source, which is how the product works. The consequence is
   that anyone could send junk submissions; the honeypot field and Web3Forms'
   own spam filtering are the mitigation, as with any contact form.

   Free tier is 250 submissions/month. At 90% and 100% Web3Forms warns, then
   REJECTS until the month resets — which is exactly what the WhatsApp fallback
   on the confirmation page exists for. */
export const WEB3FORMS_KEY = '8c3cd395-4c16-438f-805c-c50073ce2d3e';
export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/* Web3Forms uses the `email` field as the reply-to. Email is OPTIONAL at
   checkout — phone is the real contact channel here — so this stands in when a
   customer leaves it blank, rather than risking a rejected submission on an
   unverified requirement.

   DELIBERATELY NOT the public address below. This value is internal plumbing tied to
   the Web3Forms account and is never displayed; the destination inbox is configured
   in the Web3Forms dashboard, not here, so changing this string would not redirect a
   single order. Left exactly as the client asked. */
export const ORDERS_EMAIL_FALLBACK = 'orders@heavenfurnituremart.com';

/* The address customers are given, from the company brief. Shown on /contact/ and in
   the footer; unrelated to the Web3Forms reply-to above. */
export const PUBLIC_EMAIL = 'heavenfurnituremart@gmail.com';

/* Where the business can be found, so the address exists in ONE place instead of the
   thirteen it used to be typed into. */
export const ADDRESS = {
  street: 'Agrabad Access Road',
  city: 'Chattogram',
  country: 'Bangladesh',
};

/* Real, dated achievements, replacing the invented "hand-carved since 1998" and the
   "28 years" the homepage computed from it. Five verifiable milestones read stronger
   than one fabricated number, and js/home.js renders them from here so the strip can
   never drift from this list. */
export const MILESTONES = [
  ['2020', 'Founded by Abul Kalam Bhuiyan'],
  ['2021', 'Agrabad showroom opened'],
  ['2024', 'International Furniture Fair, Chattogram'],
  ['2025', 'Member, Chamber of Commerce'],
  ['2026', 'Nationwide BFIOA recognition'],
];

/* The Managing Director, in his own words — the brief's strongest social proof, and
   the first person the site has ever named. */
export const MD = {
  name: 'Abul Kalam Bhuiyan',
  role: 'Managing Director',
  quote: 'At Heaven Furniture Mart, we believe furniture is more than just function; '
    + 'it is a reflection of lifestyle, taste, and comfort. Every piece we create is '
    + 'designed to bring lasting elegance into the homes of our clients.',
};

/* Heaven's own channels. The site carried no social links at all before this. */
export const SOCIAL = [
  ['Facebook', 'https://facebook.com/HeavenFurnitureMart'],
  ['Instagram', 'https://instagram.com/heaven_furniture_ltd'],
  ['YouTube', 'https://youtube.com/@HeavenFurnitureMart'],
];
