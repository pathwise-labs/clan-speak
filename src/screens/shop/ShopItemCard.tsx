import { Card } from '@/components';
import { Icon, type IconName } from '@/art/icons/Icon';
import type { ShopItem } from '@/types';
import { cx } from '@/utils/classNames';

interface ShopItemCardProps {
  item: ShopItem;
  affordable: boolean;
  ownedLabel?: string;
  active?: boolean;
  onBuy: () => void;
}

export function ShopItemCard({ item, affordable, ownedLabel, active, onBuy }: ShopItemCardProps) {
  return (
    <Card className="shop-item">
      <span className="shop-item__icon" style={{ ['--s-tint' as string]: item.tint }}>
        <Icon name={item.icon as IconName} size={26} />
      </span>
      <div className="shop-item__text">
        <span className="shop-item__name">
          {item.name}
          {ownedLabel && <span className="shop-item__owned">{ownedLabel}</span>}
        </span>
        <span className="shop-item__desc">{item.desc}</span>
      </div>
      <button
        type="button"
        className={cx('shop-item__buy', !affordable && !active && 'shop-item__buy--disabled', active && 'shop-item__buy--active')}
        onClick={active ? undefined : onBuy}
        disabled={active || !affordable}
      >
        {active ? (
          'Active'
        ) : (
          <>
            <Icon name="gem" size={15} />
            {item.price}
          </>
        )}
      </button>
    </Card>
  );
}
