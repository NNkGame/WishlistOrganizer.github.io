import React, { useState } from 'react';
import GiftItem from '../GiftItem/GiftItem';
import { useTelegram } from '../../hooks/useTelegram';

const PublicWishlistItem = ({ wishlist, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useTelegram();

  const handleUpdateGift = (giftId, updates) => {
    const updatedGifts = wishlist.gifts.map(g =>
      g.id === giftId ? { ...g, ...updates } : g
    );

    const updatedWishlist = {
      ...wishlist,
      gifts: updatedGifts,
      updatedAt: new Date(),
    };

    onUpdate(updatedWishlist);
  };

  // Проверяем, является ли текущий пользователь владельцем списка
  const isOwner = user && user.id === wishlist.ownerId;

  return (
    <div className="wishlist-item public">
      <div className="wishlist-header" onClick={() => setExpanded(!expanded)}>
        <div className="wishlist-info">
          <h4>{wishlist.title}</h4>
          {wishlist.description && (
            <p className="wishlist-description">{wishlist.description}</p>
          )}
          <div className="wishlist-meta">
            <span>Подарков: {wishlist.gifts?.length || 0}</span>
            <span>Создано: {new Date(wishlist.createdAt).toLocaleDateString()}</span>
            {isOwner && <span className="owner-badge">Ваш список</span>}
          </div>
        </div>
        
        <div className="wishlist-actions">
          <span className={`expand-arrow ${expanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {expanded && (
        <div className="wishlist-content">
          <div className="gifts-section">
            <h5>Идеи для подарков</h5>
            
            <div className="gifts-list">
              {wishlist.gifts?.map(gift => (
                <GiftItem
                  key={gift.id}
                  gift={gift}
                  onUpdate={(updates) => handleUpdateGift(gift.id, updates)}
                  onDelete={() => {}} // Удаление недоступно для чужих списков
                  isOwner={isOwner}
                />
              ))}
              
              {(wishlist.gifts?.length === 0 || !wishlist.gifts) && (
                <p className="empty-gifts">В этом списке пока нет подарков</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicWishlistItem;