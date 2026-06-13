import './shop.css';
import { Icon } from '@/art/icons/Icon';
import { HighlandCow } from '@/art/mascot/HighlandCow';
import { ShopItemCard } from './ShopItemCard';
import { shopItems } from '@/data/shopItems';
import { useGame } from '@/state/GameContext';

export function ShopScreen() {
  const { state, dispatch } = useGame();
  const { gems, streakFreezes, hearts, maxHearts, doubleXpActive } = state.stats;

  return (
    <div className="screen shop">
      <header className="shop__hero">
        <HighlandCow mood="wave" size={84} />
        <div className="shop__hero-text">
          <h1 className="screen__title">Bùth · Shop</h1>
          <span className="shop__balance">
            <Icon name="gem" size={18} /> {gems} gems
          </span>
        </div>
      </header>

      <div className="shop__list">
        {shopItems.map((item) => {
          let ownedLabel: string | undefined;
          let active = false;
          if (item.id === 'streak_freeze' && streakFreezes > 0) ownedLabel = `×${streakFreezes}`;
          if (item.id === 'heart_refill' && hearts === maxHearts) ownedLabel = 'Full';
          if (item.id === 'double_xp') active = doubleXpActive;

          const affordable = gems >= item.price && !(item.id === 'heart_refill' && hearts === maxHearts);

          return (
            <ShopItemCard
              key={item.id}
              item={item}
              affordable={affordable}
              ownedLabel={ownedLabel}
              active={active}
              onBuy={() => dispatch({ type: 'BUY_ITEM', payload: { itemId: item.id } })}
            />
          );
        })}
      </div>

      <p className="shop__note">All purchases are visual only — no real transactions.</p>
    </div>
  );
}
