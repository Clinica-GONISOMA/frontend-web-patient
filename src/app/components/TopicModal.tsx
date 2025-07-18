interface ItemInterface {
  name: string;
  description: string;
  icon: string;
}

interface TopicContentInterface {
  subtitle: string;
  items: ItemInterface[];
}

interface TopicsInterface {
  title: string;
  content: TopicContentInterface[];
}

interface TopicModalProps {
  topic: TopicsInterface;
}

export default function TopicModal({ topic }: TopicModalProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg w-[800px] max-w-5xl shadow-xl z-50">
      {topic.content.map((section, sectionIdx) => (
        <div key={sectionIdx}>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-3">{section.subtitle}</h4>
          <ul className="space-y-3">
            {section.items.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition cursor-pointer"
              >
                <div className="text-xl">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
