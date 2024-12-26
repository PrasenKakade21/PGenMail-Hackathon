import { useState } from 'react';

const ScrollableTags = () => {
  const [tags] = useState([
    'Sports', 'Finance', 'Technology',
    'Health&Fitness', 'Food', 'Gaming',
    'Gardening', 'Travel', 'Photography',
    'History Facts', 'Music', 'Books',
    'World Affairs', 'Economics', 'Tax'
  ]);

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div id="TopicBox" className="flex justify-center border-black rounded-lg items-center">
      <div 
        id="box" 
        className="w-60 h-16 rounded-lg overflow-y-auto py-2 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <div className="grid grid-cols-3 gap-2 px-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2 py-1 rounded text-xs truncate transition-colors duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollableTags;