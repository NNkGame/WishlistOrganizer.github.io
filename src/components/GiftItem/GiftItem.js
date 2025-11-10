import React, { useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

const GiftItem = ({ gift, onUpdate, onDelete, isOwner = false }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(gift);
  const { user } = useTelegram();

  // Защита от отсутствия gift
  if (!gift) {
    return null;
  }

  const handleSave = () => {
    onUpdate(editData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditData(gift);
    setEditing(false);
  };

  const handleReserve = () => {
    if (!gift.isReserved || gift.allowMultipleReservations) {
      onUpdate({
        ...gift,
        isReserved: true,
        reservedBy: user?.id
      });
    }
  };

  const handleUnreserve = () => {
    onUpdate({
      ...gift,
      isReserved: false,
      reservedBy: null
    });
  };

  // Проверяем, забронировал ли текущий пользователь этот подарок
  const isReservedByCurrentUser = gift.isReserved && gift.reservedBy === user?.id;

  if (editing) {
    return (
      <div className="gift-item editing">
        <div className="form-group">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            placeholder="Название подарка"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            placeholder="Описание подарка"
            rows="2"
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({...editData, price: parseFloat(e.target.value) || 0})}
            placeholder="Цена"
            min="0"
            step="100"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={editData.allowMultipleReservations}
              onChange={(e) => setEditData({...editData, allowMultipleReservations: e.target.checked})}
            />
            Разрешить нескольким людям дарить одинаковый подарок
          </label>
        </div>
        
        <div className="gift-actions">
          <button type="button" className="btn-secondary" onClick={handleCancel}>
            Отмена
          </button>
          <button type="button" className="btn-primary" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`gift-item ${gift.isReserved ? 'reserved' : ''}`}>
      <div className="gift-info">
        <h5>{gift.title}</h5>
        {gift.description && (
          <p className="gift-description">{gift.description}</p>
        )}
        <div className="gift-meta">
          <span className="gift-price">
            💰 {gift.price > 0 ? `${gift.price} руб.` : 'Цена не указана'}
          </span>
          {gift.isReserved && (
            <span className="reserved-badge">
              🎁 {isReservedByCurrentUser ? 'Забронировано вами' : 'Забронирован'}
            </span>
          )}
          {gift.allowMultipleReservations && (
            <span className="multiple-badge">👥 Можно дарить несколько</span>
          )}
        </div>
      </div>
      
      <div className="gift-actions">
        {isOwner ? (
          <>
            <button 
              className="btn-icon"
              onClick={() => setEditing(true)}
              title="Редактировать"
            >
              ✏️
            </button>
            <button 
              className="btn-icon"
              onClick={onDelete}
              title="Удалить"
            >
              🗑️
            </button>
          </>
        ) : (
          <>
            {gift.isReserved ? (
              <button 
                className="btn-secondary"
                onClick={handleUnreserve}
                disabled={!isReservedByCurrentUser}
              >
                {isReservedByCurrentUser ? 'Отменить бронь' : 'Уже забронирован'}
              </button>
            ) : (
              <button 
                className="btn-primary"
                onClick={handleReserve}
              >
                Забронировать
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GiftItem;