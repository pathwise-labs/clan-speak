/** Tiny classnames helper: cx('a', cond && 'b', { c: isC }) -> "a b c". */
export function cx(
  ...parts: Array<string | false | null | undefined | Record<string, boolean>>
): string {
  const out: string[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (typeof part === 'string') {
      out.push(part);
    } else {
      for (const key in part) {
        if (part[key]) out.push(key);
      }
    }
  }
  return out.join(' ');
}
