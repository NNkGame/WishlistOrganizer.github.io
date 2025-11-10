import React, { useState } from 'react';

// База данных идей для подарков (в реальном приложении можно расширить)
const GIFT_IDEAS = [
  {
    title: "Умная колонка",
    description: "Голосовой помощник для умного дома",
    price: 5000,
    category: "техника"
  },
  {
    title: "Книга по программированию",
    description: "Новейшее издание по современным технологиям",
    price: 1500,
    category: "книги"
  },
  {
    title: "Набор косметики",
    description: "Лучшие средства для ухода за кожей",
    price: 3000,
    category: "красота"
  },
  {
    title: "Настольная игра",
    description: "Увлекательная игра для компании друзей",
    price: 2000,
    category: "развлечения"
  },
  {
    title: "Сертификат в СПА",
    description: "Расслабляющий массаж и процедуры",
    price: 4000,
    category: "отдых"
  },
  {
    title: "Беспроводные наушники",
    description: "Качественный звук без проводов",
    price: 6000,
    category: "техника"
  },
  {
    title: "Кулинарный мастер-класс",
    description: "Обучение у профессионального шефа",
    price: 3500,
    category: "обучение"
  },
  {
    title: "Экологичная бутылка для воды",
    description: "Стильная и полезная для здоровья",
    price: 800,
    category: "аксессуары"
  }
];

const IdeaGenerator = () => {
  const [currentIdea, setCurrentIdea] = useState(null);
  const [usedIdeas, setUsedIdeas] = useState(new Set());

  const generateIdea = () => {
    const availableIdeas = GIFT_IDEAS.filter(idea => !usedIdeas.has(idea.title));
    
    if (availableIdeas.length === 0) {
      setUsedIdeas(new Set());
      setCurrentIdea(GIFT_IDEAS[Math.floor(Math.random() * GIFT_IDEAS.length)]);
      return;
    }

    const randomIdea = availableIdeas[Math.floor(Math.random() * availableIdeas.length)];
    setCurrentIdea(randomIdea);
    setUsedIdeas(prev => new Set([...prev, randomIdea.title]));
  };

  const handleUseIdea = () => {
    if (currentIdea) {
      // Здесь можно добавить логику для добавления идеи в список
      alert(`Идея "${currentIdea.title}" готова к добавлению в ваш список!`);
      generateIdea();
    }
  };

  return (
    <div className="idea-generator">
      <h2>🎲 Генератор идей для подарков</h2>
      <p>Нажмите на кнопку, чтобы получить случайную идею для подарка</p>
      
      <div className="generator-controls">
        <button className="btn-primary generate-btn" onClick={generateIdea}>
          Сгенерировать идею
        </button>
      </div>

      {currentIdea && (
        <div className="generated-idea">
          <div className="idea-card">
            <h3>{currentIdea.title}</h3>
            <p className="idea-description">{currentIdea.description}</p>
            <div className="idea-meta">
              <span className="idea-category">#{currentIdea.category}</span>
              <span className="idea-price">💰 {currentIdea.price} руб.</span>
            </div>
            
            <div className="idea-actions">
              <button className="btn-secondary" onClick={generateIdea}>
                Другая идея
              </button>
              <button className="btn-primary" onClick={handleUseIdea}>
                Использовать идею
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="idea-tips">
        <h4>💡 Советы по созданию списка желаний:</h4>
        <ul>
          <li>Добавляйте подарки разного ценового диапазона</li>
          <li>Указывайте конкретные модели или бренды</li>
          <li>Добавляйте ссылки на товары в интернет-магазинах</li>
          <li>Не забывайте про описания - они помогают с выбором</li>
        </ul>
      </div>
    </div>
  );
};

export default IdeaGenerator;