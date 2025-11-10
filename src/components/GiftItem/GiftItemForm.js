import React, { useState, useEffect } from 'react';

const GiftItemForm = ({ gift, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    allowMultipleReservations: false
  });

  useEffect(() => {
    if (gift) {
      setFormData({
        title: gift.title || '',
        description: gift.description || '',
        price: gift.price || 0,
        allowMultipleReservations: gift.allowMultipleReservations || false
      });
    }
  }, [gift]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    if (!gift) {
      setFormData({ title: '', description: '', price: 0, allowMultipleReservations: false });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'price' ? (parseFloat(value) || 0) : value 
    }));
  };

  return (
    <div className="gift-form">
      <h4>{gift ? 'Редактировать подарок' : 'Добавить новый подарок'}</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название подарка *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Например: Книга по программированию"
            required
          />
        </div>

        <div className="form-group">
          <label>Описание</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Опишите подарок подробнее..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Предполагаемая цена (руб.)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="0"
            min="0"
            step="100"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={formData.allowMultipleReservations}
              onChange={(e) => handleChange('allowMultipleReservations', e.target.checked)}
            />
            Разрешить нескольким людям дарить одинаковый подарок
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Отмена
          </button>
          <button type="submit" className="btn-primary">
            {gift ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GiftItemForm;