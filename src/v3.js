//murmurhash3
let n = (e) => new TextEncoder().encode(e);
export default function v3(e, t) {
  let r, i, a, o, s, l;
  "string" == typeof e && (e = n(e)),
    (r = 3 & e.length),
    (i = e.length - r),
    (a = t);
  for (l = 0; l < i; )
    (s =
      (255 & e[l]) |
      ((255 & e[++l]) << 8) |
      ((255 & e[++l]) << 16) |
      ((255 & e[++l]) << 24)),
      ++l,
      (a ^= s =
        ((65535 &
          (s =
            ((s =
              ((65535 & s) * 3432918353 +
                ((((s >>> 16) * 3432918353) & 65535) << 16)) &
              4294967295) <<
              15) |
            (s >>> 17))) *
          461845907 +
          ((((s >>> 16) * 461845907) & 65535) << 16)) &
        4294967295),
      (a =
        (65535 &
          (o =
            ((65535 & (a = (a << 13) | (a >>> 19))) * 5 +
              ((((a >>> 16) * 5) & 65535) << 16)) &
            4294967295)) +
        27492 +
        ((((o >>> 16) + 58964) & 65535) << 16));
  switch (((s = 0), r)) {
    case 3:
      s ^= (255 & e[l + 2]) << 16;
    case 2:
      s ^= (255 & e[l + 1]) << 8;
    case 1:
      (s ^= 255 & e[l]),
        (a ^= s =
          ((65535 &
            (s =
              ((s =
                ((65535 & s) * 3432918353 +
                  ((((s >>> 16) * 3432918353) & 65535) << 16)) &
                4294967295) <<
                15) |
              (s >>> 17))) *
            461845907 +
            ((((s >>> 16) * 461845907) & 65535) << 16)) &
          4294967295);
  }
  return (
    (a ^= e.length),
    (a ^= a >>> 16),
    (a =
      ((65535 & a) * 2246822507 + ((((a >>> 16) * 2246822507) & 65535) << 16)) &
      4294967295),
    (a ^= a >>> 13),
    (a =
      ((65535 & a) * 3266489909 + ((((a >>> 16) * 3266489909) & 65535) << 16)) &
      4294967295),
    (a ^= a >>> 16) >>> 0
  );
}
