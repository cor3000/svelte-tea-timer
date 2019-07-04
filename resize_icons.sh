#!/bin/bash
for SIZE in 512 192 144 96 72 48;do convert $1 -resize $SIZE ${1%.*}_$SIZE.${1##*.}; done

#        { "src": "/img/teatime_5_512.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" },
#        { "src": "/img/teatime_5_192.png", "type": "image/png", "sizes": "192x192", "purpose": "maskable" },
#        { "src": "/img/teatime_5_144.png", "type": "image/png", "sizes": "144x144", "purpose": "maskable" },
#        { "src": "/img/teatime_5_96.png" , "type": "image/png", "sizes": "96x96", "purpose": "maskable" },
#        { "src": "/img/teatime_5_72.png" , "type": "image/png", "sizes": "72x72", "purpose": "maskable" },
#        { "src": "/img/teatime_5_48.png" , "type": "image/png", "sizes": "48x48", "purpose": "maskable" },
#        { "src": "/img/teatime_4_512.png", "type": "image/png", "sizes": "512x512", "purpose": "any" },
#        { "src": "/img/teatime_4_192.png", "type": "image/png", "sizes": "192x192", "purpose": "any" },
#        { "src": "/img/teatime_4_144.png", "type": "image/png", "sizes": "144x144", "purpose": "any" },
#        { "src": "/img/teatime_4_96.png" , "type": "image/png", "sizes": "96x96", "purpose": "any" },
#        { "src": "/img/teatime_4_72.png" , "type": "image/png", "sizes": "72x72", "purpose": "any" },
#        { "src": "/img/teatime_4_48.png" , "type": "image/png", "sizes": "48x48", "purpose": "any" }

