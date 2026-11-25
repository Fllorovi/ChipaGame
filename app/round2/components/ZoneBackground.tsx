"use client";

type Props = {
  taskId: number;
};

export default function ZoneBackground({ taskId }: Props) {
  // Для второго раунда номера картинок начинаются с 6.
  // taskId = 1 -> картинка 6.jpg
  // taskId = 5 -> картинка 10.jpg
  const imageId = taskId + 5;

  return (
    <div className="fixed inset-0 z-40">
      {/* Картинка фона */}
      <img
        src={`/backgrounds/${imageId}.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          // Если картинки нет, просто прячем её, чтобы игра не ломалась
          e.currentTarget.style.display = 'none';
        }}
      />
      {/* Легкое затемнение для читаемости текста */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}