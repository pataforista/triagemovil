export default function EndScreen({ onRestart }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-6 anim-rise">
      <div className="text-7xl">🎓</div>
      <h1 className="text-3xl font-black">¡Residencia completada!</h1>
      <p className="text-slate-300 leading-relaxed">
        Sobreviviste a todas las guardias, comiste (a veces) y conservaste la cordura (casi).
      </p>
      <p className="panel px-4 py-3 text-sm text-sky-300">Próxima meta: sobrevivir al R2.</p>
      <button onClick={onRestart} className="btn btn-primary w-full">Volver a empezar</button>
    </main>
  );
}
