import { useState } from 'react';

interface StudyUpTabProps {
  onStartPractice: () => void;
}

interface Card {
  id: string;
  emoji: string;
  title: string;
  content: React.ReactNode;
}

export default function StudyUpTab({ onStartPractice }: StudyUpTabProps) {
  const [open, setOpen] = useState<string | null>('facts');

  const cards: Card[] = [
    {
      id: 'facts',
      emoji: '📅',
      title: 'Fast Facts',
      content: (
        <ul className="space-y-2 text-sm text-gray-700">
          <li><span className="font-semibold">Founded:</span> 1986</li>
          <li><span className="font-semibold">By:</span> Jerry Murrell and his five sons</li>
          <li><span className="font-semibold">Started in:</span> Arlington, Virginia</li>
          <li><span className="font-semibold">Now:</span> 1,700+ locations worldwide</li>
          <li><span className="font-semibold">Free toppings:</span> 15 — any combo, no extra charge</li>
          <li><span className="font-semibold">Lobby perk:</span> Free peanuts</li>
        </ul>
      ),
    },
    {
      id: 'different',
      emoji: '⭐',
      title: 'What Makes Them Different',
      content: (
        <ul className="space-y-2 text-sm text-gray-700">
          <li>🥩 <span className="font-semibold">Fresh, never frozen beef</span> — every patty, always</li>
          <li>🧊 <span className="font-semibold">No freezers</span> — only coolers. Everything is fresh daily</li>
          <li>🚫 <span className="font-semibold">No microwaves or heat lamps</span> — cooked to order, every time</li>
          <li>🍟 <span className="font-semibold">Hand-cut fries</span> made fresh every day, in peanut oil</li>
          <li>🥜 <span className="font-semibold">Free peanuts</span> in the lobby — it's a Five Guys signature</li>
          <li>🥬 <span className="font-semibold">15 free toppings</span> — total customization, no upcharge</li>
        </ul>
      ),
    },
    {
      id: 'menu',
      emoji: '🍔',
      title: 'The Menu',
      content: (
        <div className="text-sm text-gray-700 space-y-3">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Burgers</p>
            <p className="text-gray-600">Hamburger, Cheeseburger, Bacon Burger, Bacon Cheeseburger, Little versions of each</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Hot Dogs &amp; Sandwiches</p>
            <p className="text-gray-600">Hot Dog, Veggie Sandwich, Grilled Cheese, BLT</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Fries</p>
            <p className="text-gray-600">Five Guys Style or Cajun — hand-cut, fresh daily, cooked in peanut oil</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Drinks</p>
            <p className="text-gray-600">Milkshakes, sodas, water — no combos (they focus on quality, not bundles)</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Free Toppings</p>
            <p className="text-gray-600">Mayo, mustard, ketchup, relish, onions, lettuce, pickles, tomatoes, grilled onions, grilled mushrooms, jalapeños, green peppers, A1 sauce, BBQ sauce, hot sauce</p>
          </div>
        </div>
      ),
    },
    {
      id: 'role',
      emoji: '👕',
      title: 'Your Role as Team Member',
      content: (
        <ul className="space-y-2 text-sm text-gray-700">
          <li>🍳 Cooking burgers and fries to order, fresh every time</li>
          <li>🙋 Taking orders and working the register</li>
          <li>🥬 Prepping toppings and ingredients at the start of each shift</li>
          <li>🧹 Keeping the dining area, kitchen, and lobby clean</li>
          <li>😊 Greeting customers and making them feel welcome</li>
          <li>🤝 Working as part of a tight, fast-moving team</li>
          <li>📦 Restocking supplies and keeping stations organized</li>
        </ul>
      ),
    },
    {
      id: 'sayThis',
      emoji: '💬',
      title: 'Say This in the Interview',
      content: (
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="bg-gray-50 rounded-xl px-4 py-3">
            <span className="font-semibold text-gray-900 block mb-1">On why Five Guys:</span>
            "I really respect that Five Guys uses fresh, never frozen beef and doesn't take shortcuts — that kind of commitment to quality is something I want to be part of."
          </li>
          <li className="bg-gray-50 rounded-xl px-4 py-3">
            <span className="font-semibold text-gray-900 block mb-1">On teamwork:</span>
            "I've played competitive soccer for 8 years, so I understand how much one person affects the whole team. I'd bring that mindset here."
          </li>
          <li className="bg-gray-50 rounded-xl px-4 py-3">
            <span className="font-semibold text-gray-900 block mb-1">On no experience:</span>
            "I've never had a job before, but I've been responsible for my younger siblings and I've shown up to early morning practices for years — I know how to commit."
          </li>
          <li className="bg-gray-50 rounded-xl px-4 py-3">
            <span className="font-semibold text-gray-900 block mb-1">On feedback:</span>
            "I've had a lot of coaches over the years and I've learned to take feedback without getting defensive. It's the fastest way to improve."
          </li>
        </ul>
      ),
    },
    {
      id: 'culture',
      emoji: '🏆',
      title: 'Five Guys Culture',
      content: (
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ <span className="font-semibold">Quality-first:</span> No shortcuts, ever — that's the whole brand</li>
          <li>🤝 <span className="font-semibold">Team-first:</span> Everyone pulls their weight, everyone supports each other</li>
          <li>🔄 <span className="font-semibold">Consistency:</span> Every burger, every fry — same high standard every time</li>
          <li>😄 <span className="font-semibold">Friendly energy:</span> Customers should feel welcome every visit</li>
          <li>📈 <span className="font-semibold">Growth culture:</span> Managers often started as team members</li>
          <li>🏠 <span className="font-semibold">Family-founded:</span> Still privately owned by the Murrell family — not a mega corp</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="flex flex-col px-4 pt-4 pb-8 max-w-lg mx-auto fade-in">
      <div className="text-center mb-5">
        <h2 className="text-xl font-bold text-gray-900">Study Up</h2>
        <p className="text-sm text-gray-500 mt-1">Know this cold before you walk in</p>
      </div>

      <div className="space-y-2 mb-6">
        {cards.map(card => (
          <div key={card.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === card.id ? null : card.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{card.emoji}</span>
                <span className="font-semibold text-gray-900">{card.title}</span>
              </div>
              <span className="text-gray-400 text-sm">{open === card.id ? '▲' : '▼'}</span>
            </button>

            {open === card.id && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                {card.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onStartPractice}
        className="w-full bg-fg-red hover:bg-fg-darkred active:scale-95 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all duration-150"
      >
        Ready to Practice →
      </button>
    </div>
  );
}
