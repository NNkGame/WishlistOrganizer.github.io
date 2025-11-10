import React, { useState, useEffect } from 'react';

const WishlistForm = ({ wishlist, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: true
  });

  useEffect(() => {
    if (wishlist) {
      setFormData({
        title: wishlist.title,
        description: wishlist.description,
        isPublic: wishlist.isPublic
      });
    }
  }, [wishlist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    setFormData({ title: '', description: '', isPublic: true });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{wishlist ? 'Редактировать список' : 'Создать новый список'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название списка *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Например: День рождения 2024"
              required
            />
          </div>

          <div className="form-group">
            <label>Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Опишите, для кого этот список или особые пожелания..."
              rows="3"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => handleChange('isPublic', e.target.checked)}
              />
              Сделать список публичным (друзья смогут его просматривать)
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn-primary">
              {wishlist ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WishlistForm;