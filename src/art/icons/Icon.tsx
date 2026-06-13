import { iconPaths, type IconDef, type IconName } from './paths';

export type { IconName };

interface IconProps {
  name: IconName;
  /** Pixel size of the square icon. Defaults to 1em so it scales with text. */
  size?: number | string;
  className?: string;
  /** Stroke width for outline icons. */
  strokeWidth?: number;
  title?: string;
}

export function Icon({ name, size = '1em', className, strokeWidth = 2, title }: IconProps) {
  const def: IconDef = iconPaths[name];
  const ds = Array.isArray(def.d) ? def.d : [def.d];
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className,
    role: title ? 'img' : 'presentation',
    'aria-hidden': title ? undefined : true,
    focusable: false as const,
  };

  if (def.mode === 'stroke') {
    return (
      <svg
        {...common}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {title ? <title>{title}</title> : null}
        {ds.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor" fillRule={def.evenodd ? 'evenodd' : 'nonzero'}>
      {title ? <title>{title}</title> : null}
      {ds.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
