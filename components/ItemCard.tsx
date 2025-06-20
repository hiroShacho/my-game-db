import React from "react";

export default function ItemCard({ item }: { item: any }) {
  return (
    <div className="border p-4 rounded shadow mb-2">
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-sm text-gray-500">{item.type}</p>
      <p>{item.description}</p>
      <div className="mt-2">
        {item.tags.map((tag: string) => (
          <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 mr-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
