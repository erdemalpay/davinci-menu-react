const Nodata = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      <div className="text-4xl mb-4 opacity-30">🎲</div>
      <p className="text-amber-600/70 text-sm font-semibold tracking-widest uppercase mb-2">Oops!</p>
      <h1 className="text-xl font-bold text-gray-300 mb-2">Bu kategoride ürün yok</h1>
      <p className="text-gray-400 text-sm text-center">Başka bir kategori seçmeyi deneyin.</p>
    </div>
  );
};

export default Nodata;
