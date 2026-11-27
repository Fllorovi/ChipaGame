"use client";

type Props = {
  taskId: number;
};

export default function ZoneBackground({ taskId }: Props) {
  const bgId = taskId + 5;

  return (
    <div className="fixed inset-0 z-40">
      <img
        src={`/backgrounds/${bgId}.jpg`} 
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Было bg-black/50, стало bg-black/30 */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}