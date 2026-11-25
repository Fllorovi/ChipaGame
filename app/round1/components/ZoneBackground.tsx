"use client";

type Props = {
  taskId: number;
};

export default function ZoneBackground({ taskId }: Props) {
  return (
    <div className="fixed inset-0 z-40">
      {/* Картинка */}
      <img
        src={`/backgrounds/${taskId}.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Единое затемнение для всего экрана */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}